---
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

![](https://qimg.ithome.com/image/2018/11/05/6367702283939685974007456.jpg)

接着务必把光猫的DHCPv6关掉：

![](https://qimg.ithome.com/image/2018/11/05/6367702299581972122319921.jpg)

接着在路由器的IPv6设置界面，选择Native DHCPv6，下面两个选择Stateless。

![](https://qimg.ithome.com/image/2018/11/05/6367702314745742463193542.jpg)

过一会路由器就有IPv6地址了：

![](https://qimg.ithome.com/image/2018/11/05/6367702321836273773997493.jpg)

同时电脑和手机上也能收到240e开头的IPv6地址：

![](https://qimg.ithome.com/image/2018/11/05/6367702334086274204906386.jpg)

WSL里面ifconfig的显示（eth2和eth3分别是有线和无线网卡）：

![](https://qimg.ithome.com/image/2018/11/05/6367702344729824498354883.jpg)

二、体验

1.[test-ipv6.com](https://test-ipv6.com/)测试满分：

![](https://qimg.ithome.com/image/2018/11/05/6367702354722697666395083.jpg)

2.外网可以直接连通内网机器，无需进行端口映射。

为了实验外网的连通性如何，我拿位于上海的实验室里面2001开头的教育网电脑做了测试，

可以ping通：

![](https://qimg.ithome.com/image/2018/11/05/6367702383272217281239892.jpg)

甚至电信没有屏蔽80端口：

![](https://qimg.ithome.com/image/2018/11/05/6367702392107071682517503.jpg)

有IPv6的朋友们可以连接[http://\[240e:ec:865:fd00:951b:d8c1:c33e:c791\]/](http://[240e:ec:865:fd00:951b:d8c1:c33e:c791]/)看看能不能访问，目前显然是没有屏蔽任何端口的，不过相信很快像IPv4一样屏蔽了。

3.动态

经过测试，分到的IPv6地址是动态的，第三位和第四位会变。如果需要绑定稳定的域名，从来在外面访问，就需要一个DDNS了。

![](https://qimg.ithome.com/image/2018/11/05/6367702476159805118563349.jpg)

（绑定了IPv6的域名）

4.连通性

（1）QQ可以毫无压力的ping通

![](https://qimg.ithome.com/image/2018/11/05/6367702439755701045248157.jpg)

（2）Google能获取地址，无法ping通，也上不了，显然那啥已经建成

![](https://qimg.ithome.com/image/2018/11/05/6367702445580506467719121.jpg)

（3）中文维基百科能ping通但访问不了，显然那啥已经升级。

![](https://qimg.ithome.com/image/2018/11/05/6367702455863416302972816.jpg)

（4）有些ip教育网能ping通，电信网ping不通，显然那啥也会区别对待

![](https://qimg.ithome.com/image/2018/11/05/6367702470121133026180834.jpg)

（5）Telegram可以连接