---
lang: zh-CN
title: 退乎前备份知乎回答：zhihubackup
categories:
  - Life
date: 2021-01-13
---
{% source zhihu 343332696 2021 1 10 %}

每个知乎答主都有退乎的梦想，但退乎前如果删光回答，则十分可惜。因此，我用Python写了60行的脚本，可以在退乎前备份自己的所有回答和文章，以免事后后悔。

[GitHub - njzjz/zhihubackup](https://github.com/njzjz/zhihubackup)

## 安装

```sh
pip install git+https://github.com/njzjz/zhihubackup
```

## 使用

假如你是@贱贱，你的id是`splitter`，那么可以编写Python脚本：

```python
from zhihubackup import backup_zhihu
backup_zhihu("splitter")
```

静等一段时间。运行结束后，可以看到产生了名为`splitter`的文件夹：
```
- splitter
|- answer   (842 files)
|- article  (101 files)
|- pin      (3214 files)
|- question (57 files)

```
备份已经成功，现在可以删光回答和文章了。

