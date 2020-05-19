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

![](https://drive.google.com/uc?id=1TKL29bvi6DW1p2CugTO7nctvDWHo8bCE)

接着务必把光猫的DHCPv6关掉：

![](https://drive.google.com/uc?id=1mP9DzLXvwLio74v8SNGJf-htbHsvLdw0)

接着在路由器的IPv6设置界面，选择Native DHCPv6，下面两个选择Stateless。

![](https://drive.google.com/uc?id=1-ZGe7PVAzqRzUhWJjMG5iogpec2Aja9w)

过一会路由器就有IPv6地址了：

![](https://drive.google.com/uc?id=170UoTLIgveHHPx8-Ww0jYRPCg1g0vw76)

同时电脑和手机上也能收到240e开头的IPv6地址：

![](https://drive.google.com/uc?id=1cSQtFkYBp5eDmawzbf0FKulMtqi6jqvq)

WSL里面ifconfig的显示（eth2和eth3分别是有线和无线网卡）：

![](https://drive.google.com/uc?id=1PlPzcYQ9eNpkCOymykFVzS-eVwDCAk9_)

二、体验

1.[test-ipv6.com](https://test-ipv6.com/)测试满分：

![](https://drive.google.com/uc?id=1kSo-RwsZvoCf_4XA-KwtLDLPKuOJld1h)

2.外网可以直接连通内网机器，无需进行端口映射。

为了实验外网的连通性如何，我拿位于上海的实验室里面2001开头的教育网电脑做了测试，

可以ping通：

![](https://drive.google.com/uc?id=10SPBNzp0moMZ2VIcq34PR2oOLc4MgrbR)

甚至电信没有屏蔽80端口：

![](https://drive.google.com/uc?id=1mhrVatk9osYT5evYwbDoLNIV8VUDvBK1)

有IPv6的朋友们可以连接[http://\[240e:ec:865:fd00:951b:d8c1:c33e:c791\]/](http://[240e:ec:865:fd00:951b:d8c1:c33e:c791]/)看看能不能访问，目前显然是没有屏蔽任何端口的，不过相信很快像IPv4一样屏蔽了。

3.动态

经过测试，分到的IPv6地址是动态的，第三位和第四位会变。如果需要绑定稳定的域名，从来在外面访问，就需要一个DDNS了。

![](https://drive.google.com/uc?id=1GtiAzqM1ePh-XI-igkRvpko23SYI_5x9)

（绑定了IPv6的域名）

4.连通性

（1）QQ可以毫无压力的ping通

![](https://drive.google.com/uc?id=17GM9dfSmJVcvoG72IpG6SWvdmqpHYejW)

（2）Google能获取地址，无法ping通，也上不了，显然那啥已经建成

![](https://drive.google.com/uc?id=1meLhwDsq2H1F4WZ5ThqVW661mfyw2uHq)

（3）中文维基百科能ping通但访问不了，显然那啥已经升级。

![](https://drive.google.com/uc?id=1-_ac800LuKdI9g35zpDGQVhhO8h9TR_g)

（4）有些ip教育网能ping通，电信网ping不通，显然那啥也会区别对待

![](https://drive.google.com/uc?id=1dpK9KQcAKAOJlBqIXJJaTTGG35Tn0ZpA)

（5）Telegram可以连接
