---
title: 编译TensorFlow 2.5踩坑总结
date: 2021-08-11
categories:
- Chemistry
tags:
- TensorFlow
---
两周前，经过一周的努力，我终于成功编译了TensorFlow 2.5。在TF 2.5中，我亲自参与的[#43951](https://github.com/tensorflow/tensorflow/pull/43951)得到了修复。但众所周知，TensorFlow每个新版本都会更新一些bug，TF2.5更新了6个新bug！<!--more-->

* [#41926](https://github.com/tensorflow/tensorflow/issues/41926)：这是TF2.3就提出的issue，但是以无法复现为由直接close了。于是到了TF2.5，这个bug仍然存在。#41926被close后，有人在里面给出了patch，但是需要注意的是TF2.5将`com_google_absl_fix_mac_and_nvcc_build.patch`移动到了`tensorflow/third_party/absl`。
* [#48652](https://github.com/tensorflow/tensorflow/issues/48652)：用CUDA 11.3编译时遇到的低级bug。可能过于低级，所以直接被[@c8e4f2a](https://github.com/tensorflow/tensorflow/commit/c8e4f2aa633c4f9b803fdeb5d8463f002387a2bf)解决掉了。TF 2.6已经包含了这个补丁。
* [#48393](https://github.com/tensorflow/tensorflow/pull/48393)：用CUDA 10编译时可能遇到的低级bug。奇怪的是，这个PR过了几个月都没有人处理。
* [#48588](https://github.com/tensorflow/tensorflow/pull/48588)：CUDA 10编译时的bug。已merge，已进入2.6分支。
* [#50929](https://github.com/tensorflow/tensorflow/pull/50929)：我在编译过程中遇到的bug，虽然也有人遇到了，但是竟然一直没有人提出解决方案……正当我想放弃之际，突然灵光一现，可以从git的历史记录里面，看看这个bug是怎么产生的，或者revert掉！最后发现了解决方案，于是提了这个PR。
* [#50987](https://github.com/tensorflow/tensorflow/pull/50987)：同[#50929](https://github.com/tensorflow/tensorflow/pull/50929)。
* [#46630](https://github.com/tensorflow/tensorflow/issues/46630)：没人修，相关代码太复杂无法revert，于是放弃了。于是用`export TF_ENABLE_XLA=0`直接砍了XLA，反正我不用。

上述七个issues修复前六个，并砍掉最后一个后，TF 2.5终于成功编译！
