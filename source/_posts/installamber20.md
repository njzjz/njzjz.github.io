---
lang: zh-CN
title: Linux软件安装⑨|Amber20
categories:
  - Chemistry
date: 2020-08-24
tags:
- Linux软件安装
---
{% source zhihu 196057257 2020 8 23 %}
{% source wechat TBpq97nUdj71PF--MK5gBA 2020 8 24 %}

![Amber20](https://api.njzjz.win/1afNbrBOnpGVlIyBWhlpl8xqT5fdoCGZ1)

假设你已经有了Amber20的源代码，名叫`amber20_src`，并且现在在这个目录里面。

<!-- more -->
## 安装串行版本

{% video https://bf.njzjz.win/amber1.mp4 %}

```bash
cd build/
./run_cmake
make install -j8
cd ..
```
之后，Amber20便已安装在`../amber20`内，执行以下命令激活它：

```bash
source ../amber20/amber.sh
```

## 安装并行版本

{% video https://bf.njzjz.win/amber2.mp4 %}

安装并行版本前，请先安装串行版本。

先下载并安装mpich：

```bash
cd AmberTools/src/
wget http://www.mpich.org/static/downloads/3.3.2/mpich-3.3.2.tar.gz
tar vxzf mpich-3.3.2.tar.gz
./configure_mpich gnu
cd ../../build
```

安装好mpich后，我们修改`build`文件夹下的`run_cmake`文件，将`-DMPI=FALSE`改为`-DMPI=TRUE`。用diff表示就是：

```diff
diff --git a/build/run_cmake b/build/run_cmake
index 08406b017f..b3e2419f56 100755
--- a/build/run_cmake
+++ b/build/run_cmake
@@ -39,7 +39,7 @@ else
   cmake $AMBER_PREFIX/amber20_src \
     -DCMAKE_INSTALL_PREFIX=$AMBER_PREFIX/amber20 \
     -DCOMPILER=GNU  \
-    -DMPI=FALSE -DCUDA=FALSE -DINSTALL_TESTS=TRUE \
+    -DMPI=TRUE -DCUDA=FALSE -DINSTALL_TESTS=TRUE \
     -DDOWNLOAD_MINICONDA=TRUE -DMINICONDA_USE_PY3=TRUE \
     2>&1 | tee  cmake.log
```

之后重复上述安装操作，即可：

```bash
./run_cmake
make install -j8
cd ..
```

并行版本的Amber同样安装在`../amber20`内。
