---
lang: zh-CN
title: 我的第四篇论文
categories:
  - Chemistry
date: 2021-12-19
tags:
  - papers
---
{% source wechat isnIdWAveDUhlfK_oQaOug 2021 12 18 %}

![Journal of Chemical Theory and Computation, 2021, 17 (11), 6993-7009.](https://pic.njzjz.win/p0.png)

前置论文：
- {% post_link paper1 我的第一篇论文 %}
- {% post_link paper2 我的第二篇论文 %}
- {% post_link paper3 我的第三篇论文 %}

## 序幕·负笈担簦

时间回到两年前的夏天，我离家数万里，与套磁已久的Darrin M. York会晤，相谈甚欢。按照安排，第一学期分为两个rotation，两个rotation结束后才选择导师。当然，这种安排对于我们来说，只是一个形式，我和Darrin约定在第二个rotation会合。

我的第一个rotation找到了Lu Wang，完成了一个新手级别的任务；第二个rotation期间则没有任何任务，按照Darrin的说法，rotation只是用来“感受课题组氛围”的形式。总体来说，rotation设立的初衷是好的，可以感受到不同课题组的氛围，但是由于时间过短，无法体验到真正的课题，总有一点虚度光阴的意味。在此期间，我的精力就放在了{% post_link paper3 第三篇论文 %}中。
<!--more-->

## 第一幕·披沙拣金

转眼间到了冬天，在我的强烈要求下，我们开始讨论“真正的课题”。考虑到我之前的背景，Darrin提出想让我用机器学习方法改进QM/MM计算，从半经验的势能矫正到更高级别的势能，从而加速ab initio精度的动力学模拟（图1）。

![图1](https://pic.njzjz.win/p1.jpg)

图1：讨论记录

当时，Darrin正好与Adrian Roitberg有合作的项目，便想让我从ANI入手，试一试他们开发的TorchANI。然而，当我开始尝试TorchANI以后，却发现它的文档竟然比当时DeePMD-kit的文档还要稀烂！DeePMD-kit的文档{% post_link deepmd-kit-2.0 虽然缺少很多细节 %}，但是入门是没有问题的，{% post_link paper2 当年我上手的时候 %}是没有压力的。可是，看着TorchANI的文档，我发现第一步便遇到困难：怎么生成数据集？格式、单位为何？开发者表示，TorchANI不支持构建数据集，需要我自己编写，但又没给更多的信息。我便意识到，他们似乎只是想推广自己的数据集和模型，并不鼓励用户使用用户自己制作的数据集。数日后，我决定放弃TorchANI，转而劝Darrin回到DeePMD-kit的荫蔽下。

此时，和我相识已一年的张林峰刚好在30公里外的Princeton University读书，我便邀请他来课题组参观，顺便做一个talk。2019年12月6日，林峰驾车前来，向组里介绍了Deep Potential（DP）的最新进展，使Darrin大受震撼。我们便确立了使用DP的基本方针。

## 第二幕·阐幽明微

如果想把深度学习的模型应用于组里已有的课题中，就需要解决两个主要问题：其一，需要修改现有的模型，使之满足相应的物理规律；其二，将DP与AmberTools结合，包括DeePMD-kit的集成和工作流的设计。

我们的目标是从低精度QM/MM模型矫正到高精度QM/MM模型，如图2所示，由于两个模型的MM方法是一致的，它们之间的差应当恒等于0。如果用原始的DeepPot-SE模型，当我们拟合数据之后，这一部分自然应当趋近于0，但是并没有办法使之严格等于0，是unphysical的。很快，我们意识到，需要对深度学习模型进行修改，使模型中MM原子本身的能量和MM原子之间的相互作用均等于0。在林峰和王涵老师的提点下，我很快明白，需要修改embedding network和fitting network，从而实现这一功能。

然而，初版得到的模型预测真空中的原子能量时，虽然接近于0，却并不等于0。疑惑之下，我把embedding matrix打出来仔细研究，发现原来coordinate matrix（坐标矩阵）初始化不为0，从而导致最终的能量也不为0！2020年2月1日，正值农历初八，修复了这一问题后，对DeePMD-kit的改动就算完工了。

![图2](https://pic.njzjz.win/p2.png)

图2：从低水平的QM/MM模型校正到高水平的QM/MM模型

另一方面，组里之前一直用AmberTools进行模拟。AmberTools使用古老的Fortran 90语言，而DeePMD-kit使用C++ 11，将它们直接链接起来（而非用文件或者socket转换）似乎有些难度。组里的TimothyJ. Giese经验丰富，提出了如图3所示的链接方案。Fortran 不能和C++直接链接，但是Fortran和C++都有C接口，便可以通过C来实现转换。

![图3](https://pic.njzjz.win/p3.png)

图3：AmberTools与DeePMD-kit对接

相比之下，将AmberTools与DP-GEN和dpdata结合则显得没有什么难度，我们的最后流程就如图4所示。当然，更没难度的部分就是跑一个例子了，我们选取了一个简单的例子和两个最简单的半经验方法来测试模型，接下来等着收数据就行了。

![图4](https://pic.njzjz.win/p4.png)

图4：整体的workflow

## 第三幕·衔华佩实

收数据虽然简单，但由于是第一次摸索这一流程，需要设计参数，又可能反复推倒重来，于是便也花费了几个月时间。2020年冬，我先后解决了之前的两篇论文，又通过了Out-of-Field Research Proposal（OFRP）考核，便开始写这一篇文章了！完成了初稿以后，Darrin很细心地教我如何作图，又把文章的字数增加了一倍。

2021年2月，我把文章放到ChemRxiv后，又完成了人生中的首次投稿。预印本刚好成为了我In-Field Research Proposal（IFRP)的引用。当我已经成为一名PhD candidate以后，4月，审稿人意见指出，我们的active learning没有筛选新增的数据，可能为之后迁移到abinitio带来困难。恰好，我和Darrin都算是完美主义者，我们决定，完善方法，重跑所有数据。这一拖便到了9月，我们更新数据后便修了回去，之后很快便接受了。

和上一篇论文一样，这一篇也是方法性质的文章，将为接下来的某一篇论文奠定夯实的基础——有可能是第五篇，也有可能是第六篇，还有可能是第七篇。在这一篇的鼓舞下，我也确立了毕业前十篇论文（仅一作）的基础目标，目前已经实现4/10了，希望能早日完成全部目标。

{% publications %}
Zeng_ChemRxiv_2021
{% endpublications %}
