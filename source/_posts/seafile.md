---
lang: zh-CN
title: 在Ubuntu子系统中配置Seafile
url: 66.html
id: 66
categories:
  - Technology
date: 2018-02-07 00:21:38
tags:
---

2018年2月7日首发[知乎专栏](https://zhuanlan.zhihu.com/p/33579926)、微信公众号

Seafile，是“开源的私有云存储”。
<!--more-->

近日在家里的Windows台式机上的Ubuntu子系统配置了Seafile。为啥不直接拿台Linux电脑？当然是因为穷，交不起两台电脑的电费……

Ubuntu子系统，需要Windows 10 专业版 版本 1709以上，在控制面板->程序->启用或关闭 Windows 功能中打开适用于 Linux 的 Windows 子系统，然后在Microsoft 应用商店中下载Ubuntu即可。

* * *

### 安装

首先需要下载好Seafile的Linux 服务器端：[下载 \- Seafile​www.seafile.com](https://www.seafile.com/download/)

或者

```sh
cd
mkdir seafile
cd seafile
wget http://seafile-downloads.oss-cn-shanghai.aliyuncs.com/seafile-server_6.2.5_x86-64.tar.gz
tar -vxzf seafile-server_6.2.5_x86-64.tar.gz
cd seafile-server_6.2.5
```  

接着装好Python和SQLite：

```sh
sudo apt-get update
sudo apt-get install python
sudo apt-get install python2.7 libpython2.7 python-setuptools python-imaging python-ldap python-urllib3 ffmpeg python-pip sqlite3
pip install pillow moviepy
```    

安装并启动：

```sh
./setup-seafile.sh
./seafile.sh start
./seahub.sh start
```    

浏览器打开[http://localhost:8000/](http://localhost:8000/)，应该就可以看到Seafile界面。

![](https://drive.google.com/uc?id=1WRNQBGzeaEADah1ZlLVECMx-UUaMPXbK)

* * *

### 防火墙设置

在高级安全 Windows Defender 防火墙中，创建入站规则，允许8000和8082两个端口通过。

* * *

### 设置开机启动

由于关掉Bash后，里面所有进程都会结束，所以我们要让Seafile在后台静默运行。

首先创建seafile.sh：

```sh
#/home/njzjz/seafile.sh
cd /home/njzjz/seafile/seafile-server-6.2.5/ #根据实际位置修改
./seafile.sh start
./seahub.sh start
$SHELL #挂起脚本进程
``` 

然后在Windows 系统中创建Seafile.vbs：

```vbs
Set ws = CreateObject("Wscript.Shell")
ws.run "bash -c 'sh /home/njzjz/seafile.sh'",vbhide
```    

最后，在计划任务中让Seafile.vbs开机自动启动即可。

![](https://drive.google.com/uc?id=1OBzqcDqp8O3_6Js8SmXyVomGZzFnd14q)

* * *

### 设置外网访问

首先确定有宽带有公网IP，如果没有，找运营商客服要。之前江苏电信把我的IP改成了100开头的内网IP，后来在微信上的江苏电信客服那里开通了一个名为“公网IPv4”的业务。

![](https://drive.google.com/uc?id=11Su9wwCKb5pAlWgZ0daJ6Jstr0cUVdO2)

如果开通不了，就用ngrok穿透……这篇文章就不说了。

在路由器中设置好端口转发，8000和8082端口都要，8000端口用来打开网页（因为80端口被中国的运营商屏蔽了），8082端口用来上传和下载文件：

![](https://drive.google.com/uc?id=1bbmiVFSCYT0H5tMzTRgjNcb4f9hXaOfO)

配置DDNS服务，这里推荐[Dynu](https://www.dynu.com/zh-CN/)，一个有中文的、免费的、非常稳定的DDNS服务商：

![](https://drive.google.com/uc?id=1PU79nwufmzuLS3Bq_cunPQ932ckD6qoZ)

当然可以把自己的域名再设置CNAME记录。这时，在任何网络，打开[http://cloud.njzjz.win:8000/](http://cloud.njzjz.win:8000/)就可以使用了。

* * *

Seafile有Windows、Mac、Linux、iOS、Android客户端，最良心的就是Linux客户端了。Onedrive因为没有Linux客户端，网页版又不能通过正常手段访问（IPv6下都不行），所以在Ubuntu下完全无法使用。
