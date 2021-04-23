---
title: WSL GUI初体验
date: 2021-04-22
lang: zh-CN
tags:
  - Linux软件安装
---

{% source wechat QMc_MyvtaX-aIkSo06ynBg 2021 4 22 %}
{% source zhihu_answer 1849794023 2021 4 22 %}

惊闻微软终——于——[放出了WSL GUI](https://devblogs.microsoft.com/commandline/the-initial-preview-of-gui-app-support-is-now-available-for-the-windows-subsystem-for-linux-2/)（WSLg），赶紧体验一把！

# 升级系统和WSL

首先系统要升到Insider Preview 21364！

![升级Win10](https://pic2.zhimg.com/80/v2-b03ee70364970448c7ae6b6679d802cf.jpg)

升级Win10

![升到21364的水印](https://pic4.zhimg.com/80/v2-e8b796248fec4fccbd16ccf49a17cdaa.jpg)

升到21364的水印

升级完毕之后，用管理员权限打开PowerShell，升级并重启WSL2：

```ps
wsl --update
wsl --shutdown
```

# 解决bug

兴冲冲打开Windows Terminal，输入`pymol`，咦，怎么连不上？

打开GitHub，果然已经有人[提了issue](https://github.com/microsoft/wslg/issues/19)，开发者表示，在设置里把第一屏放到第二屏的右边，可以临时解决这个bug……

![issue](https://pic1.zhimg.com/80/v2-f85b29f786604977d25346ab7945c38a.jpg)

![bug](https://pic2.zhimg.com/80/v2-f65f48e989e3ce24134d62aebd243baf.jpg)

什么奇奇怪怪的bug

然后再用`wsl --shutdown`重启，这次ok了！

#运行本地程序

pymol，丝滑般流畅！

![pymol](https://pic4.zhimg.com/80/v2-4a272f28f3ef500daf0ff6353618df3e.jpg)

VMD，也不逊色！拖曳旋转样样在行，甚至触屏体验也不错。

![VMD](https://pic2.zhimg.com/80/v2-cf443ad0d524d8853e0fa77d914b3a60.jpg)

{% bilitube oDdUxCOcgr4 BV1sy4y147JG %}
WSL GUI运行VMD

甚至自己用Python写的超级简陋版GUI也能愉快运行：

![ReacNetGeneratorGUI](https://pic1.zhimg.com/80/v2-917e9c02ad914c0df3712b0103442fa8.jpg)

# ssh运行远程程序

使用`ssh -Y`连接办公室的机子，仍然可以打开VMD！观看静态画面毫无问题，受限于Wi-Fi的网速，拖曳、旋转画面出现稍许延迟，但仍远远优于Xming的体验。

![ssh](https://pic1.zhimg.com/v2-dd5096fe848cfd7f1f1bb61846d557e4.jpg)

# Xming再见

再也不需要Xming了！

![goodbye-xming](https://pic2.zhimg.com/v2-36d15b5191fe49c3ec469981ae5c2a54.jpg)
