---
lang: zh-CN
title: 羊毛党的胜利——用Google Colab的免费P100训练deepmd-kit模型
categories:
  - Chemistry
date: 2020-03-09
---
最近几个月，Google Colab上线了免费的P100。本文介绍如何用Google Colaboratory的免费P100训练deepmd-kit模型。

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1lYBrGK5nEJdi8PMmmaTMPtMzgPj4lmBh)

在Google Drive上传训练需要的文件。为了方便展示，这里以GitHub的库里的example为例，但是stop_batch被调为了20000。

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1lTf38Zm1FT7ruXNuUNJ4RAYOzdG0FN1u)

打开Colab网站https://colab.research.google.com/ ，点击下方的“新建笔记本”：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1lTf38Zm1FT7ruXNuUNJ4RAYOzdG0FN1u)

进入Colab界面，点击代码执行程序>更改运行时类型，将硬件设置为GPU：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1ezSolpIArFhNlIW28aQHImM-AKuQJCpI)

用!nvidia-smi看一下被分到的卡是什么型号，看看是不是较差的P4，毕竟能否抢到P100也个玄学的事情。如果不是，可以重复执行以上操作。

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1znfGlsO6Y25O00AwF8hqRzM2JKrj2qmz)

用!pip install deepmd-kit tensorflow==2.1 配置环境：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1sHgdDq_bl1Fyk5-tsUVL-PEYvJi6koFd)

挂载Google Drive。点击左侧的“文件”图标，点击“挂载Google云端硬盘”，并且同意访问：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1tRa2ZW1ByVHgM1VFWSl3ym8jq9AeQ9de)

cd到刚才上传目录训练，然后坐等训练完成。

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1vMGoBQGVPrTF6yWcJ19nT4evClt9fANH)

免费的还是挺香的。

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1quUP685tzfjiZui7Sbx9A7BarW75yx9G)

保存模型：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1amPAy7Fa9BqoZikb55CLT2vqwwfDbz3I)

测试模型。由于我只训练了20,000个batch，精度没有达到最高水平：

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1JgD5mkUl6KxrhgurfZls52DcFXwt6-SX)

回到Google Drive，我们发现，所有训练文件都在里面了——也就是说如果中途断线也可以继续训练。

![](https://img.njzjz.win/?url=drive.google.com/uc?id=1c_SbEpW0pOK2BnJ0eQjrW84Tqs9rGexI)

[本文的colab文件](https://colab.research.google.com/drive/1afUT0ckcY57QfPskJdBESnIeHkljRPlS)
