---
lang: zh-CN
title: 在ECNU校园网内搭建反向代理
url: 72.html
id: 72
categories:
  - Chemistry
date: 2018-05-06 00:24:13
tags:
---

_2018年5月6日首发[微信公众号](https://mp.weixin.qq.com/s?__biz=MzIyMjA1MDA4MQ==&mid=2455134461&idx=1&sn=9053193f53bd55bc33be3b38283acbb6&chksm=ff91a2b3c8e62ba56be0b3a163311036550a23dbf076266255331c95e54c4e511a426874b486#rd)_

之所以不用学校的思科Anyconnect VPN服务，是因为其谜一般的稳定性：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1Y1eDE0hHw-od1lqUMvhoYUuzFl7D9KWF)

学校VPN真辣鸡

         16:38:46    Connected to vpn-ct.ecnu.edu.cn.
         16:38:48    Reconnecting to vpn-ct.ecnu.edu.cn...
         16:38:50    Establishing VPN - Examining system...
         16:38:50    Establishing VPN - Activating VPN adapter...
         16:38:50    Establishing VPN - Configuring system...
         16:38:51    Establishing VPN...
         16:38:51    Connected to vpn-ct.ecnu.edu.cn.

我也不是想要批判一番，但是这个Anyconnect频繁掉线，频繁重连，连接期间不能访问网络，稳定性也太差了吧？而且还不能自己设置分流，所有流量都要从学校网络走。

* * *

原料：公网机器一台（以腾讯云CentOS服务器为例）、内网机器一台（以Windows为例）、域名一个（指向公网机器）

* * *

### 公网机器

ssh连接公网机器，安装ngrok：

    domain="ngrok.njzjz.win" #换成自己的域名
    yum install gcc golang
    git clone https://github.com/mamboer/ngrok.git
    cd ngrok
    openssl genrsa -out rootCA.key 2048
    openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$domain" -days 5000 -out rootCA.pem
    openssl genrsa -out device.key 2048
    openssl req -new -key device.key -subj "/CN=$domain" -out device.csr
    openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000
    \cp rootCA.pem assets/client/tls/ngrokroot.crt -f
    \cp device.crt assets/server/tls/snakeoil.crt  -f
    \cp device.key assets/server/tls/snakeoil.key -f
    make release-server
    export GOOS="windows" GOARCH="amd64" && make release-client #如果内网机器是linux系统，将windows换成linux
    /root/ngrok/bin/ngrokd -domain="$domain" -httpAddr=":6060" -httpsAddr=":6061" -tunnelAddr=":6062" #启动ngrok服务

* * *

### 内网机器

将公网机器的ngrok/bin/windows_amd64/ngrok.exe复制下来：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1f4etJIMtnBsMlM9SKDfXi8VatR11j144)

从shadowsocks/libQtShadowsocks下载Shadowsocks Windows服务器端（如果无法下载自己想办法解决），可以放到同一个文件夹内：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1znJQldziPHgYAvs9_4Or1roQfVgf52Ar)

在同一文件夹编写config.json：

    {
        "server":"0.0.0.0",
        "server_port":10086,
        "local_address":"127.0.0.1",
        "local_port":10086,
        "password":"password",
        "timeout":600,
        "method":"aes-256-cfb",
        "http_proxy": false
    }

以及ngrok.yml：

    server_addr: "ngrok.njzjz.win:6062"
    trust_host_root_certs: false
    tunnels:
      ss:
        remote_port: 38382
        proto:
          tcp: 10086

现在应该有这些文件：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1ZpoumqLO9EivYYJtYejCWneIcS4Byi6k)

打开命令提示符，跳转到这个文件夹中，然后：

    shadowsocks-libqss -c config.json -S

再打开一个命令提示符：

    ngrok -log=ngrok.log -config=ngrok.yml start ss

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1isg-5qZ0s7I_1a5I_fCR-QLE_i6v0dd4)

显示online就说明连接成功了。

* * *

自己的机器，打开shadowsocks（略去下载过程），添加服务器：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1eRgc0WQt0lG7DhCrsLi3WTwI2rPTc_4n)

shadowsocksR可以单独设置一个端口：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=139-8vYOPQpR89EMFSdXLJpty9qlB1W6O)

这样就可以在Switchy Omega配置：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=11RdfB9yQayFcuWCTesO3H-FPzsvLBbcM)

并实现分流：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1NAALaWxrdhmz5_yV0gOuOtokc5StqClu)

就可以访问不对外网开放的网站了：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1LF_TLzVpxz1oTYyEXWGYf0f2f2LrsXWk)

以及下论文啥的：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=14hAA2hrKSipvdRm-12zSdSURevNebHj3)

Ubuntu子系统内则可以使用proxychains，使用代理连接学校内网的服务器：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1e31WNfe9gA_B29fNH4wBQw5GXd-izDmg)

当然手机上也能用：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1-Pv_CgFr5r6-pZgyl4BmyFdAe7hOnF9C)

速度受公网服务器带宽的影响。

### 参考资料

1.使用ngrok+shadowsocks穿透内网校外也能畅快看论文 - 庭上杨柳 https://xingtingyang.com/866.html

2.windows 下搭建shadowsocks 服务端 - CSDN博客 https://blog.csdn.net/wyvbboy/article/details/52540658
