---
title: Open Babel 基本用法
url: 94.html
id: 94
categories:
  - Chemistry
date: 2018-07-26 00:36:01
tags:
---

2018/07/26

### 1.安装

可用Anaconda安装`conda install openbabel -c openbabel`或参照 [此文](https://wp.njzjz.win/?p=76) 自己编译。

### 2.转换格式

把xyz格式文件转换成pdb格式文件：  
`obabel C.xyz -ixyz -opdb -O C.pdb`  
支持**118种**格式，如xyz、mol、mol2、pdb、smi，Gaussian文件gjf、log、fchk，ChemDraw文件cdx等。  
可以从没有成键信息的xyz文件转换为有成键信息的mol文件。

### 3.转换SMILES

生成甲烷的mol文件：  
`obabel -:C --gen3d -omol -O C.mol`  
若要得到坐标，`--gen3d`不可少。  
SMILES会默认补氢至饱和，将C补成甲烷，若要得到单个碳的mol文件：  
`obabel -:[C] --gen3d -omol -O C.mol`  
若要生成甲基的文件：  
`obabel -:[CH3] --gen3d -omol -O CH3.mol`  
或：  
`obabel -:"[C]([H])([H])[H]" --gen3d -omol -O CH3.mol`  
若SMILES有括号时，务必要加上引号。  
获取C.xyz、C.pdb等多个文件的SMILES：  
`obabel C.mol C.mol2 C.pdb C.xyz --osmi -O C.smi`

### 4.生成结构式的图像

![cys](https://user-images.githubusercontent.com/9496702/43214544-2633e94e-906c-11e8-8623-372674fa80b1.png)

![phosphate](https://user-images.githubusercontent.com/9496702/43214869-2c9da01c-906d-11e8-8350-6877cbd69214.png)

`obabel -:"C([C@@H](C(=O)O)N)S" -opng -O cys.png`  
即可生成半胱氨酸的结构式：  
  
亦可生成矢量图像：  
`obabel -:"C([C@@H](C(=O)O)N)S" -osvg -O cys.svg`  
可以将文件直接转换为图像：  
`obabel phosphate.log -ilog -opng -O phosphate.png`  

### 5.配合Gaussian使用

从SMILES直接生成Gaussian输入文件：  
`obabel -:CC --gen3d -ogjf|sed "1c %nproc=28\n#opt b3lyp/6-31g(d,p)" >CC.gjf`  
从已有文件或上一步的log文件中得到下一步的输入文件：  
`obabel CC.log -ilog -ogjf|sed "1c %nproc=28\n#freq b3lyp/6-31g(d,p)" >CC2.gjf`