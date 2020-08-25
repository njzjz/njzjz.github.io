---
lang: zh-CN
title: Linux软件安装④|VMD
url: 82.html
id: 82
categories:
  - Chemistry
date: 2018-06-16 00:31:29
tags:
- Linux软件安装
---

{% source zhihu 38146922 2018 6 16 %}

\_2018年6月16日作\_

文末将说明VMD在Ubuntu子系统上的安装方法。
<!--more-->

```sh
#下载解压
wget http://www.ks.uiuc.edu/Research/vmd/vmd-1.9.3/files/final/vmd-1.9.3.bin.LINUXAMD64-CUDA8-OptiX4-OSPRay111p1.opengl.tar.gz
tar -vxzf vmd-1.9.3.bin.LINUXAMD64-CUDA8-OptiX4-OSPRay111p1.opengl.tar.gz
cd vmd-1.9.3/
pwd
```

`pwd`获取当前目录，比如：/home/njzjz/soft/vmd-1.9.3

打开`configure`，将某两行修改为：

```sh
$install_bin_dir="/home/njzjz/soft/vmd-1.9.3/bin";
$install_library_dir="/home/njzjz/soft/vmd-1.9.3/lib/$install_name";
```

保存。

```sh
./configure LINUXAMD64
./configure
cd src
make install
```

在`$HOME/.bashrc`文件中加入

```sh
export PATH=/home/njzjz/soft/vmd-1.9.3/bin:$PATH
```

然后`source .bashrc`，此时运行vmd一般来说均可正常运行。

Windows Subsystem for Linux (Ubuntu)
------------------------------------

在Ubuntu子系统中缺少libGL.so.1、libXinerama.so.1、libXi.so.6三个库，需要安装：

```sh
sudo apt install mesa-utils libxinerama-dev libxi6
```

确保Xming已经运行，.bashrc已经加入

```
export DISPLAY=localhost:0.0
```

这时再输入`vmd`，即可打开VMD界面。

![](https://api.njzjz.win/1BkC5jEZYVo5KlmOonvQWbqDrgICWzVD9)
