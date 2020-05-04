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

2017年11月14日首发[知乎专栏](https://zhuanlan.zhihu.com/p/30105863)、[微信公众号](https://mp.weixin.qq.com/s?timestamp=1527423146&src=3&ver=1&signature=aR1qmeGbvOzc4e9WsPnpwmjqUbvA5JfcrQ6yliOgES94TT1wtnLQCP9IZoEZkUvJSzK1xhNamRi68YSijn*eR-*gKFngBYdZ76V1qNfjyY7n2Q4OJcK8cj39stMySuc2dqbORl33xdL9R1adcRKr97Q4xaX9mMMExRSn2POFt8Q=)

校园网的登陆页面是个网页，bash不能浏览网页，但是也有联网需求。幸好，curl命令可以发送POST请求。

**一、curl发送POST**

我们检查登陆页面（[https://login.ecnu.edu.cn/srun\_portal\_pc.php](https://login.ecnu.edu.cn/srun_portal_pc.php)）的源代码，发现使用了jQuery，还有一个叫srun_portal.js的JavaScript脚本，显然登陆的POST请求就是从这里发送的：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=14lgyLTVRKmLdrKXPy9rkYdaL5bjVkzHf)

打开srun\_portal.js，我们看到这段post请求，下面还有login\_ok，很显然就是这段了。记下post地址[https://login.ecnu.edu.cn/include/auth_action.php](https://login.ecnu.edu.cn/include/auth_action.php)，几个关键的参数，action=login，username=用户名，password=密码，ajax=1，ac_id=1，ok。

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1j9o6w1KjfBPd0njab10omLAdFHALBls2)

下面可以编写curl命令了：

**$ curl -d "action=login&username=10154601140&password=password&ac_id=1&ajax=1" [https://login.ecnu.edu.cn/include/auth_action.php](https://login.ecnu.edu.cn/include/auth_action.php)**

![](https://img.njzjz.win/?url=drive.google.com/uc?id=11kF4jfbzo4DfY1PfP0WrMzjKEivETAN3)

提示login_ok。

**二、制成Shell脚本**  
这么一长串命令，每次都输一遍肯定特别麻烦。我们可以制成Shell脚本。

**$ vi network** **#创建名为network的脚本**

然后将上面的curl命令输进去，**:wq**保存。

**$ chmod 755 network** **#设置权限为可执行**

**$ ls -l network** **#检查一下文件权限**

![](https://img.njzjz.win/?url=drive.google.com/uc?id=13AzytmVDTaFZE2ITk1cFykMruC4-09VD)

如果设置成功，文件权限应为-rwxr-xr-x。现在，我们就可以运行脚本了：

**$ ./network**

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1EWjGiAhuVd7_D63zVV5szI63iprslDWC)

**三、扔进~/bin**

**$ mkdir bin**

**$ mv network bin**

**$ network**

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1lCDW3bh-bXVdmhkIp0dBvHFg4uZ6kZlc)

bin目录一般是默认的PATH环境变量，扔进去即可直接输入**network**运行。如果PATH变量不包含此目录，我们可以修改.bashrc文件：

**$ vi .bashrc**

在最下方加入**export PATH=~/bin:"$PATH"**，保存：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1qN2v4Ka9rtTTBau5K2o8dGslBkN4osFp)

**$ . .bashrc** **#重新读取.bashrc**

现在，我们即可输入**network**直接连接校园网了。

**参考文献**

“编写第一个 Shell 脚本”. [https://billie66.github.io/TLCL/book/zh/chap25.html](https://billie66.github.io/TLCL/book/zh/chap25.html) （2017/10/14）
