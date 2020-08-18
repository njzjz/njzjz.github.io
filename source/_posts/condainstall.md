---
lang: zh-CN
title: conda install——无root权限时一键安装软件
url: 100.html
id: 100
categories:
  - Chemistry
date: 2018-08-20 00:40:12
tags:
  - conda
---
{% source zhihu 46882610 2018 10 16 %}

2018-08-20

**`conda install --channel "anaconda" package`**
<!--more-->

### 安装Anaconda

使用conda install需要安装Anaconda，安装方式见 #18 。  
但也可以用我写的一键脚本安装：  
`wget https://raw.githubusercontent.com/njzjz/ChemAutoInstaller/master/ChemAutoInstaller.sh && bash ChemAutoInstaller.sh --anaconda`

### 添加清华镜像

`conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/`  
`conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/`  
`conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/`  
`conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/`  
`conda config --set show_channel_urls yes`

经测试，在华东师范大学校园网下可以满速下载。

### 常用软件

一些最常用的软件，如numpy、scipy已经预装在Anaconda中。剩下一些常用的软件（其实是我常用的）安装命令（-y可以跳过确认）：  
**TensorFlow**（含cuDDN）  
`conda install tensorflow-gpu`  
**OpenBabel**  
`conda install openbabel`  
**RDkit**  
`conda install rdkit`  
**高版本GCC**  
`conda install libgcc`  
**DeePMD**  
`conda install -c deepmd.kit deepmd`

### 搜索软件

在[anaconda.org](https://anaconda.org/)可以搜索安装包，资源非常丰富。
