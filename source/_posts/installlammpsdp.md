---
lang: zh-CN
title: Linux软件安装⑧|带有DEEPMD的LAMMPS
categories:
  - Chemistry
date: 2019-10-17
tags:
---

2019 年 10 月 17 日微信公众号

先介绍一下机器环境，CentOS 7.6，系统自带的 gcc 4.8.5，自己安装的 anaconda，icc
19.0.4，CUDA 10.1，CUDNN 7，连有互联网。目标是安装带有 TensorFlow
2.0.0、DeePMD-kit 1.0.1 的用 icc 编译的 LAMMPS 7Aug2019。

## 一、编译 TensorFlow C++库

```bash
conda create python=3.7 bazel git cmake -n dpdev -y
```

先创建一个 conda 环境，带 bazel、git、cmake，之后会用到。

```bash
conda activate dpdev
git clone https://github.com/tensorflow/tensorflow -b v2.0.0 --depth=1
cd tensorflow

./configure
```

这时候一般来说选默认值敲回车就行，但需注意以下几个选项：

> Do you wish to build TensorFlow with CUDA support? [y/N]:Y

如果不需要编译 GPU 版本，这边可以直接用默认值，下面的选项都不会碰到。

> Please specify the CUDA SDK version you want to use. [Leave empty to default
> to CUDA 10]: 10.1
>
> Please specify the comma-separated list of base paths to look for CUDA
> libraries and headers. [Leave empty to use the default]:
> /scratch/jz748/cuda-10.1
>
> Please specify a list of comma-separated CUDA compute capabilities you want to
> build with.
>
> You can find the compute capability of your device at:
> https://developer.nvidia.com/cuda-gpus.
>
> Please note that each additional compute capability significantly increases
> your build time and binary size, and that TensorFlow only supports compute
>
> capabilities >= 3.5 [Default is: 3.5,7.0]: 6.0,7.5

这里需要
至https://developer.nvidia.com/cuda-gpus查询GPU对应的capanilities，例如P100对应6.0，2080Ti对应7.5。

选项完成后，开始编译：

```bash
bazel build -c opt --verbose_failures //tensorflow:libtensorflow_cc.so
```

这里需要等待很长很长很长时间，可以稍作休息，等待编译结束。

```bash
export tensorflow_root=/scratch/jz748/tf2/libtensorflow_cc
```

指定 libtensorflow_cc 的安装目录，然后 copy 一大堆文件：

```bash
mkdir -p $tensorflow_root/lib/
cp -d bazel-bin/tensorflow/libtensorflow_cc.so* $tensorflow_root/lib/
cp -d bazel-bin/tensorflow/libtensorflow_framework.so* $tensorflow_root/lib/
cp -d $tensorflow_root/lib/libtensorflow_framework.so.2 $tensorflow_root/lib/libtensorflow_framework.so
mkdir -p $tensorflow_root/include/tensorflow
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' bazel-genfiles/ $tensorflow_root/include/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' tensorflow/cc $tensorflow_root/include/tensorflow/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' tensorflow/core $tensorflow_root/include/tensorflow/
rsync -avzh --include '*/' --include '*' --exclude '*.cc'  third_party/ $tensorflow_root/include/third_party/
rsync -avzh --include '*/' --include '*' --exclude '*.txt' bazel-tensorflow/external/eigen_archive/Eigen/ $tensorflow_root/include/Eigen/
rsync -avzh --include '*/' --include '*' --exclude '*.txt' bazel-tensorflow/external/eigen_archive/unsupported/ $tensorflow_root/include/unsupported/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' bazel-tensorflow/external/com_google_protobuf/src/google/ $tensorflow_root/include/google/
rsync -avzh --include '*/' --include '*.h' --include '*.inc' --exclude '*' bazel-tensorflow/external/com_google_absl/absl/ $tensorflow_root/include/absl/
cd ..
```

## 二、编译 DeePMD-kit C++库

TensorFlow 编译完成后，我们来编译 DEEPMD：

```bash
git clone https://github.com/deepmodeling/deepmd-kit
mkdir deepmd-kit/source/build
cd deepmd-kit/source/build
export deepmd_root=/scratch/jz748/tf2/libdeepmd
```

此处指定 deepmd 的安装位置。

```bash
cmake -DUSE_CUDA_TOOLKIT=true -DTENSORFLOW_ROOT=$tensorflow_root -DCMAKE_INSTALL_PREFIX=$deepmd_root ..
```

注意安装 GPU 版本时才需要 USE_CUDA_TOOLKIT 选项。

```bash
make -j28 && make install
```

将 28 改为编译时需要使用的核心数。

```bash
make lammps
```

此时会产生 USER-DEEPMD 文件夹。

```bash
cd ../../..
```

## 三、编译 LAMMPS

```bash
git clone https://github.com/lammps/lammps -b stable_7Aug2019 --depth=1
cd lammps/src
cp -r ../../deepmd-kit/source/build/USER-DEEPMD/ .
```

将刚才生成的 USER-DEEPMD 文件夹拷至此处。

```bash
make yes-user-deepmd
```

若已有 Intel 编译器环境（建议使用较高版本的 Intel 编译器）：

```bash
make yes-user-intel
make intel_cpu_intelmpi -j28
```

若无 Intel 环境，只有 gcc 和 MPI：

```bash
make mpi -j28
```

编译成功后，`ls lmp_* -l`

> -rwxrwxr-x 1 jz748 jz748 6832824 Oct 16 22:19 lmp_intel_cpu_intelmpi

说明已经编译成功，可以直接使用。（测试成功）
