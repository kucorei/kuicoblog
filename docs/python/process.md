---
title: process
date: 2022-04-28 23:49:18
permalink: /pages/b06ad4/
categories:
  - python
tags:
  - 
---
通过pipe管道，实现进程数据通信

```python
#!/usr/bin/python3
import os,sys

print("孩子将把文本写入管道")
print("父母会读到孩子写的文字...")

r,w = os.pipe()
processid = os.fork()
#父进程
if processid:

    # 关闭文件描述符
    os.close(w)
    r = os.fdopen(r)
    print("父读")
    str = r.read()
    print("text = ",str)
    sys.exit(0)
else:
    os.close(r)
    w = os.fdopen(w,"w")
    print("子写入")
    w.write("孩子写的文字.")
    w.close()
    print("孩子关闭")
    sys.exit(0)
```

