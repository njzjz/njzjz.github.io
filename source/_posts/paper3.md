---
lang: zh-CN
title: 我的第三篇论文
categories:
  - Chemistry
date: 2021-01-06
tags:
  - papers
---

{% source zhihu 341460147 2021 1 2 %}
{% source wechat PK6pn-u5egS0mwpdHYKbUw 2021 1 2 %}

![Cover](https://api.njzjz.win/1lViMMxGi1jTrbt3LQDRbNhbuPsfRNe2O)

2019年5月，林峰邀请我暑假到北大实习，我欣然答应。拿到学士学位证书后，我在家里休息了一周，顺便处理了升学的各项事宜。这些全部搞定后，6月下旬，我启程前往北京。<!--more-->

![2019年6月23日摄于北京大学东门](https://api.njzjz.win/1dXpd21QbwdstRsunQ7ckETyrVue3zX9k)

2019年6月23日摄于北京大学东门

北京大数据研究院（另一个牌子是北京大学大数据研究中心）坐落于静园六院，位于燕园的中心地带，距离未名湖不远。静园六院为二层三合院结构，外观古朴，而房间里有中央空调。我很快熟悉了周围的环境~~，以及周围的外卖~~。

![2019年6月30日摄于静园六院](https://api.njzjz.win/1bKmlbLceXOQYe9mCoCg3pF1uV5jn1UHX)

2019年6月30日摄于静园六院

在王涵老师的安排下，一开始的几天，我参与了一些DP-GEN软件的开发工作。DP-GEN是一个基于active learning的自动化框架，可以自动向集群提交任务，用于搜集数据。后来，[DP-GEN的四作文章](https://doi.org/10.1016/j.cpc.2020.107206)于2020年2月发表于Computer Physics Communications。

2019年7月4日，朱通老师来到北京。我们四个聚集在会议厅讨论，先交流了我{% post_link paper2 第二篇文章 %}的一些细节，接着提出了idea：能否把DP-GEN和燃烧反应结合起来，做一个全自动的流程来逐步探索反应，完全不需要人力操作？我们敲定首先用正十二烷裂解来作为例子，之后再拓展到其它体系。

虽然这个idea只有一句话，但实现起来却有好几步工作要做。主要难点在于，此前DP-GEN是为材料体系设计的，因而通过模拟较小的体系来采样；但高温下的反应体系需要从大规模的模拟中采样，而第一性原理计算又有限制。大体上，这个idea仍延续了{% post_link paper2 第二篇文章 %}的思路。次日，我列了一个开发提纲，计划逐渐实现目标。

![2019年7月5日列出的开发提纲](https://api.njzjz.win/1ShVu5lCgt-DxJXsRQB1D7FHCGknnPjFw)

2019年7月5日列出的开发提纲

7月下旬，所有代码均已开发完毕，这一课题进入“正十二烷阶段”。于是，7月底，我告别了DP团队，告别了北京。8月下旬，抵达Rutgers University后，我增加了邮件提醒功能，继续监视着DP-GEN的日志。起初进展缓慢，但到了11月，登辉的GPU加速MD的code问世了，MD速度提升了十倍！分析结果以后，我启用relative deviation又重跑了一遍，2020年1月便结束了战斗。

![整个流程](https://api.njzjz.win/14AF0aIoelq9qJN7Jke4k9GUW7NjOxtRj)

整个流程

拿着训练好的模型，我又进行了正十烷、正十四烷、正二十烷的模拟，并用{% post_link ReacNetGenerator 第一篇文章 %}分析，获得了不错的结果。长训的结果起先不如人意，测试了很久，排查出是sel不够所致。

9月，Darrin York让我申请NVIDIA Graduate Fellowship（最后并未申到），为了完善简历，我赶紧把这篇文章发到ChemRxiv上，并投了出去。最后ACS旗下的Energy & Fuels同意审稿。10月下旬，审稿意见返回，两个小修，一个大修。那时，刚好第二篇文章发表，于是~~我光顾着兴奋~~，11月下旬才把文章修回，一周后便顺利接受。

至此，基于深度学习模拟燃烧反应的方法开发算是告一段落了，基于这一方法，可以完成进一步的应用~~，发几篇大文章~~。

{% publications %}
Zeng_EnergyFuels_2021_v35_p762
{% endpublications %}
