---
lang: zh-CN
title: Linux软件安装②|Anaconda3
url: 78.html
id: 78
categories:
  - Chemistry
date: 2018-06-01 00:26:49
tags:
- Linux软件安装
---

2018年6月1日发布

    wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-5.2.0-Linux-x86_64.sh
    #清华大学镜像站可以显著提升下载速度，尤其是教育网网络环境
    bash Anaconda3-5.2.0-Linux-x86_64.sh

> Please, press ENTER to continue

按Enter

> Do you accept the license terms? \[yes|no\]

输yes

> \[/home/jzzeng/anaconda3\] >>>

这里需要问是否需要修改安装目录，如需修改则输入安装目录，如不修改则按回车

然后等待一段时间

> Do you wish the installer to prepend the Anaconda3 install location to PATH in your /home/jzzeng/.bashrc ? \[yes|no\]

yes

> Do you wish to proceed with the installation of Microsoft VSCode? \[yes|no\]

no

这样anaconda3就安装好了，接着启用清华大学镜像，提升下载速度：

    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
    conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
    conda config --set show_channel_urls yes
