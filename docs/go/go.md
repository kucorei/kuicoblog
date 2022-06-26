---
title: go
date: 2022-04-05 20:16:42
permalink: /pages/91710d/
categories:
  - 其他笔记
tags:
  - go
---
## go

### 基础

#### 类型

##### 整数

整型分为以下两个大类。

● 按长度分为：int8、int16、int32、int64

● 还有对应的无符号整型：uint8、uint16、uint32、uint64。

其中，uint8就是我们熟知的byte型，int16对应C语言中的short型，int64对应C语言中的long型。

### rpc

使用rpc需要安装protubuf

```
go get -u github.com/golang/protobuf/protoc-gen-go 怎么启动http服务和rpc服务
```

```
go get -u github.com/golang/protobuf/proto // golang protobuf 库
```

安装 gRPC-go

```
go get google.golang.org/grpc
```

#### 管道

Channnel是Go的一个核心类型，可以看成一个管道,通过它并发核心单元就可以发送或者接收数据进行通讯

操作符是 <-

```go
ch <- v // 发送值v到Channel ch中
v := <-ch // 从Channel ch中接收数据，并将数据赋值给v
```

和map 、slice数据类型一样，channel需求先创建在使用

```go
ch := make(chan int)
```

##### channel类型

定义格式如下

```go
ChannelType = ("chab"|"chan" "<-"|"<-" "chan") ElementType .
```

三种类型定义

```go
chan T //可以接受和发送类型为T的数据
chan<- float64 //只可以用来发送float64类型的数据
<-chan int // 只可以用来接受Int类型的数据
```

<-总是和最左边的类型结合

##### receive操作符

<-用来从channel ch中接受数据，这个表达式会一直被block，知道有数据可以被接收，

从一个nil channel中接收数据会一直被block

使用一个额外的返回参数来检查channel是否关闭

```
x,ok := <-ch
c,ok = <-ch
var x,ok = <-ch
```

如果ok是false表示X是接收产生的零值，这个channel被关闭了或者为空

##### blockKing

一直阻塞

```go
import "fmt"
func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}
func main() {
	s := []int{7, 2, 8, -9, 4, 0}
	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c 一直等待计算结果
	fmt.Println(x, y, x+y)
}
```



#### 并发

##### sync
