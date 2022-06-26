---
title: python
date: 2022-04-05 20:16:42
permalink: /pages/64e7b3/
categories:
  - 其他笔记
tags:
  - 
---




### Linux环境安装python



### 虚拟环境

#### 安装虚拟环境

```
pip install virtualenv
```

#### 使用虚拟环境

```
venv \Scripts\python
```

#### 创建虚拟环境

```
mkvirtualenv project_dev
```

指定python版本

```
mkvirtualenv project_dev --python=python2.8
```

#### 虚拟环境上工作

```
workon project_dev
```

#### 停止虚拟环境

```
deactivate
```

#### 其他命令

```
lsvirtualenv    #列举所有的环境。

cdvirtualenv    #导航到当前激活的虚拟环境的目录中，比如说这样您就能够浏览它的 site-packages。

cdsitepackages   # 和上面的类似，但是是直接进入到 site-packages 目录中。

lssitepackages     #显示 site-packages 目录中的内容。
```



#### 查看版本

```
pip freeze
```

