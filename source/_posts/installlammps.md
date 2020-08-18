---
lang: zh-CN
title: Linux软件安装⑥|LAMMPS
url: 86.html
id: 86
categories:
  - Chemistry
date: 2018-06-17 00:32:48
tags:
- Linux软件安装
---

{% source zhihu 38172992 2018 6 16 %}

2018年6月17日

本文将介绍 LAMMPS 在 Intel® MPI 、Open MPI 和 Ubuntu 下的安装方法。
<!--more-->

```sh
#下载解压
wget http://lammps.sandia.gov/tars/lammps-stable.tar.gz
tar -vxf lammps-stable.tar.gz
cd lammps-16Mar18/src
#安装Package，例如这里安装USER-REAXC
make yes-user-reaxc
#所有Package的列表可见http://lammps.sandia.gov/doc/Section_packages.html
```

Intel® MPI
----------

根据官方资料（Intel® MPI Library），Intel® MPI比Open MPI快数倍。

配置好Intel® MPI的环境变量后，只需：

```sh
make intel_cpu_intelmpi
```

即开始编译。

Open MPI
--------

若已装Open MPI，可直接编译：

```sh
make mpi
```

若机器上没有装任何MPI，可自行安装Open MPI：

```sh
wget https://download.open-mpi.org/release/open-mpi/v3.1/openmpi-3.1.0.tar.bz2
tar -vxf openmpi-3.1.0.tar.bz2
cd openmpi-3.1.0/
./configure --prefix=$(pwd)
make all install
```

在`$HOME/.bashrc`中加入环境变量：

```sh
export PATH=/home/njzjz/soft/openmpi-3.1.0/bin:$PATH
export LD_LIBRARY_PATH=/home/njzjz/soft/openmpi-3.1.0/lib:$LD_LIBRARY_PATH
```

然后在LAMMPS的src目录下编译：

```sh
source $HOME/.bashrc
make mpi
```

Ubuntu
------

先用管理员权限安装一些软件，再编译：

```sh
sudo apt install g++ mpi-default-bin mpi-default-dev libfftw3-dev libjpeg-dev libpng-dev
make ubuntu
```

最后
--

在当前目录下一键设置环境变量：

```sh
echo 'export PATH=$PATH:'$(pwd)>>$HOME/.bashrc
source $HOME/.bashrc
```
