---
title: 浏览器的缓存机制
date: 2022-04-05 20:16:42
permalink: /pages/cd687f/
categories:
  - 其他笔记
tags:
  - 
---
### 浏览器的缓存机制

查看个人资料

```http
chrome://version
```



- 减少ruo余的数据传输

- 提高接口响应效率

- 降低对服务器的要求

- 减少网络时延

#### 文件过期

设置cache-control和Expires首部，

cache-contorl 支持1.1

##### Cache-contorl

###### public

可以被任意对象缓存

###### private

只能被单个用户缓存，不能作为共享缓存，代理服务器不能缓存

###### no-cache

表示在缓存提供给客户端之前，强制要求缓存把请求给原始服务器进去验证-----协商缓存

###### no-store

不使用任何缓存

###### max-stale

表示客户端愿意接受一个已经过期的资源



Expires 支持1.0以上

http让服务器为每个稳定都附上一个过期时间

### 性能分析

#### FPS

红色和绿色

绿色越高表示越流畅

#### CPU

html为蓝色

脚本为黄色

样式表为紫色

媒体文件为绿色

其他资源为灰色

帧的简要信息

304.5表示该帧的传输时间，3fps(1000/304.5==3.28)表示当前的Fps

#### summary

记录帧数之间的摘要信息

Scripting 脚本

Rendering - 渲染

Painting 重绘

#### Task

每个Task就是一帧做的事情