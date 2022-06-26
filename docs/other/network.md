---
title: 网络
date: 2022-04-05 20:16:42
permalink: /pages/baf81f/
categories:
  - 其他笔记
tags:
  - 
---
## tcp

### 通信的大概原理

首先客户端先计算出一个序号，然后将序号和数据一起发送给服务器，服务器收到后会计算ack号并返回给客户端，相反的，服务器也需要先计算出另一个序号，然后将序号和数据一起发送给客户端，客户端收到之后计算ack并返回给服务器



### 数据双向传输的情况

- 客户端 -> 序号初始值 ->服务端
- 服务段 -> 序号的初始值 -> 客户端
- 客户端 -> 序号 -> 服务器
- 服务器 -> ACK号 -> 客户端
- 服务器 -> 序号 -> 客户端
- 客户端 -> 序号 -> 服务端

### 序号和ACK号的交互

#### 连接操作

1. 客户端 序号初始值 服务端
2. 服务器 ACK号 序号初始值 客户端
3. 客户端 ACK号 服务端

#### 收发操作

1. 客户端 序号+数据 服务端
2. 服务端 ACK号 客户端
3. 客户端 序号+数据 服务端
4. 服务端 ACK号 客户端

**机制**：在得到确认前，发送过的包，都保存在发送缓冲区中，如果对方没有返回某些包对应的ACK号，那么就重新发送这些包，TCP会在尝试几次重传无效之后强制结束通信，并向以应用程序报错

**小结**：序号和ACK号可以确认接受方是否收到网络包，以及通信是否正常

**设备：**网卡、集线器、路由器都没有错误补偿基质，一旦检测到错误就直接丢弃相应的包，

#### ACK等待时间

tcp的网络包，会根据ping'j往返时间调整ACK等待时间（超时时间）

##### tcp采用动态调整等待时间的方法

这个等待时间就是根据ACK号返回所需的时间来判断的，

具体来说，TCP会在发送数据的过程中持续策略ACK号的返回时间，如果慢就延长等待时间，相反的，则缩短等待时间

#### ACK号的管理

tck使用窗口有效管理ACK号

当接收房收到包后，会先将数据存放到缓冲区中，然后，接收方需要计算ACK号，将数据块组装起来，还原成原本的数据，并传递给应用程序，

**如果数据到达的速率比处理这些数据并传递给应用程序的速率还要块，那么接收缓冲区中的数据就会越堆越多，最后溢出，缓冲区溢出后，后面的数据就进不来了**

##### 滑动窗口的基本思路

接收方需要告诉发送方自己最多能接收多少数据，然后发送方根据这个值对数据发送操作进行控制

##### 更新滑动窗口大小的时机

当接受方将数据传递给应用程序，导致接收缓冲区剩余内容增加时，就需要告知发送方



### 交换机的包转发操作

#### 交换机根据地址表进行转发

信号到达网线接口，由PHY(MAU)模板进行接收，这一部分和集线器是相同的，也就是说他的接口和PHY（MUA）模块也是MDI-X模板进行连接的，

PHY（MAU）模块会将网线中的信号转换为通用格式，然后传递给MAC模块，MAC模板讲信号转为数字信息，然后通过包尾部的FCS校验错误信息，没有问题就放入缓存区

交换机和网卡的不同

1. 交换机的端口不具有MAC地址
2. 交换机的端口不核对接收方的MAC地址
3. 交换机的MAC模板不具有MAC地址



#### mac地址表的维护

1. 添加记录，收到包更新
2. 删除记录，添加时间，一段时间没有收到某个端口的包，就删除

##### 收到包的时候

将发送方的MAC以及输入端口的号码写入MAC地址表中，由于收到包的那个端口连接发送包的这个设备，所以只要将这个包的发送方MAC地址写入地址表

##### 删除包的时候

交换机自行更新或者删除地址表中的记录，不需要手动维护，

具备管理功能的高级交换机提供手动维护地址表的功能，但是一般的低级机型没有这个功能

##### 特殊操作

**目标端口和这个包的源端口是同一个端口**

A计算机的包到达集线器后会被集线器转发到所有端口上，也就是会到达交换机和计算机B，交换机转发会原路返回，所有计算机B会收到2个相同的包，会导致无法通信，

交换机的处理：发现一个包要发到 原端口，就直接删除





#### 交换机的特点

全双工模式是交换机特有的工作模式

具备同时接收和发送的操作，集线器不具备这样的功能

#### 碰撞

使用集线器，多台计算机同时发送信号，信号i会在集线器内部混杂在一起，进而无法使用，这个现象称为碰撞，是以太网的一个重要特征，只要不用集线器就不会发生碰撞

使用双绞线的时候，发送和接收的信号线是各自独立的，因为不会发生碰撞，交换机端口和网卡的PHY（MUA）模块以及MAC模板都是各种独立的

#### 没有数据的情况

在以太网中，没有数据在传输时，网络会填充一种被称为连接脉冲的脉冲信号，使得网络一直有信号，从而能够检测对方是否在正常工作，

网络设备的网线接口周围有个绿色的LED指示灯，表示是否检测正常的脉冲信号，绿色表示PHY（MAU）模块以及网线连接正常

MAC模板、缓冲区、内存和总线部分不能通过这个来判断

总结：从设备的转发能力来看，交换机要高于集线器

### 路由器的包转发操作

#### 路由器基础

网络包经过集线器和交换机后，到达了路由器，并在此转转发到了下一个路由器，这一步原理和交换机类似



**路由器和交换机的区别**

- 路由器是基于IP设计的

- 交换机是基于以太网设计的

**模块负责的内容**

- 转发模板赋值包的转发目的地
- 端口模块赋值包的收发工作

路由器的端口具有MAC地址，因此可以成为以太网的发送方和接收方，但是端口并不会成为IP的发送方和接收方，端口还具有IP地址，意义上和计算机的网卡是一样的，

**路由器和交换机不同的工作过程**

交换机是同通过MAC头部中的接收方MAC地址来判断转发目标的

路由器则是根据IP头部中的IP地址来判断，由于使用的地址不同，记录转发的目标的表的内容也不一样



路由器根据IP判断转发目标