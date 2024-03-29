---
lang: zh-CN
title: 我的第五篇论文
categories:
  - Chemistry
date: 2023-05-30T01:24:00-0400
tags:
  - papers
---
{% source wechat itWtvFBIyHtJ4DGn4xu_LQ 2023 2 28 %}

![题图](https://s2.loli.net/2023/05/30/undqiU3XDANvyOr.png)

![封面](https://s2.loli.net/2023/05/30/8Cm7PyaGc9UB3il.png)

## 上兵伐谋

上回说道，2020年春，DPRc被设计出来，并应用于一个简单的RNA自催化体系中。这以后，DPRc的两个后续研究方向也明确下来，其一，是将DPRc应用到溶液反应的自由能计算中，包括组里在搞的几个RNA催化体系；其二，便是将DPRc应用到药物发现中，预测溶液中药物的结合自由能，将其拆成QM/QM模型和QM/MM作用模型，分别训练。
<!--more-->

药物分子主要是小分子有机物，当时最好的数据集是ANI-1x。2022年春，受到DPRc启发，我拿ANI-1x数据集，在同样条件下，分别测试了纯DP模型和DFTB3+DP模型，结果发现，DFTB3+DP模型的force error只有纯DP模型的一半，并且已经比其它所有的半经验方法以及ANI-1x、ANI-2x模型的force error都要低。

这时我们便考虑，抛开QM/MM不谈，先搞一个世界上最准确的真空中的药物分子模型。

## 其次伐交

很快，我遇到了第一个问题。虽然我的模型对force的预测奇准无比，但是能量的误差显得有点离谱。修复两个提取数据的bug后，我最后发现，模型没有问题，有问题的是数据。在一些化学键断裂（可能是自由基）的体系中，DFTB3给出的能量比较离谱，似乎根本没有收敛（可见Figure S1）。AMBER和DFTB+给出了相同的结果，因此不是软件bug。我想，这种奇怪的曲线，应该会有文献讨论吧？然而，遍寻DFTB3相关的文献，以及用DFTB3与ANI-1x数据集做的类似的工作，都没有找到合理的解释。当时，我并不知道还有xTB这种东西（xTB没有这个问题），最后找了三个合理的理由去掉ANI-1x数据集中的这些自由基：一是DFTB3的结果比较离谱，二是ANI-1x数据集把所有结构的自旋多重度设为1（包括氧气），准确性成疑；三是一个药物分子模型，实际上不需要预测这些结构。

遇到的第二个问题，是甲方（导师）希望能训练一个反应的能量（ΔE）。这个需求看起来挺头疼的，因为改造DeePMD-kit输入的难度不小。不过，我想出了一个变通的方案：把反应物和生成物放在一起，但是隔得很远，又是非周期性体系，最后把loss改一改就行了。

最后一个问题，是导师还希望扫描出几个小分子沿二面角旋转的2D PES，并绘制出几个构型之间，能量最低的路径，从而丰富文章内容。现有文献对relax scan的介绍颇少，经过我探索以后，发现一个从我的模型出发的迭代优化方法：首先生成一组初始构型，然后用我的模型，从某点周围的点优化，取能量最小的构型；如此迭代若干次，即可得到我的模型的最优构型；再以此构型出发，得到DFT和其它方法的构型。这样便大大节省了空间。而路径方面，恰好我10月时为了回答一个知乎问题，研究过鄂老师的string method，却没想到，到11月刚好用得上，便手搓了一个string method的程序。

## 其次伐兵

而在具体的炼丹环节，我瞄准了组里一台没人用的台式机上唯一的一块3090Ti，虽然不知道原因，但它确实比V100还快。同时，我也用了压缩训练+FP32，事实证明FP32对精度没有任何影响，反而能大大加快训练速度。最后训练了6轮后（其实是不断返工），总训练步数超过了2亿步，模型的精度成功超越了其它所有方法。

说到“其它所有方法”，就不得不提到我之前实现过的dpdata插件功能。我把所有比较的方法统一到了dpdata的接口，从而能够用同一套代码，比较不同方法的精度。

## 其下攻城

这个模型叫什么？导师提供了两个idea，一是Quantum Deep Potential Interaction (QDPI，QDπ)，谐音cutie pie（小可爱），二是Drug Discovery Deep Potential（D3P）。显然第一个选项更有意思（虽然对中国人而言并不直观），于是我决定，就把模型叫QDπ。

这时，导师收到了JCP special topic的约稿，决定把文章中的一部分结果拆出来，拆成另一篇文章。应该会在本系列的下一期中详细介绍。

2022年11月下旬，文章的所有作者搞定了文章的所有内容后，我便把文章投稿到JCTC。12月下旬，审稿意见返回，一个审稿人打了7分，接受；另一个审稿人打了9分，小修。这是我人生中第一次碰到直接accept的审稿人，也算是最顺利的一篇文章。小修的意见是应该指出模型的缺点。2023年的第2天，我将文章修回；2023年的第8天，文章便接受了。

除此以外，文章的二作还创作了期刊封面，这一封面在修回时一起提交，并于文章接受两天后，顺利接受。

{% publications %}
Zeng_JChemTheoryComput_2023_vNone_pNone
{% endpublications %}

至此，总算在数量上凑齐五篇代表作。接下来希望能用更好的成果“替换”以前的成果。
