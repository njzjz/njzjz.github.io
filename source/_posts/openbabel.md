---
lang: zh-CN
title: Open Babel 基本用法
url: 94.html
id: 94
categories:
  - Chemistry
date: 2018-07-26 00:36:01
tags:
---

{% source zhihu 40577681 2018 7 25 %}
{% source wechat XJ6-PgF6ZoE33NHwBup6xw 2018 7 26 %}

### 1.安装

可用Anaconda安装`conda install openbabel -c conda-forge`或参照 [此文](https://njzjz.win/2018/05/28/installopenbabel/) 自己编译。
<!--more-->

### 2.转换格式

把xyz格式文件转换成pdb格式文件：  
```sh
obabel C.xyz -ixyz -opdb -O C.pdb
```  
支持**118种**格式，如xyz、mol、mol2、pdb、smi，Gaussian文件gjf、log、fchk，ChemDraw文件cdx等。  
可以从没有成键信息的xyz文件转换为有成键信息的mol文件。

### 3.转换SMILES

生成甲烷的mol文件：  
```sh
obabel -:C --gen3d -omol -O C.mol
```  
若要得到坐标，`--gen3d`不可少。  
SMILES会默认补氢至饱和，将C补成甲烷，若要得到单个碳的mol文件：  
```sh
obabel -:[C] --gen3d -omol -O C.mol
```  
若要生成甲基的文件：  
```sh
obabel -:[CH3] --gen3d -omol -O CH3.mol
```  
或：  
```sh
obabel -:"[C]([H])([H])[H]" --gen3d -omol -O CH3.mol
```
若SMILES有括号时，务必要加上引号。  
获取C.xyz、C.pdb等多个文件的SMILES：  
```sh
obabel C.mol C.mol2 C.pdb C.xyz --osmi -O C.smi
```

### 4.生成结构式的图像

![cys](https://bb.njzjz.win/file/jinzhe/img/1ToLMDA18j4wk7OPkefkKmqaRQFv8K9jb)

![phosphate](https://bb.njzjz.win/file/jinzhe/img/10ReRtWZiPoXWskGDSFnhwaxAnLzDUl-D)

```sh
obabel -:"C([C@@H](C(=O)O)N)S" -opng -O cys.png
```  
即可生成半胱氨酸的结构式：  
  
亦可生成矢量图像：  
```sh
obabel -:"C([C@@H](C(=O)O)N)S" -osvg -O cys.svg
```
可以将文件直接转换为图像：  
```
obabel phosphate.log -ilog -opng -O phosphate.png
```

### 5.配合Gaussian使用

从SMILES直接生成Gaussian输入文件：  
```sh
obabel -:CC --gen3d -ogjf|sed "1c %nproc=28\n#opt b3lyp/6-31g(d,p)" >CC.gjf
```
从已有文件或上一步的log文件中得到下一步的输入文件：  
```sh
obabel CC.log -ilog -ogjf|sed "1c %nproc=28\n#freq b3lyp/6-31g(d,p)" >CC2.gjf
```
