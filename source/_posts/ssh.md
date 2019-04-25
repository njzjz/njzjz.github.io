---
lang: zh-CN
title: 两步提升Linux下ssh的使用体验
url: 90.html
id: 90
categories:
  - Chemistry
date: 2018-06-20 00:34:27
tags:
---

2018/06/20

免密和别名。

### 免密

    ssh-keygen -t rsa

一路回车，将在~/.ssh/目录下生成密钥（id\_rsa）和公钥（id\_rsa.pub）。

    <span class="c1" style="font-style: italic;color: rgb(153, 153, 153);">#以106.14.182.145这个服务器为例</span>
    ssh-copy-id root@106.14.182.145

输入密码后，即把公钥信息（id\_rsa.pub）拷入服务器的authorized\_keys中。再次登录：

    ssh root@106.14.182.145

再也不用输密码了。

### 别名

    vi ~/.ssh/config

在config文件中输入：

    Host aliyun
    HostName 106.14.182.145
    User root
      
    Host xxx
    HostName xxx.xxx.xx.xxx
    User xxx
    Port xx

保存，然后将config文件的权限设置为600：

    chmod 600 ~/.ssh/config

现在，ssh可以用aliyun替代root@106.14.182.145了：

    ssh aliyun

### 备注

这两步设置后，Ubuntu子系统是Windows最好的ssh软件。
