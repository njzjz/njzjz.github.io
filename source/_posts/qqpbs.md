---
lang: zh-CN
title: 用QQ监控PBS任务
url: 97.html
id: 97
categories:
  - Chemistry
date: 2018-08-07 00:38:49
tags:
---

{% source zhihu 42524256 2018 8 20 %}
{% source wechat 7JCmLDUY9aCyciWOqqoyvQ 2018 8 7 %}

### 环境准备

#### 1.安装酷Q和HTTP API插件

酷Q：https://cqp.cc/  
CoolQ HTTP API 插件：https://github.com/richardchien/coolq-http-api  
将HTTP API插件放置于app文件夹中，启动并登陆酷Q，在菜单中启用插件。  
HTTP API插件的默认地址为http://localhost:5700/
<!--more-->

#### 2.安装`cqhttp`包

```bash
pip install cqhttp
```
安装后在Python中使用：

```python
from cqhttp import CQHttp
bot = CQHttp(api_root='http://219.228.63.56:5700/')
bot.send_group_msg(group_id=599070209,message='hello world')
```

![default](https://bb.njzjz.win/file/jinzhe/img/1M7D0SXpR8rpDOMPQs-KvtATEpPPGUhnA)

第二行定义了一个机器人，第三行让这个机器人发一条hello world的消息。  

### 开始编写程序

#### 1.获取任务状态

```python
import subprocess as sp
class CQJobMonitor():
    def jobstate(self):
        states=sp.check_output(self.command.split()).decode('utf-8').split("\n")
        states=[' '.join(line.split()) for line in states if any([keyword in line for keyword in self.keywords])]
        return states
```

这里`self.command`为获取任务状态的命令，如`qstat`，`self.keywords`为关键词，如`['jzzeng']`。如此即可返回含有关键词的任务状态。

#### 2.发送消息

```python
import time
from cqhttp import CQHttp
class CQJobMonitor():
    def sendstate(self):
        localtime = time.asctime(time.localtime(time.time()))
        message=localtime+"\n"+self.tip+"\n"
        message+="\n".join(self.jobstate())
        self.bot.send_group_msg(group_id=self.group_id,message=message)
```

调用定义好的CQHttp类发送消息，顺便带上当前时间。

#### 3.循环发送

设置每300秒发送一次：

```python
from threading import Timer
import os
class CQJobMonitor():
    def loopmonitor(self):
        while not os.path.exists("pause"):
            timer=Timer(self.timeinterval,self.sendstate)
            timer.start()
            timer.join()
        print("Exit per signal.")
```

这里`self.timeinterval`设置为300.

### 运行

**完整的程序如下：**

```python
import os
import subprocess as sp
from cqhttp import CQHttp
import time
from threading import Timer

class CQJobMonitor():
	def __init__(self,command="qstat",cqroot='http://219.228.63.56:5700/',group_id=312676525,keywords=['jzzeng'],timeinterval=300):
		self.tip="JobMonitor"
		print(self.tip)
		self.command=command
		self.group_id=group_id
		self.keywords=keywords
		self.bot = CQHttp(api_root=cqroot)
		self.timeinterval=timeinterval

	def jobstate(self):
		states=sp.check_output(self.command.split()).decode('utf-8').split("\n")
		states=[' '.join(line.split()) for line in states if any([keyword in line for keyword in self.keywords])]
		return states

	def sendstate(self):
		localtime = time.asctime(time.localtime(time.time()))
		message=localtime+"\n"+self.tip+"\n"
		message+="\n".join(self.jobstate())
		self.bot.send_group_msg(group_id=self.group_id,message=message)

	def loopmonitor(self):
		while not os.path.exists("pause"):
			timer=Timer(self.timeinterval,self.sendstate)
			timer.start()
			timer.join()
		print("Exit per signal.")
```

代码已上传至pypi，可用`pip install CQJobMonitor`安装。  
编写`monitor.py`：

```python
from CQJobMonitor import CQJobMonitor
CQJobMonitor(command="qstat",cqroot='http://219.228.63.56:5700/',group_id=312676525,keywords=['jzzeng'],timeinterval=300).loopmonitor()
```

并在后台运行：

```
nohup python monitor.py >/dev/null &
```

![image](https://bb.njzjz.win/file/jinzhe/img/12KxzikWXWoGD8pkKljRj-sUfACgH6UWZ)

  
即可定时发送任务情况。
