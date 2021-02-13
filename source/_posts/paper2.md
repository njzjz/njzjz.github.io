---
lang: zh-CN
title: 我的第二篇论文
categories:
  - Chemistry
date: 2020-11-14
tags:
  - papers
update: 2021-02-14
---
{% source zhihu 286276757 2020 11 11 %}
{% source wechat Uau66ZWkpyJ8iw9FijiW1Q 2020 11 11 %}

![paper](https://api.njzjz.win/1axn45xLHDJZ1EVWb3fokP-6AxJKcFb2S)

今天，笔者的第二篇第一作者论文“Complex reaction processes in combustion unraveled by neural network-based molecular dynamics simulation”在Nature Communications正式发表。华东师范大学为论文的第一单位。

在这篇论文中，笔者生成了甲烷燃烧的数据集，并使用DeePMD-kit软件构建了基于深度学习方法的反应势能面，进行了长达1 ns的甲烷燃烧反应的分子动力学模拟。借助笔者开发的ReacNetGenerator软件，笔者探明了甲烷燃烧的微观反应机理，对每个基元反应提供了原子尺度的理解。

在此，本文以个人视角，回顾这篇论文产生和发表的历程。<!--more-->本文将分为以下几个部分：

一、深度学习⊗燃烧。

二、DP⊗燃烧。

三、论文发表。

四、总结和展望。

## 一、深度学习⊗燃烧

人类自从发现火以来，从未停止过对燃烧的研究。燃烧常发生于高温高压等极端条件下，反应极为迅速，因此实验方法或者传统的理论方法都难以研究如此复杂的反应。近年来，反应分子动力学模拟在燃烧领域展现了独特的价值。笔者2017年9月加入课题组后，也开始了对燃烧动力学模拟的研究。第一个学期，笔者尝试改进ReaxFF MD中电荷的计算，旋告失败，但是带着燃烧模拟的相关经验，2018年3月至4月，笔者{% post_link paper1 开发了轨迹分析软件ReacNetGenerator %}。5月初，开发告一段落，笔者决定进入下一个课题。

笔者刚开始接触计算化学时，便已从文献中获悉，机器学习（ML）已经广泛应用于计算化学领域的研究中，其中最火热的研究便是神经网络势能面 (NN PES)。与传统力场相比，NN PES更加精确；与从头算（ab initio）相比，NN PES快得多。笔者当时的导师朱通老师抛出问题，能不能把NN PES运用到燃烧反应的模拟中？

那时，笔者对NN PES的原理一无所知，几乎从零开始。笔者入门NN PES的文章是Markus Meuwly的J. Chem. Phys. 148, 241708 (2018)。这篇文章让笔者深入了解了environment descriptor的基本原理，以及NN PES的构建和训练过程；但这篇文章的缺点在于，没有给出源代码。笔者的几次重复文章的尝试，以失败告终。同样的，ANI只给了模型，也没有给出训练的代码。6月下旬，笔者偶然间发现引用J. Chem. Phys. 148, 241708 (2018)的文章里有一篇类似的工作，J. Chem. Theory Comput. 14, 7, 3933–3942 (2018)，竟然给了可以直接用的源代码。笔者尝试训练了QM9数据集，取得了不错的效果。

![Fig 1](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-020-19497-z/MediaObjects/41467_2020_19497_Fig6_HTML.png)

**图1** NN PES的结构（论文Fig. 6，CC BY-4.0）

但是，QM9是由GDB数据库的SMILES产生的，因而只包含稳定分子的稳定构象；但是燃烧过程中会产生大量的不稳定构象和自由基，QM9这类数据集显然是不够的。我们需要自己产生适用于燃烧的数据集。时至7月，笔者和朱通老师在数次讨论后，我们决定，从ReaxFF MD的轨迹中取团簇（cluster），根据化学键的类型初步分类，然后计算它们的库伦矩阵，进行聚类，获得一部分结构，进行DFT计算后即可得到数据集。

打通数据集和训练后，笔者开始着手进行分子动力学模拟，尝试把模型接入LAMMPS。10月，笔者跑出了第一条轨迹，并且成功分析了这条轨迹。不过，这条轨迹是否准确，以及MD的效率过低的两朵乌云仍然笼罩着笔者。

## 二、DP⊗燃烧

![Fig 2](https://api.njzjz.win/1zXvMLoHiSUPHojC2kkx-dM2oKrMVozZ8)

**图2** 2018年6月7日，笔者第一次听取王涵老师关于DeePMD的报告

2018年6月7日晚，笔者参加中山大学药学院承办的WCCB会议时，首次听取了王涵老师关于DP的报告。听完后，笔者怀着激动的心情，将图2发给了朱通老师。然而，笔者打开对应GitHub项目时，看到给的例子中，数据集来自一段完整的ab-initio water MD trajectory。这一例子着实误导了我，让我误以为DP不支持训练不同原子数的结构。用DP的想法就这样被放弃了。

2018年暑假，笔者参加北京大学物理学院举办的summer school时，再次和DP团队接触。这一次，笔者在DP团队提供的机器上成功训练了水的例子。Workshop结束后，笔者询问他们，DP是否支持训练不同原子数的结构？幸运的是，DP真的支持训练不同原子数的结构，笔者获知了多system的配置方法；不幸的是，在几天的安装和尝试后，笔者发现dp_train总是抛出Segmentation fault(core dumped)的错误，且调试数次均无法解决这一问题。使用DP的想法再次搁浅。

![Fig 3](https://api.njzjz.win/1W2taWF0ibl-EnavudDSIIS1Wcze1ftBZ)

**图3** 2018年8月5日，笔者在北京大学物理学院听取张林峰的报告

时至2018年12月底，当时笔者错误地认为申请的学校没有希望了，便将全部精力投入到了科研中。这时，朱通老师和王涵老师和张林峰取得了联系。笔者把数据集发给了林峰，在他的帮助下，我们使用的模型改成了DeepPot-SE，训练终于成功了。笔者用deepmd-kit重新训练了一遍，并尝试用LAMMPS跑分子动力学模拟。笔者惊喜地发现，deepmd-kit的效率远超其它所有软件！

与此同时，笔者发现了这些问题：

一、安装过程及其痛苦，新手第一次安装可能需要半个星期的时间。笔者于2019年9月尝试{% post_link conda-build-deepmd-kit 用conda构建deepmd-kit %}，便是出于这样的动机。

二、训练过程有莫名其妙的性能损失，可降速一半。笔者因此浪费了大量时间，于2019年7月终于发现，这是因为使用了intel mkl编译的numpy，这时需要设置环境变量来避免这个问题。

三、用LAMMPS进行MD模拟时，原子完全不动。这个问题可严重了。两天后，笔者发现，这是由于LAMMPS的DEEPMD模块只支持metal单位制，没有进行单位转换。

四、如何评估轨迹的质量？这确实是个问题。王涵老师来华东师范大学访问时，告诉我们可以借助atomic model deviation的力量进行判断。这一想法需要修改LAMMPS来完成。

于是，笔者汲取了active learning的方法，基于atomic model deviation进行了数轮迭代。7月，笔者本科毕业数天后，跑完了最后一轮轨迹。

![Fig 4](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-020-19497-z/MediaObjects/41467_2020_19497_Fig1_HTML.png)

**图4** 甲烷燃烧的1ns动力学模拟（论文Fig. 1，CC BY-4.0）

{% youtubefallback message begin %}
视频加载中……
{% youtubefallback message end %}
{% youtubefallback youtube begin %}
{% youtube diWEMGDKx9g %}
{% youtubefallback youtube end %}
{% youtubefallback fallback begin %}
{% iframe https://player.bilibili.com/player.html?aid=840614318&bvid=BV1454y1X7et&cid=185897499&page=1 %}
{% youtubefallback fallback end %}

## 三、论文发表

为了{% post_link apply 申请学校 %}，笔者早在2018年11月便写了论文的草稿，这一草稿也吸引了笔者现任导师的注意力。之后，笔者将其翻译为中文，作为笔者本科毕业论文的一部分。这一毕业论文被推选为校优秀毕业论文，并于2019年6月14日获第二十五届上海市大学生化学化工优秀论文交流会一等奖。

2019年11月，这篇论文的preprint被上传到arXiv上。2020年2月，我们开始投稿，从Science开始投起，在接连被四个期刊拒稿后，3月10日，又向Nature Communications投出，一天后竟然给分配了审稿人！

3月12日，笔者现在的学校宣布work from home，笔者焦急地在家里等待回音。文章分别于5月5日、7月17日被要求2次大修后（审稿意见可以在文章的SI下载），9月16日，文章终于原则接受！略微修改后，10月6日，文章正式接受。今日，终于正式发表。

## 四、总结和展望

这一篇文章将基于深度学习的反应分子动力学模拟首次应用于复杂反应系统的模拟中，具有较强的创新性。但是，这篇文章中的方法仍然是不完善的，例如，最后得到的数据集多达60万结构。笔者的下一篇文章对这一方法进行了改进，这就是另外一个故事了。

笔者进入Rutgers University后，将这一方法迁移到了生物化学反应中，这又是另外一个故事了。

{% publications %}
Zeng_NatCommun_2020_v11_p5713
{% endpublications %}

