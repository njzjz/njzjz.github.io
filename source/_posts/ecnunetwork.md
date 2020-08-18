---
lang: zh-CN
title: ecnunetwork——用Python登陆校园网
url: 104.html
id: 104
categories:
  - Chemistry
date: 2018-09-28 00:41:36
tags:
---
{% source zhihu 46882924 2018 10 16 %}

2018-09-28

为了在无GUI的环境下登陆校园网，我们编写了 _ecnunetwork_ ——一个Python模块，在Python 2.7和Python 3.6均通过测试，  
因为目前校园网IPv6无需登陆，所以可以直接使用pip安装：
<!--more-->

```sh
pip install ecnunetwork
```

如果提示权限不足，可在当前用户下安装：

```sh
pip install ecnunetwork --user
```

使用时，输入network即可连接校园网：

```sh
network
```

如果提示找不到命令，可以进入Python运行：

```sh
python
```

```python
>>> import ecnunetwork
>>> ecnunetwork.ecnunetwork().connect()
```

首次连接会要求输入用户名和密码：

> Please input your ECNU id: xxxxxx
> Please input your password: xxxxxx
> Successfully connected to the Internet.
> Save password? [Y/n] y
