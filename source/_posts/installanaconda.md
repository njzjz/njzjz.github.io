---
lang: zh-CN
title: Linux软件安装②|Anaconda3
url: 78.html
id: 78
categories:
  - Chemistry
date: 2018-06-01 00:26:49
updated: 2021-04-05 21:55:00
tags:
- Linux软件安装
---
{% source zhihu 37553631 2018 5 31  %}
{% source wechat LzO2OeJnxA4H6ijG1px_aA 2018 6 1 %}

下载Anaconda：
```sh
wget https://repo.anaconda.com/archive/Anaconda3-2020.11-Linux-x86_64.sh
```

如果你的机器在**国内**，可以从清华大学镜像站下载，可以显著提升下载速度，尤其是教育网网络环境：

```sh
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2020.11-Linux-x86_64.sh
```

运行sh文件：
```
bash Anaconda3-2020.11-Linux-x86_64.sh
```
<!--more-->

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

这样Anaconda3就安装好了。如果你在**国内**，可以启用清华大学镜像，提升下载速度：
```sh
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```
