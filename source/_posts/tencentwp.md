---
lang: zh-CN
title: 薅腾讯羊毛——零成本搭建WordPress博客
url: 128.html
id: 128
categories:
  - Technology
date: 2019-01-07 02:48:50
tags:
---

（2019年1月7日测试；域名成本除外）

1.打开Cloud Studio网站（[https://studio.dev.tencent.com](https://studio.dev.tencent.com/)），点击右上角注册按钮注册（若已有腾讯云账号，可直接登陆）：
<!--more-->

![](https://api.njzjz.win/1vP9IimsyYKgr2-OVOgSnqdv4iVD3ohsT)

2.注册腾讯云账号（必须使用微信注册）：

![](https://api.njzjz.win/1UYxRi1QFmaIHgLEsmdMUJhBbdmJZ1770)

3.注册及登陆成功后，在[https://studio.dev.tencent.com](https://studio.dev.tencent.com/) 点击”进入工作空间“：

![](https://api.njzjz.win/1ShngQ-wvKRmShzcabAC_qQNNu-YZTS-f)

4.按提示设置用户名后，点击”新建工作空间“：

![](https://api.njzjz.win/15U8BB_ebxdu0BCYG55o6DaY-GNSpaR2E)

5.项目名设置为wordpress，下方选择“从模板创建”，选择WordPress，点击创建：

![](https://api.njzjz.win/1Y5hOS4axawaKBKb7zQMOiW8bncWWurAl)

6.打开创建好的工作空间：

![](https://api.njzjz.win/1lT23VPjEQhnMJgGnajAqwxoHwPLgP6rS)

7.加载完成后，最右侧点“一键部署”，再点“一键开启”：

![](https://api.njzjz.win/1-Tgr6v57gUK17BgEA_PkTzTGmiHYgG7L)

8.在“资源管理”菜单，有数据库的连接信息：

![](https://api.njzjz.win/1gUFuCUisqvmp5Ktd3xlj9xDo9n9kLtTM)

9.现在，在左侧“文件树”下找到wp-config-sample.php，右键重命名为wp-config.php；左键打开，从第23行起设置上一步获得的数据库信息，并保存：  

![](https://api.njzjz.win/1W3jYTEuE9Kfq66M8HcdhJ_EmiZEsWK0h)

10.现在，回到“一键部署”的”基本设置“界面，点击”一键部署“：

![](https://api.njzjz.win/1DgKc7FdmwyCtc1KNu9i-VzeshL0zZXV8)

11.在“域名绑定“选项，可以看到一个[http://coding.io](http://coding.io/)结尾的域名（没有自己的域名可以用这个域名）；在自己的域名服务中添加CNAME记录，至该[http://coding.io](http://coding.io/)域名，然后在域名绑定界面添加自己的域名（这里以190107.njzjz.win为例），自己的域名就被添加了。

![](https://api.njzjz.win/1ttI49lPNg31hfkrAhbauPBdQ0C_wkJSG)

![](https://api.njzjz.win/1ShXE4UBtbfSpVuGSRwmXakTE_A7tlUTN)

![](https://api.njzjz.win/1ej2f9y18v_Yx3Y5Ecm6DbOI0qrSS8tSQ)

12.待证书状态为”正常“时，打开自己的域名，填写站点的基本信息，点击Install WordPress，然后点击login in，会进入后台登陆界面：  

![](https://api.njzjz.win/1gh9sErL6d-2Fr6bpNlrYbGQXT7rzu53e)

13.现在，WordPress已经安装完毕，just enjoy it：  

![](https://api.njzjz.win/1if6FTCV6Eucxv17v-EZ-EmgGuXQE1UaU)

根据ping的结果，服务器位于香港腾讯云，所以无需备案：

![](https://api.njzjz.win/13xqmtYEnOqbuYbSfdaYWP_8AQI0OxbEQ)

**参考资料**

\[1\] 一键部署使用指南. [https://dev.tencent.com/help/cloud-studio/one-click-deploy](https://dev.tencent.com/help/cloud-studio/one-click-deploy)

\[2\] Cloud Studio介绍. [https://dev.tencent.com/help/cloud-studio/about-new-cloud-studio](https://dev.tencent.com/help/cloud-studio/about-new-cloud-studio)
