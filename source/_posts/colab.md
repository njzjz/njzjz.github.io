---
lang: zh-CN
title: 羊毛党的胜利——用Google Colab的免费P100训练deepmd-kit模型
categories:
  - Chemistry
date: 2020-03-09
---
最近几个月，Google Colab上线了免费的P100。本文介绍如何用Google Colaboratory的免费P100训练deepmd-kit模型。

![](https://pic.downk.cc/item/5e66ee8798271cb2b8736135.jpg)

在Google Drive上传训练需要的文件。为了方便展示，这里以GitHub的库里的example为例，但是stop_batch被调为了20000。

![](https://pic.downk.cc/item/5e66eed998271cb2b8737690.jpg)

打开Colab网站https://colab.research.google.com/ ，点击下方的“新建笔记本”：

![](https://pic.downk.cc/item/5e66eed998271cb2b8737690.jpg)

进入Colab界面，点击代码执行程序>更改运行时类型，将硬件设置为GPU：

![](https://pic.downk.cc/item/5e66f0ce98271cb2b87405e0.jpg)

用!nvidia-smi看一下被分到的卡是什么型号，看看是不是较差的P4，毕竟能否抢到P100也个玄学的事情。如果不是，可以重复执行以上操作。

![](https://pic.downk.cc/item/5e66ef3a98271cb2b87392d5.jpg)

用!pip install deepmd-kit tensorflow==2.1 配置环境：

![](https://pic.downk.cc/item/5e66f0e898271cb2b8740c01.jpg)

挂载Google Drive。点击左侧的“文件”图标，点击“挂载Google云端硬盘”，并且同意访问：

![](https://pic.downk.cc/item/5e66f0fd98271cb2b874106b.jpg)

cd到刚才上传目录训练，然后坐等训练完成。

![](https://pic.downk.cc/item/5e66ef9698271cb2b873a643.jpg)

免费的还是挺香的。

![](https://pic.downk.cc/item/5e66f11798271cb2b874188e.jpg)

保存模型：

![](https://pic.downk.cc/item/5e66efd898271cb2b873c0e4.jpg)

测试模型。由于我只训练了20,000个batch，精度没有达到最高水平：

![](https://pic.downk.cc/item/5e66f09698271cb2b873f752.jpg)

回到Google Drive，我们发现，所有训练文件都在里面了——也就是说如果中途断线也可以继续训练。

![](https://pic.downk.cc/item/5e66f07198271cb2b873eadb.jpg)

[本文的colab文件](https://colab.research.google.com/drive/1afUT0ckcY57QfPskJdBESnIeHkljRPlS)
