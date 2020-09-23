---
lang: zh-CN
title: Linux软件安装③|TensorFlow
url: 80.html
id: 80
categories:
  - Chemistry
date: 2018-06-04 00:28:37
tags:
- Linux软件安装
---

{% source zhihu 37625389 2018 6 3 %}
{% source wechat MsEtgnN_mi-auiFyXYUquA 2018 6 4 %}

最新版本的 TensorFlow 要求 GLIBC 2.17 以上，尽管推荐做法是找一台最新系统的机子，但是有时候系统的类型不是由自己决定的，通常又没有root权限，又想在所有机子上都能运行 TensorFlow 。
<!--more-->

刚好手里有一个超算账号，系统是 Red Hat 4.4.7 ，GLIBC 版本是 2.12 ，就以此为例，安装CPU版本的TensorFlow（反正没有权限也安装不了GPU版本需要的驱动）。

* * *

### 一、用 Anaconda 3 安装 TensorFlow 1.8

1.安装 Anaconda 3

见[Linux软件安装②|Anaconda3](https://njzjz.win/#/posts/18)

2.创建 TensorFlow 环境

```sh
conda create -n tensorflow pip python=3.6
#Proceed ([y]/n)? 输y
source activate tensorflow #激活环境
pip install tensorflow -i https://pypi.tuna.tsinghua.edu.cn/simple/
#这两天由于众所周知的原因，Google官方的镜像又下载不了了，所以这里用了清华大学的镜像
```

### 二、安装 gcc

这时候打开 Python ，执行 import tensorflow ，提示：

> ImportError: /usr/lib64/libstdc++.so.6: version `CXXABI_1.3.7' not found

```sh
conda install -c psi4 gcc-5 
#Proceed ([y]/n)? 输y
LD_LIBRARY_PATH=$HOME/anaconda3/envs/tensorflow/lib:$LD_LIBRARY_PATH
```

再此运行 Python，不再提示这个问题。

### 三、安装 GLIBC 2.21

但是提示：

> ImportError: /lib64/libc.so.6: version `GLIBC_2.16' not found

本来应该安装GLIBC 2.17，但是我发现从2.16到2.19都有个bug，不能运行Python 3.6。于是我们安装GLIBC 2.21。

1.下载GLIBC 2.21并编译GLIBC 2.21

```sh
wget http://mirror.rit.edu/gnu/libc/glibc-2.21.tar.gz
tar zxvf glibc-2.21.tar.gz
mkdir glibc-2.21-build glibc-2.21-install
cd glibc-2.21-build
../glibc-2.21/configure --prefix=`readlink -f ../glibc-2.21-install` 
make && make install
```

然后就报错了：

> checking version of as... 2.20.51.0.2, bad checking version of ld... 2.20.51.0.2, bad These critical programs are missing or too old: as ld

仔细看看INSTALL文件，要求GNU 'binutils' 2.22 or later，但系统只装了2.20。

2.下载并编译binutils 2.30

```sh
wget ftp://ftp.gnu.org/gnu/binutils/binutils-2.30.tar.gz
tar zxvf binutils-2.30.tar.gz
cd binutils-2.30
./configure --prefix=`readlink -f ../binutils-2.30-install` 
make && make install
#加入环境变量
PATH=$HOME/software/binutils-2.30-install/bin:$PATH
```

3.重新编译glibc 2.21

```sh
cd glibc-2.21-build
../glibc-2.21/configure --prefix=`readlink -f ../glibc-2.21-install` 
make && make install
```

> Warning: ignoring configuration file that cannot be opened: ... /software/glibc-2.21-install/etc/ld.so.conf: No such file or directory

将/etc 目录的ld.so.conf复制到指定目录后重新安装：

```sh
cp /etc/ld.so.conf ../glibc-2.21-install/etc/
make install
```

安装成功。

### 四、运行TensorFlow

```sh
source activate tensorflow
$HOME/software/glibc-2.21-install/lib/ld-2.21.so --library-path $HOME/anaconda3/envs/tensorflow/lib:$HOME/software/glibc-2.21-install/lib:/lib64:$LD_LIBRARY_PATH `which python`
```

在Python内输入：

```sh
# Python
import tensorflow as tf
hello = tf.constant('Hello, TensorFlow!')
sess = tf.Session()
print(sess.run(hello))
```

> b'Hello, TensorFlow!'

运行成功。我们可以运行的命令记录在.bashrc中：

```sh
echo 'alias tf='"'"'$HOME/software/glibc-2.21-install/lib/ld-2.21.so --library-path $HOME/anaconda3/envs/tensorflow/lib:$HOME/software/glib-2.21-install/lib:/lib64:$LD_LIBRARY_PATH `which python`'"'">>$HOME/.bashrcsource $HOME/.bashrc
```

即可用 tf 代替装了 TensorFlow 的 Python。
