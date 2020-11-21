---
lang: zh-CN
title: conda build系列教程·deepmd的构建④|lammps-dp
categories:
  - Chemistry
date: 2020-11-21
tags:
  - conda
---
{% source tag wechat GYBXEHvokSYeRMu2288KJQ 2020 11 21 %}
{% source tag zhihu 305516678 2020 11 21 %}

在搞定{% post_link conda-build-libdeepmd libdeepmd的构建 %}后，我们终于来到了最后一关：LAMMPS。

这里以今年3月发布的LAMMPS stable_3Mar2020为例。<!--more-->在{% post_link installlammpsdp 寻常的安装 %}中，我们需要把`USER-DEEPMD`文件夹拷进`src`目录下，这次也不例外，我们在`build.sh`的最开头便做了这件事：

```sh build.sh
cp -r ${PREFIX}/share/USER-DEEPMD src/
```

这里的`USER-DEEPMD`来自于我们上次构建的libdeepmd，我们自然需要在`meta.yaml`添加这一依赖。

```yaml meta.yaml
requirements:
  build:
    - {{ compiler('c') }}
    - {{ compiler('cxx') }}
    - cmake
    - make
  
  host:
    - python
    - libdeepmd {{ version }} *{{ dp_variant }}  # [float_prec == 'high']
    - libdeepmd {{ version }} *{{ dp_variant }}_{{ float_prec }}  # [float_prec != 'high'] 
    - cudatoolkit {{ cuda_compiler_version }}* # [cuda_compiler_version != 'None']
    - plumed
    - mpich
    - zlib
    - fftw
    - libpng
    - jpeg
```

可以看到，除了libdeepmd和cudatoolkit外，我们还添加了其它LAMMPS需要的外部依赖，如mpich和zlib等。

值得注意的是，我们拷到`src`目录下的`USER-DEEPMD`本质上是一个第三方的package，并没有得到LAMMPS的官方支持。因此，我们要给LAMMPS的cmake文件打上补丁，加上这个package：
```diff deepmd.patch
Add deepmd
author: Jinzhe

---
 cmake/CMakeLists.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/cmake/CMakeLists.txt b/cmake/CMakeLists.txt
index 0849e03d..a366828d 100644
--- cmake/CMakeLists.txt
+++ cmake/CMakeLists.txt
@@ -181,7 +181,7 @@
   USER-MANIFOLD USER-MEAMC USER-MGPT USER-MISC USER-MOFFF USER-MOLFILE
   USER-NETCDF USER-PHONON USER-PLUMED USER-PTM USER-QTB USER-REAXC
   USER-SCAFACOS USER-SDPD USER-SMD USER-SMTBQ USER-SPH USER-TALLY USER-UEF
-  USER-VTK USER-QUIP USER-QMMM USER-YAFF USER-ADIOS)
+  USER-VTK USER-QUIP USER-QMMM USER-YAFF USER-ADIOS USER-DEEPMD)
 set(ACCEL_PACKAGES USER-OMP KOKKOS OPT USER-INTEL GPU)
 foreach(PKG ${DEFAULT_PACKAGES} ${ACCEL_PACKAGES})
   option(PKG_${PKG} "Build ${PKG} Package" OFF)
```

现在，我们可以继续编写`build.sh`了。首先配置plumed：

```sh
make -C src lib-plumed args="-p $PREFIX -m runtime"
```

