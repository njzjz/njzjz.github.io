---
lang: zh-CN
title: conda build系列教程·deepmd的构建②|libtensorflow_cc
categories:
  - Chemistry
date: 2020-10-24
tags:
  - conda
mathjax: true
---

很多人对Anaconda有这样的误解，认为conda只是用来管理Python packages的。实际上，conda更神奇的功能，是可以打包编译后的程序，并且不需要root权限即可安装。一般来说，分发编译后的程序总有各种各样的静态库的依赖问题，所以Anaconda把这些依赖库也做成了conda packages，这样就能确保任何机器都能安装了。`libtensorflow_cc`是TensorFlow的C++库，之前介绍{% post_link installlammpsdp '介绍过如何编译'%}，但编译成conda packages，仍需要费一番功夫。本文介绍2.3版本的构建方法：

我们先来看[deepmd-kit-recipes/libtensorflow_cc-feedstock](https://github.com/deepmd-kit-recipes/libtensorflow_cc-feedstock)的`recipe/build.sh`文件：

```sh
if [ ${cuda_compiler_version} == "None" ]; then
  bash $RECIPE_DIR/build_cpu.sh
fi
if [ ${cuda_compiler_version} != "None" ]; then
  bash $RECIPE_DIR/build_gpu.sh
fi
```

这里，我们将CPU版本和GPU版本的编译脚本分成了两个文件，因为两者有所不同。这里借鉴了Anaconda的Python编译脚本。我们先来看CPU版本：

```sh
#!/bin/bash

mkdir -p ${PREFIX}/lib/
mkdir -p ${PREFIX}/include/
```

在编译成功后，`conda-build`会将`${PREFIX}`文件夹下所有新文件打包，之后在用户的机器上安装时，`${PREFIX}`相当于`anaconda3`文件夹，安装过程其实就是解压到`anaconda3`的过程。因此，我们需要将生成的所有静态文件拷到`${PREFIX}`文件夹下。

在之前的教程中，我们用的是`./configure`的交互式界面来配置TensorFlow。但是，在自动化的构建过程中，交互界面是大忌，因此TensorFlow还提供了环境变量配置TensorFlow的方法：

```sh
set -vex

# expand PREFIX in BUILD file
sed -i -e "s:\${PREFIX}:${PREFIX}:" tensorflow/core/platform/default/build_config/BUILD

mkdir -p ./bazel_output_base
export BAZEL_OPTS=""
export TF_NEED_MKL=0
export BUILD_OPTS="
    --copt=-march=nocona
    --copt=-mtune=haswell
    --copt=-ftree-vectorize
    --copt=-fPIC
    --copt=-fstack-protector-strong
    --copt=-O2
    --cxxopt=-fvisibility-inlines-hidden
    --cxxopt=-fmessage-length=0
    --linkopt=-zrelro
    --linkopt=-znow
    --verbose_failures
    --config=opt"
export TF_ENABLE_XLA=1

# Compile tensorflow from source
export PYTHON_BIN_PATH=${PYTHON}
export PYTHON_LIB_PATH=${SP_DIR}
export USE_DEFAULT_PYTHON_LIB_PATH=1

# additional settings
# do not build with MKL support
export CC_OPT_FLAGS="-march=nocona -mtune=haswell"
export TF_NEED_IGNITE=1
export TF_NEED_OPENCL=0
export TF_NEED_OPENCL_SYCL=0
export TF_NEED_COMPUTECPP=0
export TF_NEED_ROCM=0
export TF_NEED_MPI=0
export TF_DOWNLOAD_CLANG=0
export TF_SET_ANDROID_WORKSPACE=0
export TF_NEED_CUDA=0

./configure
```

配置成功后，即可开始编译：

```sh
bazel ${BAZEL_OPTS} build  ${BUILD_OPTS}  \
	//tensorflow:libtensorflow_cc.so
```

编译成功后，我们将一大批库文件和头文件拷至`$PREFIX`下的lib和include文件夹下：

```sh
mkdir -p $PREFIX/lib
cp -d bazel-bin/tensorflow/libtensorflow_cc.so* $PREFIX/lib/
cp -d bazel-bin/tensorflow/libtensorflow_framework.so* $PREFIX/lib/
cp -d $PREFIX/lib/libtensorflow_framework.so.2 $PREFIX/lib/libtensorflow_framework.so
mkdir -p $PREFIX/include
mkdir -p $PREFIX/include/tensorflow
# copy headers
rsync -avzh --exclude '_virtual_includes/' --include '*/' --include '*.h' --include '*.inc' --exclude '*' bazel-genfiles/ $PREFIX/include/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' tensorflow/cc $PREFIX/include/tensorflow/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' tensorflow/core $PREFIX/include/tensorflow/
rsync -avzh --include '*/' --include '*' --exclude '*.cc' third_party/ $PREFIX/include/third_party/
rsync -avzh --include '*/' --include '*' --exclude '*.txt' bazel-work/external/eigen_archive/Eigen/ $PREFIX/include/Eigen/
rsync -avzh --include '*/' --include '*' --exclude '*.txt' bazel-work/external/eigen_archive/unsupported/ $PREFIX/include/unsupported/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' bazel-work/external/com_google_protobuf/src/google/ $PREFIX/include/google/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' bazel-work/external/com_google_absl/absl/ $PREFIX/include/absl/
```

这里值得注意的是，TensorFlow编译protobuf、Eigen和absl时下载并编译了特定的版本，而非来自系统环境，因此我们需要把这些依赖的头文件也打包进去。

GPU版本的`build_gpu.sh`主要在于环境变量有区别：

```sh
# CUDA details
export TF_NEED_CUDA=1
export TF_CUDA_VERSION="${cuda_compiler_version}"
export TF_CUDNN_VERSION="${cudnn}"
export TF_CUDA_CLANG=0
export TF_NEED_TENSORRT=0
# Additional compute capabilities can be added if desired but these increase
# the build time and size of the package.
if [[ ${cuda_compiler_version} == "9.0" ]]; then
	    export TF_CUDA_COMPUTE_CAPABILITIES="3.5,5.2,6.0,6.1,7.0"
fi
if [[ ${cuda_compiler_version} == "9.2" ]]; then
	    export TF_CUDA_COMPUTE_CAPABILITIES="3.5,5.2,6.0,6.1,7.0"
fi
if [[ ${cuda_compiler_version} == 10.* ]]; then
	    export TF_CUDA_COMPUTE_CAPABILITIES="3.5,5.2,6.0,6.1,7.0,7.5"
fi
export TF_NCCL_VERSION=""
export GCC_HOST_COMPILER_PATH="${CC}"
export GCC_HOST_COMPILER_PREFIX=$(dirname "${CC}")

# link binutils
for ii in addr2line ar as c++filt dwp elfedit gprof ld nm objcopy objdump ranlib readelf size strings strip
do
	ln -s ${GCC_HOST_COMPILER_PREFIX}/x86_64-conda_cos6-linux-gnu-${ii} ${GCC_HOST_COMPILER_PREFIX}/${ii}
done


# Use system paths here rather than $PREFIX to allow Bazel to find the correct
# libraries.  RPATH is adjusted post build to link to the DSOs in $PREFIX

export TF_CUDA_PATHS="${PREFIX},/usr/local/cuda,/usr"

./configure
```

`TF_CUDA_COMPUTE_CAPABILITIES`指NVIDIA GPU的算力，可以在[https://developer.nvidia.com/cuda-gpus](https://developer.nvidia.com/cuda-gpus)中查到所有GPU的算力。而这里cuda的相关文件，我们除了在依赖中添加CUDA外，还使用了基于NVIDIA的官方Docker构建的Docker。我们来看看`meta.yaml`定义的依赖：

```yaml
requirements:
  build:
    - {{ compiler('c') }}
    - {{ compiler('cxx') }}
    - bazel
    - rsync
    - binutils_impl_linux-64
  host:
    - cudatoolkit {{ cuda_compiler_version }}*  # [cuda_compiler_version != 'None']
    - cudnn {{ cudnn }}*  # [cuda_compiler_version != 'None']
    - cupti  # [cuda_compiler_version != 'None']
    - python
    - numpy
  run:
    - {{ pin_compatible('cudatoolkit', max_pin='x.x') }}  # [cuda_compiler_version != 'None']
    - {{ pin_compatible('cudnn') }}  # [cuda_compiler_version != 'None']
    - cupti  # [cuda_compiler_version != 'None']
```

可以看到，除了`bazel`和`gcc`，就是编译GPU版本时加上了CUDA包，几乎没有其它依赖了。

```yaml
test:
  files:
    - test_cc.cc
  requires:
    - {{ compiler('cxx') }}
  commands:
    - test -f $PREFIX/lib/libtensorflow_cc.so  # [not win]
    - $CXX -std=c++11 -o test_cc -L${PREFIX}/lib/ -ltensorflow_cc -ltensorflow_framework -lrt -I${PREFIX}/include/ test_cc.cc && ./test_cc  # [not win]
```

这里，除了测试库文件是否存在外，我也参照官网上的例子，用`test_cc.cc`来做基本的测试，确保编译的成功：
```cpp
// test tensorflow_cc
// https://www.tensorflow.org/guide/extend/cc
#include "tensorflow/core/public/session.h"
#include "tensorflow/core/platform/env.h"
#include "tensorflow/core/framework/op.h"
#include "tensorflow/core/framework/op_kernel.h"
#include "tensorflow/core/framework/shape_inference.h"

#include "tensorflow/cc/client/client_session.h"
#include "tensorflow/cc/ops/standard_ops.h"
#include "tensorflow/core/framework/tensor.h"

int main() {
  using namespace tensorflow;
  using namespace tensorflow::ops;
  Scope root = Scope::NewRootScope();
  // Matrix A = [3 2; -1 0]
  auto A = Const(root, { {3.f, 2.f}, {-1.f, 0.f} });
  // Vector b = [3 5]
  auto b = Const(root, { {3.f, 5.f} });
  // v = Ab^T
  auto v = MatMul(root.WithOpName("v"), A, b, MatMul::TransposeB(true));
  std::vector<Tensor> outputs;
  ClientSession session(root);
  // Run and fetch v
  TF_CHECK_OK(session.Run({v}, &outputs));
  // Expect outputs[0] == [19; -3]
  LOG(INFO) << outputs[0].matrix<float>();
  return 0;
}
```

按理说，到这步应该已经大功告成了。但实际上并不是如此，为什么呢？因为TensorFlow有各种各样奇怪的bug，虽然TensorFlow 2.3已经包含了我提交过的一个commit，但又产生了另外五六个bug，需要在编译失败中反复摸索，然后打上五六个patch才能修复：
```yaml
  patches:
    - 0002-do-not-include-B-usr-bin-flag.patch  # [cuda_compiler_version != 'None']
    - realpath.patch
    - cuda2.patch
    - cuda3.patch
    - absl.patch
    - bazelrc.patch
```
不要对Google的代码质量产生过高期望啦。
