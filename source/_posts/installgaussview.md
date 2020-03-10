---
lang: zh-CN
title: Linux软件安装⑤|GaussView
url: 84.html
id: 84
categories:
  - Chemistry
date: 2018-06-17 00:32:07
tags:
---

文末将介绍GaussView在Ubuntu子系统的安装方法（网不好的时候用）。

首先需要有gv6.tar.bz2，如果没有需要自行购买或所在机构购买。

    tar -vxf gv6.tar.bz2

然后在$HOME/.bashrc中加入

    export GV_DIR=/home/njzjz/soft/gv #GaussView的目录
    export PATH=$GV_DIR:$GV_DIR/bin:$PATH

source $HOME/.bashrc后gv即可。

Windows Subsystem for Linux (Ubuntu)
------------------------------------

Ubuntu子系统中缺少libGLU.so.1、libfreetype.so.6、libXrender.so.1、libfontconfig.so.1、libSM.so.6，需要安装：

    sudo apt install libglu1-mesa libfreetype6 libxrender-dev libfontconfig libsm6

确保Xming已经运行，.bashrc已经加入

    export DISPLAY=localhost:0.0

运行gv：

![](//images.weserv.nl/?url=drive.google.com/uc?id=1s6ziIVUNXrNpvULaJ2V9fzN8ufkbi64K)
