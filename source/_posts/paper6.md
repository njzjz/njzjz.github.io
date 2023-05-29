---
lang: zh-CN
title: 我的第六篇论文
categories:
  - Chemistry
date: 2023-05-30T01:30:00-0400
tags:
  - papers
---
{% source wechat aiwoE-jgeqsUpxQ6nyhQPg 2023 4 10 %}

![封面](https://s2.loli.net/2023/05/30/WTF6IN3Qq9C7nSL.png)

上回说到，去年夏天，导师收到了JCP Special Topic: Modern Semiempirical Electronic Structure Methods的邀稿，但是迟迟没决定写什么。到了10月下旬，JCP把deadline延长到了11月30日，这时他的想法是，写一篇Perspective来总结过去的工作，并把我上一篇文章的一些数据拆了出来，放到这篇文章里。但是到了11月下旬，我把上一篇文章投出去以后，导师又决定，改成一篇benchmark的文章，在QDπ已经benchmark的一大堆机器学习和半经验方法数据的基础上，再benchmark两个方法的数据，最后再得出结论，半经验+机器学习联用的精度最好，QDπ的精度最好。

benchmark当然没啥难度。当然，最重要的是，上一个工作中写了dpdata的Driver接口，所有benchmark的脚本都是基于这个接口的。因此对于新方法，只需要花点时间写一个class，剩下就属于毫无技术含量的低级重复性工作了。受到数据限制，所有benchmark的基准都是ωB97X/6-31G*，距离CCSD(T)有一定差距；不过相比之下，这些半经验方法的误差更大，因此并不影响这些半经验方法精度不高的结论。

一周后，新增的数据完工，便只差文字了。这时已经到了12月，我问导师，deadline是不是到了？他表示，向JCP申请了两周deadline延期。于是又一起努力了两周后，12月19日，这篇文章终于完工了。

1月底，两个审稿人的意见回来，审稿人A要求多benchmark新的NDDO方法，审稿人B要求多benchmark新的DFTB方法。于是，又花了一周时间多benchmark了三种半经验方法。3月，这篇文章便被接受了。

{% publications %}
Zeng_JChemPhys_2023_v158_p124110
{% endpublications %}

这是我第一篇纯benchmark的工作，也是第一篇邀稿论文，确实没什么难度，所以本文写的也不长。