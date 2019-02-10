---
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

![](https://pic2.zhimg.com/v2-ca4634b9378004b0021e343493d628dd_b.jpg)

2.注册腾讯云账号（必须使用微信注册）：

![](https://pic2.zhimg.com/v2-9de9f2759a872724deaf5d3e7451d2d5_b.jpg)

3.注册及登陆成功后，在[https://studio.dev.tencent.com](https://studio.dev.tencent.com/) 点击”进入工作空间“：

![](https://pic2.zhimg.com/v2-61f89b75e06d95798848a9c4b56ec928_b.jpg)

4.按提示设置用户名后，点击”新建工作空间“：

![](https://pic3.zhimg.com/v2-993b0ecb9a109473f6fa1de011469a48_b.jpg)

5.项目名设置为wordpress，下方选择“从模板创建”，选择WordPress，点击创建：

![](https://pic3.zhimg.com/v2-17ad66ead7e74ffe18ff2fdab12a22d5_b.jpg)

6.打开创建好的工作空间：

![](https://pic3.zhimg.com/v2-7d7aff6ea113fc6a6724997f0e61bc3f_b.jpg)

7.加载完成后，最右侧点“一键部署”，再点“一键开启”：

![](https://pic4.zhimg.com/v2-8255bdd49703fa8d45c0f0f5aedffc54_b.jpg)

8.在“资源管理”菜单，有数据库的连接信息：

![](https://pic3.zhimg.com/v2-7b0388c521adc480f2a4d7f8c60b2e93_b.jpg)

9.现在，在左侧“文件树”下找到wp-config-sample.php，右键重命名为wp-config.php；左键打开，从第23行起设置上一步获得的数据库信息，并保存：  

![](https://pic4.zhimg.com/v2-c1406269ce86436728d96472ef91e25f_b.jpg)

10.现在，回到“一键部署”的”基本设置“界面，点击”一键部署“：

![](https://pic1.zhimg.com/v2-0ea9a773983c9fc0e6a4eac861c18de1_b.jpg)

11.在“域名绑定“选项，可以看到一个[http://coding.io](http://coding.io/)结尾的域名（没有自己的域名可以用这个域名）；在自己的域名服务中添加CNAME记录，至该[http://coding.io](http://coding.io/)域名，然后在域名绑定界面添加自己的域名（这里以190107.njzjz.win为例），自己的域名就被添加了。

![](https://pic3.zhimg.com/v2-f26c2c3d8161ad4d9860ec0dfee7866a_b.jpg)

![](https://pic1.zhimg.com/v2-4799eb503fe7a0dd5de87b43bbb98318_b.jpg)

![](https://pic3.zhimg.com/v2-c619c64f9d4b0ca90e5195697ff21588_b.jpg)

12.待证书状态为”正常“时，打开自己的域名，填写站点的基本信息，点击Install WordPress，然后点击login in，会进入后台登陆界面：  

![](https://pic4.zhimg.com/v2-1a2f2b989d1a89a63f13a034e6f31b82_b.jpg)

13.现在，WordPress已经安装完毕，just enjoy it：  

![](https://pic3.zhimg.com/v2-3434069401f6b2218a51190d3baf8e49_b.jpg)

根据ping的结果，服务器位于香港腾讯云，所以无需备案：

![](https://pic1.zhimg.com/v2-e91f9f25f3b7a0c71308c804938a20d8_b.jpg)

**参考资料**

\[1\] 一键部署使用指南. [https://dev.tencent.com/help/cloud-studio/one-click-deploy](https://dev.tencent.com/help/cloud-studio/one-click-deploy)

\[2\] Cloud Studio介绍. [https://dev.tencent.com/help/cloud-studio/about-new-cloud-studio](https://dev.tencent.com/help/cloud-studio/about-new-cloud-studio)