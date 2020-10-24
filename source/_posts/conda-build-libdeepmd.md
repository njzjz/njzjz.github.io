---
lang: zh-CN
title: conda build系列教程·deepmd的构建③|libdeepmd
categories:
  - Chemistry
date: 2020-10-24
tags:
  - conda
---
{% source zhihu 268497296 2020 10 24 %}
{% source wechat d0vsx9pwF2HluoIMusCWtQ 2020 10 24 % }

在{% post_link conda-build-libtensorflow_cc '成功构建libtensorflow_cc'%}后，我们便可以参照{% post_link installlammpsdp '之前的方法'%}，构建libdeepmd了。
<!--more-->

在[deepmd-kit-recipes/libdeepmd-feedstock](https://github.com/deepmd-kit-recipes/libdeepmd-feedstock)的`recipe/meta.yaml`文件中，我们把包的名称设置为`{{ PKG_BUILDNUM }}_cuda{{ cuda_compiler_version }}_{{ dp_variant }}`，其中把`{{ dp_variant }}`放在最后，就可以确保用`*cpu`或者`*gpu`就可以搜寻到指定的版本。

```yaml
build:
  number: 1
  string: "{{ PKG_BUILDNUM }}_cuda{{ cuda_compiler_version }}_{{ dp_variant }}"  # [float_prec == 'high']
  string: "{{ PKG_BUILDNUM }}_cuda{{ cuda_compiler_version }}_{{ dp_variant }}_{{float_prec}}"  # [float_prec != 'high']
  run_exports:
    - libdeepmd {{ version }} *{{ dp_variant }}  # [float_prec == 'high']
    - libdeepmd {{ version }} *{{ dp_variant }}_{{ float_prec }}  # [float_prec != 'high']
  skip: true  # [not linux]
```

同时，设置了`run_exports`，可以确保把`libdeepmd`加入构建（`host`）依赖的package，自动把相同版本的`libdeepmd`加入运行时(`run`)的依赖。

和前两个package类似，`libdeepmd`的依赖就是`gcc`、`libtensorflow_cc`、`cudatoolkit`以及其它构建工具：

```yaml
requirements:
  build:
    - {{ compiler('c') }}
    - {{ compiler('cxx') }}
    - cmake
    - git
  host:
    - cudatoolkit {{ cuda_compiler_version }}*  # [cuda_compiler_version != 'None']
    - cudnn {{ cudnn }}*  # [cuda_compiler_version != 'None']
    - libtensorflow_cc {{ tf }}*
  run:
    - libtensorflow_cc {{ tf }}*
    - {{ pin_compatible('cudatoolkit', max_pin='x.x') }}  # [cuda_compiler_version != 'None']
    - {{ pin_compatible('cudnn') }}  # [cuda_compiler_version != 'None']
```

这里，如何指定tf的版本？这是在`meta.yaml`最上方实现的，可以根据不同的`cuda_compiler_version`设置不同的`dp_variant`和`tf_version`，之后再将两者拼接起来：
```jinja2
{% if cuda_compiler_version == "None" %}
{% set dp_variant = "cpu" %}
{% else %}
{% set dp_variant = "gpu" %}
{% endif %}

{% if cuda_compiler_version == "None" %}
{% set dp_variant = "cpu" %}
{% set tf_version = "2.3" %}

{% else %}
{% set dp_variant = "gpu" %}

{% if cuda_compiler_version == "10.1" %}
{% set tf_version = "2.3" %}
{% elif cuda_compiler_version == "10.0" %}
{% set tf_version = "2.1" %}
{% else %}
{% set tf_version = "2.1" %}
{% endif %}

{% endif %}

{% set tf = "{} {}".format(tf_version, dp_variant) %}
```

和`libtensorflow_cc`一样，我们在`conda_build_config.yaml`里面仍然把`gcc`的版本设为5.4，因为cudatoolkit仍然不支持用`gcc` 7.3编译。

```yaml
c_compiler_version:
- 5.4
cxx_compiler_version:
- 5.4
```

`build.sh`文件比较简单。在使用`cmake`编译时，我们只需要把`CMAKE_INSTALL_PREFIX`和其它目录均设为`${PREFIX}`即可。

```sh
set -e
mkdir -p source/build
cd source/build
cmake -DTENSORFLOW_ROOT=${PREFIX} -DCMAKE_INSTALL_PREFIX=${PREFIX} -DFLOAT_PREC=${float_prec} -DCMAKE_CXX_FLAGS="-lrt -pthread" -DCMAKE_SHARED_LINKER_FLAGS_INIT="-lrt -pthread" -DCMAKE_LINK_WHAT_YOU_USE=TRUE ..
make -j${CPU_COUNT}
make install
make lammps
mkdir -p ${PREFIX}/share
mv USER-DEEPMD ${PREFIX}/share
```

`${CPU_COUNT}`指`conda-build`检测到的核心数。现在，大功告成！接下来我们就可以开始编译集成了DP的LAMMPS以及AmberTools。
