---
lang: zh-CN
title: 中国电信IPv6体验
url: 133.html
id: 133
categories:
  - Technology
date: 2018-11-05 02:51:18
tags:
---

坐标江苏南京，光猫型号是华为HG8120C，路由器是刷了最新版padavan的斐讯k2。光猫为桥接模式，路由器为路由模式。

一、配置

首先要确定光猫已经有IPv6业务了，不支持的话就是白搭。

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1hlp_4rBB2CXYdSjzj967_9NEAGsA2wvX)

接着务必把光猫的DHCPv6关掉：

![](https://images.weserv.nl/?url=drive.google.com/uc?id=10CGH2LejhtUKhxeGuSyfy-aQTbRKH2Ex)

接着在路由器的IPv6设置界面，选择Native DHCPv6，下面两个选择Stateless。

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1dsflfF2Dh9mONw2O5mVDhRzxlrGVVAtF)

过一会路由器就有IPv6地址了：

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1HwaGvEJY93d4ZuT2jdC31Cbp4Q70H7uq)

同时电脑和手机上也能收到240e开头的IPv6地址：

![](https://images.weserv.nl/?url=drive.google.com/uc?id=16mjGTvc_dOzTEdibhRNA79lS3z0TOOy6)

WSL里面ifconfig的显示（eth2和eth3分别是有线和无线网卡）：

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1qmqdv7lHvtLxvOLGVN-B1X3BC4wCEP5R)

二、体验

1.[test-ipv6.com](https://test-ipv6.com/)测试满分：

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1hZ75nmi62voxiwfOy1M7oTAq0wJxQEZJ)

2.外网可以直接连通内网机器，无需进行端口映射。

为了实验外网的连通性如何，我拿位于上海的实验室里面2001开头的教育网电脑做了测试，

可以ping通：

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1uI7-1CVWPJxKsN6wPSciyiXFL61R5-Ia)

甚至电信没有屏蔽80端口：

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1w0AHaqYbOQDZ4urfzmN3nPE2eMuUJkN-)

有IPv6的朋友们可以连接[http://\[240e:ec:865:fd00:951b:d8c1:c33e:c791\]/](http://[240e:ec:865:fd00:951b:d8c1:c33e:c791]/)看看能不能访问，目前显然是没有屏蔽任何端口的，不过相信很快像IPv4一样屏蔽了。

3.动态

经过测试，分到的IPv6地址是动态的，第三位和第四位会变。如果需要绑定稳定的域名，从来在外面访问，就需要一个DDNS了。

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1cMNvmO3UlF9RDqIwIAWcEmEMnwuKyAZ8)

（绑定了IPv6的域名）

4.连通性

（1）QQ可以毫无压力的ping通

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1Lhzmn7ZzBcZ2e-O5sWD7avi01RF4UeYb)

（2）Google能获取地址，无法ping通，也上不了，显然那啥已经建成

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1GCKBob2kjlt2nC2adUnE3msywQ2b15sA)

（3）中文维基百科能ping通但访问不了，显然那啥已经升级。

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1siii5mcT2umOAgdddRshlBsmodl5ebwa)

（4）有些ip教育网能ping通，电信网ping不通，显然那啥也会区别对待

![](https://images.weserv.nl/?url=drive.google.com/uc?id=1HY1GZnyjK6afkjhSPRMAjI6MHL3s0A8V)

（5）Telegram可以连接
