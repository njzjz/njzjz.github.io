---
lang: zh-CN
title: OpenConnect 分流教程
categories:
  - Chemistry
date: 2020-02-05
tags:
---

很久没有写技术贴了。最近，总有在Linux环境下连回ecnu服务器的需求，但是又不想丧失使用Google的权利，怎么办？openconnect是一个非常好的开源软件，可以实现这一需求。

openconnect支持AnyConnect、Pluse Connect等诸多高校常用的校外访问平台，可以用包：

```sh
sudo apt install openconnect
```

或

```sh
sudo dnf install openconnect
```

然后用pip安装vpn-slice：
```sh
pip install vpn-slice
```
确定`which vpn-slice`能够找到路径。

方便起见，我们先设置环境变量：
‵‵`sh
export SERVER=vpn-cn.ecnu.edu.cn
export USERNAME=20199966
export PASSWORD=<HIDDEN>
export IPRANGE="219.228.63.0/21 59.78.176.0/20 59.78.199.0/21 202.120.80.0/20 222.66.117.0/24"
```

`SERVER`是要连接的服务器地址，`USERNAME`是我的用户名，`PASSWORD`是密码，`IPRANGE`是需要用VPN访问的IP段，这里就是ecnu的IP段。然后我们使用openconnect连接：
```sh
echo "$PASSWORD" | \
sudo openconnect $SERVER \
     -m 1290 \
     -u $USERNAME \
     --passwd-on-stdin \
     -s "$(which vpn-slice) $IPRANGE" \                                                                                                                                                                                                                                                                                       
     -b \
     --syslog
```
即可连接成功。

ping ecnu的服务器，大致就是中美之间的正常延迟：
```sh
(base) [jz748@muscato bin]$ ping 219.228.63.136
PING 219.228.63.136 (219.228.63.136) 56(84) bytes of data.
64 bytes from 219.228.63.136: icmp_seq=1 ttl=62 time=246 ms
64 bytes from 219.228.63.136: icmp_seq=2 ttl=62 time=246 ms
64 bytes from 219.228.63.136: icmp_seq=3 ttl=62 time=246 ms
64 bytes from 219.228.63.136: icmp_seq=4 ttl=62 time=246 ms
64 bytes from 219.228.63.136: icmp_seq=5 ttl=62 time=246 ms
64 bytes from 219.228.63.136: icmp_seq=6 ttl=62 time=246 ms
64 bytes from 219.228.63.136: icmp_seq=7 ttl=62 time=246 ms
64 bytes from 219.228.63.136: icmp_seq=8 ttl=62 time=246 ms
```

ping google，延迟极小：
```
(base) [jz748@muscato bin]$ ping www.google.com
PING www.google.com (172.217.12.164) 56(84) bytes of data.
64 bytes from lga25s62-in-f4.1e100.net (172.217.12.164): icmp_seq=1 ttl=53 time=2.10 ms
64 bytes from lga25s62-in-f4.1e100.net (172.217.12.164): icmp_seq=2 ttl=53 time=2.25 ms
64 bytes from lga25s62-in-f4.1e100.net (172.217.12.164): icmp_seq=3 ttl=53 time=2.30 ms
64 bytes from lga25s62-in-f4.1e100.net (172.217.12.164): icmp_seq=4 ttl=53 time=2.32 ms
64 bytes from lga25s62-in-f4.1e100.net (172.217.12.164): icmp_seq=5 ttl=53 time=2.31 ms
64 bytes from lga25s62-in-f4.1e100.net (172.217.12.164): icmp_seq=6 ttl=53 time=2.25 ms
64 bytes from lga25s62-in-f4.1e100.net (172.217.12.164): icmp_seq=7 ttl=53 time=2.20 ms
```
