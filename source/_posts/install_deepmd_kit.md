---
lang: zh-CN
title: Linux软件安装⑦|DeePMD-kit v1.0
categories:
  - Chemistry
date: 2019-10-09
tags:
- Linux软件安装
---

2019 年 10 月 9 日微信公众号发

假定已经安装了 Anaconda（建议使用最新版 2019.07），已连接互联网，则

1.安装 tensorflow（如仅需 CPU 版本的 TensorFlow，则将 tensorflow-gpu 改为
tensorflow）：

```bash
python -m pip install tensorflow
```

> Successfully installed google-pasta-0.1.7 keras-applications-1.0.8
> opt-einsum-3.1.0 tensorboard-2.0.0 tensorflow-estimator-2.0.0
> tensorflow-gpu-2.0.0

2.安装 deepmd-kit v1.0：

```bash
python -m pip install git+https://github.com/deepmodeling/deepmd-kit
```

> Building wheels for collected packages: deepmd-kit
>
> Building wheel for deepmd-kit (PEP 517) ... done
>
> Created wheel for deepmd-kit:
> filename=deepmd_kit-1.0.0-cp37-cp37m-linux_x86_64.whl size=268836
> sha256=1f5b1149bbf35c0c96c713cc8b607e0626ad0df6451a7
>
> 171d4f6b46acc2d4290
>
> Stored in directory:
> /tmp/pip-ephem-wheel-cache-zlksq4dl/wheels/a2/80/6c/a26fba79e43199eb4cdba7a3686c5370d3620916f5a0ea23ac
>
> Successfully built deepmd-kit
>
> Installing collected packages: deepmd-kit
>
> Successfully built deepmd-kit
>
> Installing collected packages: deepmd-kit
>
> Successfully installed deepmd-kit-1.0.0

大功告成！现在看一看是否成功安装：

```bash
dp -h
```

> usage: dp [-h] {train,freeze,test} ...
>
> DeePMD-kit: A deep learning package for many-body potential energy
>
> representation and molecular dynamics
>
> optional arguments:
>
> -h, --help show this help message and exit
>
> Valid subcommands:
>
> {train,freeze,test}
>
> train train a model
>
> freeze freeze the model
>
> test test the model

现在，DeePMD-kit v1.0.0 已成功安装。下一期将介绍如何用 DP 编译 LAMMPS。