接着，我们用cmake编译LAMMPS，把能开启的包全部开启，尽可能地覆盖大多数用户：
```sh
mkdir build
cd build
if [ ${float_prec} == "high" ]; then
    export PREC_DEF="-DHIGH_PREC"
fi
if [ ${dp_variant} == "gpu" ]; then
    export DEEPMD_CUDA_LINK="-ldeepmd_op_cuda"
fi
ARGS="-D PKG_ASPHERE=ON -DPKG_BODY=ON -D PKG_CLASS2=ON -D PKG_COLLOID=ON -D PKG_COMPRESS=OFF -D PKG_CORESHELL=ON -D PKG_DIPOLE=ON -D PKG_GRANULAR=ON -D PKG_KSPACE=ON -D PKG_MANYBODY=ON -D PKG_MC=ON -D PKG_MEAM=ON -D PKG_MISC=ON -D PKG_MOLECULE=ON -D PKG_PERI=ON -D PKG_REPLICA=ON -D PKG_RIGID=ON -D PKG_SHOCK=ON -D PKG_SNAP=ON -D PKG_SRD=ON -D PKG_OPT=ON -D PKG_KIM=OFF -D PKG_GPU=OFF -D PKG_KOKKOS=OFF -D PKG_MPIIO=OFF -D PKG_MSCG=OFF -D PKG_LATTE=OFF -D PKG_USER-MEAMC=ON -D PKG_USER-PHONON=ON -D PKG_USER-REAXC=ON -D WITH_GZIP=ON -D PKG_USER-MISC=ON -D PKG_USER-COLVARS=ON -D PKG_USER-PLUMED=yes -D PLUMED_MODE=runtime"
cmake -D BUILD_LIB=on -D BUILD_SHARED_LIBS=on -DCMAKE_INSTALL_LIBDIR=lib $ARGS -D PKG_USER-DEEPMD=ON -D FFT=FFTW3 -D CMAKE_INSTALL_PREFIX=${PREFIX} -D CMAKE_CXX_FLAGS="${PREC_DEF} -I${PREFIX}/include -I${PREFIX}/include/deepmd -L${PREFIX}/lib -Wl,--no-as-needed -lrt -ldeepmd_op ${DEEPMD_CUDA_LINK} -ldeepmd -ltensorflow_cc -ltensorflow_framework -Wl,-rpath=${PREFIX}/lib" ../cmake
make -j${NUM_CPUS}
make install
```

我们通过cmake的参数开启了一坨LAMMPS的package，同时通过配置`CMAKE_CXX_FLAGS`加入了对libdeepmd的链接。同时，我们通过环境变量配置了两类变体（variant）：CPU和GPU、单精度和双精度。最后，编译，成功。

值得一提的是，如果使用者想开启更多的package，最简单的方法是修改配方中`build.sh`，在`conda_build_config.yaml`注释掉不想要的variant，然后自己用`conda-build`重新编译一遍。

我们用`BUILD_LIB=on`和`BUILD_SHARED_LIBS=on`开启了shared libs模式，这样，LAMMPS会产生三类文件：LAMMPS的library、LAMMPS的执行程序、Python package。如何将它们生成不同的库？这时我们需要用到`meta.yaml`里的`outputs`选项：
```yaml
outputs:
  - name: liblammps-dp
    files:
      - lib/liblammps.so*
      - lib/pkgconfig/liblammps.pc
      - share/cmake/Modules/FindLAMMPS.cmake
      - share/lammps
      - share/man/man1/lmp*
    requirements:
      host:
        - libdeepmd {{ version }} *{{ dp_variant }}  # [float_prec == 'high']
        - libdeepmd {{ version }} *{{ dp_variant }}_{{ float_prec }}  # [float_prec != 'high'] 
        - cudatoolkit {{ cuda_compiler_version }}* # [cuda_compiler_version != 'None']
        - plumed
        - mpich
        - zlib
        - fftw
        - libpng
        - jpeg
      run:
        - {{ pin_compatible('libdeepmd', exact=True) }}
        - {{ pin_compatible('mpich') }}
        - {{ pin_compatible('cudatoolkit', max_pin='x.x') }} # [cuda_compiler_version != 'None']
        - plumed >=2
        - fftw
        - libpng
        - jpeg
    test:
      commands:
        - test -f $PREFIX/lib/liblammps.so
      
  - name: lammps-dp
    files:
      - bin/lmp
    requirements:
      build:
        - {{ compiler('c') }}
        - {{ compiler('cxx') }}
      host:
        - {{ pin_subpackage('liblammps-dp', exact=True) }}
      run:
        - {{ pin_subpackage('liblammps-dp', exact=True) }}
    test:
      commands: 
        - lmp -help

  - name: pylammps-dp
    build:
      noarch: python
    files:
      - lib/python*/site-packages/lammps.py
    requirements:
      host:
        - python
      run:
        - python
        - {{ pin_subpackage('liblammps-dp', max_pin='x.x') }}
    test:
      imports:
        - lammps
```

在`outputs`中，我们把生成的文件分到了`liblammps-dp`、`lammps-dp`和`pylammps-dp`三个子包内，同时利用`pin_subpackage`让后两个包依赖第一个包。这样，使用者便可以按需安装自己想要的功能了。

至此，`deepmd-kit`、`libtensorflow_cc`、`libdeepmd`和`lammps-dp`已经全部构建完成！下一篇文章中，我们将用`constructor`将这几个package打包成离线安装包。