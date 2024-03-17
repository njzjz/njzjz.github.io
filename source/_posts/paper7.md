---
lang: zh-CN
title: 我的第七篇论文
categories:
  - Chemistry
date: 2024-03-17
tags:
  - papers
---
{% source wechat kSmIoJWHoU5bMwbwrFsO2Q 2023 8 5 %}

![Front cover](https://s2.loli.net/2024/03/17/Eetc9qr6P8lkLiF.png)

## 〇

2021年7月，DeePMD-kit v2.0.0发布前夕，张林峰和王涵老师——也就是此文的通讯作者——问我要不要给DeePMD-kit软件写一篇新论文，作为该软件的标准参考。

<!--more-->

## 一

我接受了邀请，不过很快，我便发现写这论文充满了挑战。

第一，我之前从来没有写过这种纯软件的论文。有不少论文，虽然标题是软件，但是这些软件只包含一个主要功能，因此实际上是按照方法学的论文来写的，比如我的第一篇论文就是这个套路。而我现在要写的这篇论文实际上没有提出新方法，而是对软件已有功能的总结，重点就应该是软件本身。这种论文确实不多，不过近年来还是有可以参考的论文，包括LAMMPS、OpenBabel、CP2K、DFTB+，这些软件都历经多年的维护。

第二，DeePMD-kit已经实现的方法极多，但又是拆散在不同论文里，且可能已经过时。DeePMD-kit的首篇论文是2018年3月发表的，其中描述的模型，即local frame，已经弃用；描述DeepPot-SE的论文给出的平滑函数已经被修改过；三体嵌入描述符（se_e3）和fitting tensor的论文还没发表。而我需要全部理解这些公式，然后统一这些方法的符号，整合到同一篇论文里。

第三，我自己对DeePMD-kit的认识，也是逐渐上升的过程。在我还是本科生，开始第二篇论文的工作时，经历了不会用到会用的转变，对C++一知半解，对代码的贡献仅限于文档；本科毕业以后，完成第三篇论文和第四篇论文期间，逐渐能够理解代码、贡献功能、修复bug；而在2023年8月的今天，我已能够驾驭DeePMD-kit的任意一行代码。

这种有挑战性的东西恰好合我的口味，这论文便也断断续续地写着。经过大约半年的打磨，我们将整体内容分为功能和技术细节两大块，功能方面分节讨论模型、训练和模型偏差，技术细节讨论代码结构、易用性、可拓展性和开放性。

到了2022年年初，初稿几乎草拟完成。不过2022年的科研工作颇多，我的主力时间花在第五篇论文的工作上，同时又分了一些时间给很多其它论文，两位通讯作者也很忙，于是，这篇论文几乎毫无进展；另一方面，我们也不太确定这篇文章应该投哪里去，似乎除了CPC以外没有更好的选择。

## 二

到了2023年2月4日，我的第六篇论文已经搞定，神清气爽。这时林峰告诉我说，Journal of Chemical Physics (JCP)搞了一个名为Software for Atomistic Machine Learning的special topic，deadline是4月，问要不要把文章投掉。

![Special topic](https://s2.loli.net/2024/03/17/K6NkcIJGBWoXb1y.png)

JCP搞软件的special topic也有好几年历史了。2020年，JCP搞了个名为“Electronic Structure Software”的special topic，结果尝到了甜头，这些软件论文成为JCP引用最高的文章，大幅提高了期刊的影响因子。于是，2021年，JCP又新开辟了一个名叫“chemical physics software”的section，专门用于描写软件包，并且开始定期开辟新的software special topic。

我说好啊。这个special topic看起来非常契合，恰好解决了不知道论文投哪的难题。同时，JCP的口碑似乎不错。事情便明确起来：确定作者名单，并在两个月内完成论文。

## 三

经过调研，我发现确定作者名单并没有固定的学术准则。一些软件会邀请所有对代码有贡献的人成为作者（例如DFTB+），另外一些软件仅仅邀请一部分人撰写文章（例如LAMMPS）。考虑到中国人的习惯，以及鼓励外部开发者贡献的目的，我还是选择了前者，通过邮件+问卷的形式邀请了所有贡献者，最后共有47人接受邀请。

给47人排出一个作者次序，也不是一件容易的事情。我也观察到有两种方法：全部按贡献确定，或者除了一作和通讯，其余作者按首字母顺序确定。也就是说，作者次序同样没有明确的标准。我个人认为按首字母排序并不公平，但是这么多作者确实不容易确定贡献大小。最后，我采用这样的方法：将所有作者按照贡献种类分为五大类，每一类中再用冒泡法，凭感觉对贡献排序；对于贡献较小、无法主观排序的类别，再按首字母确定顺序。

与此同时，我翻出了一年前完成的手稿，看看主要还缺少什么：两年来的所有新功能，一个benchmark段落，以及一些参考资料。经过讨论，我们确定了具体的思路。benchmark段落设置5个体系，5个模型，2个精度，以及5种不同硬件，分别进行benchmark。

4月初，在张铎（第二作者）的协助下，我终于把所有内容全部搞定。王涵老师花了一周时间review，我又用ChatGPT润色了一遍文章后，论文定稿，manuscript共50页。在给所有作者确认后，我们赶在deadline的前两天预发表，并在deadline的最后一天提交了论文。

顺便一提，投稿系统很不友好，光作者名单就填了一个多小时。

## 四

5月末，我们收到了两位审稿人的二十几条审稿意见。大部分审稿意见多要求修改或补充内容，没有什么大问题。不过其中一条意见很是令人惊愕：“At the moment, this paper has a much heavier computational science and machine learning focus, but less emphasis on chemical physics.  There are no explicit demonstrations of how this package could benefit our reader’s community.” 这听起来就很离谱，我投一个“化学物理软件”的section、一个“原子机器学习软件”的special topic，如果不去讨论机器学习算法和软件，不就偏题了吗？尤其是，这个section确实要求讨论算法和软件：

![Section](https://s2.loli.net/2024/03/17/pjM1uahYqAEIB8T.png)

于是我把这一整段贴到了response上，毫不客气地反驳了这条审稿意见。

6月下旬，我投回了论文。主要新增部分包括：introduction一节介绍代表性工作；第三方软件一节新增对各个第三方软件的介绍；新增molecular dynamics一节；benchmark一节新增对数据集的介绍；新增附录介绍过渡函数的生成方法，以及GPU尚不支持的功能。此时manuscript的页数膨胀到了61页。

## 五

2023年7月3日，文章终于被接受。此时，距DeePMD-kit v2.0.0发布已有两年时间。这是我第一次写这种大杂烩式的开源软件论文，也是我写过的字数最多、公式最多、作者最多、单位最多、基金数最多的论文。

Jinzhe Zeng, Duo Zhang, Denghui Lu, Pinghui Mo, Zeyu Li, Yixiao Chen, Marián Rynik, Li'ang Huang, Ziyao Li, Shaochen Shi, Yingze Wang, Haotian Ye, Ping Tuo, Jiabin Yang, Ye Ding, Yifan Li, Davide Tisi, Qiyu Zeng, Han Bao, Yu Xia, Jiameng Huang, Koki Muraoka, Yibo Wang, Junhan Chang, Fengbo Yuan, Sigbjørn Løland Bore, Chun Cai, Yinnian Lin, Bo Wang, Jiayan Xu, Jia-Xin Zhu, Chenxing Luo, Yuzhi Zhang, Rhys E. A. Goodall, Wenshuo Liang, Anurag Kumar Singh, Sikai Yao, Jingchao Zhang, Renata Wentzcovitch, Jiequn Han, Jie Liu, Weile Jia, Darrin M. York, Weinan E, Roberto Car, Linfeng Zhang, Han Wang, DeePMD-kit v2: A software package for Deep Potential models, The Journal of Chemical Physics, 2023, 159, 054801.

## 六

大部分开源软件的共性问题是，即使积累了足够多的使用者，但开发者仍然很少。如何吸引更多的开发者，仍是一件需要长期思考的事情。DeePMD-kit也不例外。所以最后打个广告：欢迎加入DeePMD-kit的开发团队！