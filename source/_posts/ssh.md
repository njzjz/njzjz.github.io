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

{% source zhihu 38302624 2018 6 20 %}
{% source wechat 5Z-umzDJfTkv19TnrhqdNQ 2018 6 20 %}

免密和别名。
<!--more-->

### 免密

```sh
ssh-keygen -t rsa
```

一路回车，将在~/.ssh/目录下生成密钥（id\_rsa）和公钥（id\_rsa.pub）。

```sh
#以106.14.182.145这个服务器为例
ssh-copy-id root@106.14.182.145
```

输入密码后，即把公钥信息（`id_rsa.pub`）拷入服务器的`authorized_keys`中。再次登录：

```sh
ssh root@106.14.182.145
```

再也不用输密码了。

### 别名

```sh
vi ~/.ssh/config
```

在`config`文件中输入：

```
Host aliyun
HostName 106.14.182.145
User root
      
Host xxx
HostName xxx.xxx.xx.xxx
User xxx
Port xx
```

保存，然后将config文件的权限设置为600：

```sh
chmod 600 ~/.ssh/config
```

现在，ssh可以用aliyun替代`root@106.14.182.145`了：

```
ssh aliyun
```

### 备注

这两步设置后，Ubuntu子系统是Windows最好的ssh软件。
