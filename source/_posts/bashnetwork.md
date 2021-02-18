---
lang: zh-CN
title: 【ECNU】bash登陆校园网
url: 60.html
id: 60
categories:
  - Chemistry
date: 2017-11-14 00:16:56
tags:
---
{% source zhihu 30105863 2017 10 13 %}

{% source wechat 2_g0umECg1C_v47CjrOl1A 2017 10 14 %}

校园网的登陆页面是个网页，bash不能浏览网页，但是也有联网需求。幸好，curl命令可以发送POST请求。
<!--more-->

# 一、curl发送POST

我们检查登陆页面（[https://login.ecnu.edu.cn/srun\_portal\_pc.php](https://login.ecnu.edu.cn/srun_portal_pc.php)）的源代码，发现使用了jQuery，还有一个叫srun_portal.js的JavaScript脚本，显然登陆的POST请求就是从这里发送的：

![](https://pic.njzjz.win/14lgyLTVRKmLdrKXPy9rkYdaL5bjVkzHf)

打开srun\_portal.js，我们看到这段post请求，下面还有login\_ok，很显然就是这段了。记下post地址[https://login.ecnu.edu.cn/include/auth_action.php](https://login.ecnu.edu.cn/include/auth_action.php)，几个关键的参数，action=login，username=用户名，password=密码，ajax=1，ac_id=1，ok。

![](https://pic.njzjz.win/1j9o6w1KjfBPd0njab10omLAdFHALBls2)

下面可以编写curl命令了：

```sh
curl -d "action=login&username=10154601140&password=password&ac_id=1&ajax=1" https://login.ecnu.edu.cn/include/auth_action.php
```

![](https://pic.njzjz.win/11kF4jfbzo4DfY1PfP0WrMzjKEivETAN3)

提示`login_ok`。

# 二、制成Shell脚本
这么一长串命令，每次都输一遍肯定特别麻烦。我们可以制成Shell脚本。

```sh
vi network #创建名为network的脚本
```

然后将上面的curl命令输进去，`:wq`保存。

```sh
chmod 755 network #设置权限为可执行
```

```sh
ls -l network #检查一下文件权限
```

![](https://pic.njzjz.win/13AzytmVDTaFZE2ITk1cFykMruC4-09VD)

如果设置成功，文件权限应为-rwxr-xr-x。现在，我们就可以运行脚本了：

```sh
./network
```

![](https://pic.njzjz.win/1EWjGiAhuVd7_D63zVV5szI63iprslDWC)

# 三、扔进~/bin

```sh
mkdir bin
mv network bin
network
```

![](https://pic.njzjz.win/1lCDW3bh-bXVdmhkIp0dBvHFg4uZ6kZlc)

bin目录一般是默认的PATH环境变量，扔进去即可直接输入`network`运行。如果PATH变量不包含此目录，我们可以修改`.bashrc`文件：

```sh
vi .bashrc
```

在最下方加入`export PATH=~/bin:"$PATH"`，保存：

![](https://pic.njzjz.win/1qN2v4Ka9rtTTBau5K2o8dGslBkN4osFp)

```sh
. .bashrc #重新读取.bashrc
```

现在，我们即可输入`network`直接连接校园网了。

**参考文献**

“编写第一个 Shell 脚本”. [https://billie66.github.io/TLCL/book/zh/chap25.html](https://billie66.github.io/TLCL/book/zh/chap25.html) （2017/10/14）
