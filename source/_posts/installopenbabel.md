---
title: Linux软件安装①|Open Babel
url: 76.html
id: 76
categories:
  - Chemistry
date: 2018-05-29 00:25:57
tags:
---

 2018年5月29日发布

    #超算上都没有root权限，所以只能自己编译
    wget https://jaist.dl.sourceforge.net/project/openbabel/openbabel/2.3.1/openbabel-2.3.1.tar.gz #下载
    tar -vxzf openbabel-2.3.1.tar.gz #解压
    mkdir openbabel openbabel-build #创建目录
    installprefix=$(pwd)/openbabel #设置安装目录
    cd ../openbabel-build #进入构建目录
    cmake ../openbabel-2.3.1 -DCMAKE_INSTALL_PREFIX=$installprefix
    make && make install #编译
    
    #在.bashrc中设置环境变量
    echo 'export PATH=$PATH:'$installprefix'/bin'>>$HOME/.bashrc
    echo 'export BABEL_DATADIR='$installprefix'/share/openbabel/2.3.1'>>$HOME/.bashrc
    source $HOME/.bashrc #应用环境变量
    
    #可以尝试命令：obabel -:CC -opdb -O xx.pdb
    #看看是否安装成功