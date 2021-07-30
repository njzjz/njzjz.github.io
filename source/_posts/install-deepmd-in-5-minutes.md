---
title: 5分钟内完成DeePMD-kit的安装
date: 2021-04-21
categories:
- Chemistry
tags:
- deepmd
- conda
---
2018年，我第一次接触DeePMD-kit时，花了整整一周的时间才测试成功。那时，对于一位驾轻就熟的老司机来说，在超算上安装DeePMD-kit可能仅需要2个小时；然而，对于刚刚接触这一切的新手来说，安装过程可能是数天的折磨，甚至是一辈子也无法解决的噩梦。2019年春，在开源社区的倡议下，优化安装过程被明确列入DeePMD-kit的开发计划。

## Pip安装

在DeePMD-kit v0版本中，Python和C++的接口均调用了用TensorFlow的C++库编译的操作。然而，与Python版本的TensorFlow库相比，TensorFlow的C++库需要漫长的编译过程，对新手极不友好，也不利于开发。

于是，在v1版本中，开发者将Python接口与C++接口解除耦合，Python接口调用TensorFlow的Python包中的C++库进行编译。同时，开发者在主目录中添加了setup.py，调用scikit-build实现编译的自动化，并实现了自动搜索TensorFlow，从而使得用户能够用pip命令一键安装DeePMD-kit。

之后，开发者发现，一键安装DeePMD-kit的前提是提前装好scikit-build和cmake，这使得安装流程“不够一键”。这时，开发者发现了PEP-518，这一特性使得pip可以提前装好构建所需的工具。然而，PEP-518带来了包隔离特性，使得发现TensorFlow变得异常困难。在反复尝试下，开发者用了一些trick解决了一些问题。

在此基础上，开发者编译了wheel文件，上传到pypi上，使得安装DeePMD-kit变得异常简单：

pip install tensorflow deepmd-kit
安装成功后，运行`dp -h`可以调用DeePMD-kit的Python接口。

## Conda安装

在解决了Python接口的安装难题后，我们仍然面临C++接口的安装困难。这时，开发者把目光转向了conda。conda是包的分发和管理工具，和其它二进制分发工具相比，其最大优点在于安装时无需root权限。很多人认为，conda是Python包的管理工具，但其实，它也能分发C++的包。一般来说，分发编译后的二进制包，总有各种各样的静态库的依赖问题，但conda将所有的静态库都打包成了conda包，使得程序运行时无需调用系统自带的静态库。

Conda-build是conda包的打包工具，打包文件主要包括这两个文件：meta.yaml（配方文件，用于定义包的基本信息和依赖）、build.sh（构建包需要执行的命令），以及其它必须的文件。开发者将TensorFlow、DeePMD-kit和LAMMPS依次打包，并传到了anaconda.org上。于是，用户安装Anaconda或Miniconda后，可以使用下述命令安装：

conda install deepmd-kit=*=*gpu lammps-dp=*=*gpu -c deepmodeling
之后运行`dp -h`或`lmp -h`即可调用DeePMD-kit或LAMMPS。

为了节约人力，DP开源社区将conda包的编译过程搬到了GitHub上，使用Azure Pipeline自动编译。同时，DP开源社区也将DeePMD-kit提交到了conda-forge开源社区中，并积极推动着conda-forge社区TensorFlow的编译。另外值得注意的是，DP开源社区请求清华大学开源软件镜像站镜像了deepmodeling的conda仓库，同时镜像站此前已经镜像了conda-forge的仓库，为国内的用户带来了很大的便利。截至今日，deepmodeling仓库DeePMD-kit的下载量已达6815次，conda-forge仓库DeePMD-kit的下载量已达21182次。

## 离线包安装

对于不能连通互联网的机器来说，离线包是必不可少的利器。开发者发现conda提供了constructor程序，只需一个配方文件，就可以打包已经编译好的conda程序，生成离线包。这些离线包同样由CI自动生成，可以在GitHub的Releases页面下载。

## Docker安装

在离线包的基础上，开发者开发了Docker镜像，使用CI上传到了DockerHub及GitHub Package上，方便Docker精通者使用。

docker pull ghcr.io/deepmodeling/deepmd-kit:1.3.3_cuda10.1_gpu

子曰：“工欲善其事，必先利其器。”在2021年的今天，无论是新手还是老手，均可在5分钟内完成DeePMD-kit的安装。这一变化，为广大科研工作者带来了巨大的便利，也推动着DP走向世界，迈向更有前景的明天。
