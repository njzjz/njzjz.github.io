---
lang: zh-CN
title: 华东师范大学VPN已经开始限速
categories:
  - Life
date: 2019-02-09
---
{% source wechat leILlAcT1cSyHR2OPdcbPg 2019 2 9 %}

为了测试学校VPN的速度，本文中用Speedtest对比了不连接VPN、连接电信网节点和连接教育网节点的速度。为了控制变量，测试服务器均采用中国联通的上海节点（Shanghai Branch, China Unicom，ID：5083）。
<!--more-->
![不连接VPN时的速度](https://bb.njzjz.win/file/jinzhe/img/1AqAQpx6lOIcVar4NdokIVOH-jcTuNpzP)
不连接VPN时的速度

![电信网节点](https://bb.njzjz.win/file/jinzhe/img/1xPyKV1tDXzY5ieEyWV9IMsa6ycaZYPnP)
电信网节点

![教育网节点](https://bb.njzjz.win/file/jinzhe/img/1YAYHnUwoGGjzymR_UqveU2msMiSensb0)
教育网节点

可以看出，使用VPN时的网速明显慢于不使用VPN时的速度。由于不连接VPN时网速正常，可以排除是笔者手机、宽带或者测速服务器的问题，可以断言，就是学校的VPN问题。
由于目前是深更半夜，因此可以排除是用的人太多导致的，学校线路也不会只有区区20Mbps的带宽。
学校的进出口是否本身就限速？我们使用笔者使用的一台位于学校的电脑进行探究。我们安装了speedtest-cli进行测速：

```sh
pip install speedtest-cli
speedtest-cli --server  5083
```

![测速结果，下载速度93.59Mbps](https://bb.njzjz.win/file/jinzhe/img/1DmTgE2vOaBDVD737klrOojOjSoHhz5eS)
测速结果，下载速度93.59Mbps

我们仍然使用5083服务器进行测速，下载速度可达93.59Mbps，是VPN的20Mbps的近五倍。因学校目前并未部署千兆网络，这确实是峰值网速，可见学校网络进出并未限速。

现在，我们可以断言，学校VPN确实进行了限速。
