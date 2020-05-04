---
lang: zh-CN
title: DeePMD-kit： conda安装 & 离线安装
categories:
  - Chemistry
date: 2019-10-24
tags:
---

2019 年 10 月 24 日（UTC-4）微信公众号

近日，我已经通过 conda-build[^1]构建了 deepmd-kit（含 lammps 模块）的 conda packges[^2]，并用 constructor[^3]打包了离线安装包。下介绍安装方法及注意事项：

## 一、conda 安装

安装 conda 后，使用以下命令安装 GPU 版：

````bash
conda install deepmd-kit=*=*gpu lammps-dp=*=*gpu -c deepmodeling
将gpu改为cpu即可安装CPU版：
```bash
conda install deepmd-kit=*=*cpu lammps-dp=*=*cpu -c deepmodeling
````

如需指定版本，需将两个等号中间的\*号改为版本号（目前有 1.0.1 和 0.12.8）：

```bash
conda install deepmd-kit=1.0.1=*cpu lammps-dp=1.0.1=*cpu -c deepmodeling
```

## 二、离线安装

至 https://github.com/njzjz/deepmd-kit-recipes/releases 下载 v1.0.1 离线安装包（也提供了百度网盘链接）：

![releases](https://img.njzjz.win/?url=drive.google.com/uc?id=1X2f2pWYGfkKttjBkmCqhYfSljhcttXFO)

下载后执行以下命令，按提示操作即可。

```bash
sh deepmd-kit-1.0.1-*pu-Linux-x86_64.sh
```

## 三、使用与注意事项

dp 和 lmp 分别为 deepmd-kit 主程序与 lammps：

```bash
dp -h
lmp -h
```

GPU 版本已经包含 CUDA 10.0，需要注意的是 CUDA 10.0 仅支持 NVIDIA 驱动 410.48 以上，详情可参见 NVIDIA 官网 https://docs.nvidia.com/deploy/cuda-compatibility/

运行 dp 命令时，应设置环境变量`KMP_BLOCKTIME=0`和`KMP_AFFINITY=granularity=fine,verbose,compact,1,0`，否则会导致高达50%的性能损失。这是由于 anaconda numpy 一个存在多年的 bug[^4]。

[^1]: conda-build https://github.com/conda/conda-build
[^2]: deepmd-kit-recipes https://github.com/njzjz/deepmd-kit-recipes
[^3]: constructor https://github.com/conda/constructor
[^4]: numpy/numpy#12374 https://github.com/numpy/numpy/issues/12374
