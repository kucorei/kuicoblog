---
title: include
date: 2022-05-03 19:14:14
permalink: /pages/677786/
categories:
  - c
tags:
  - 
---
### 预处理文件

不同的平台下，库也不一样，头文件也不一样

通过预处理解决平台之间的差别

Windows 平台下的暂停函数的原型是 void Sleep(DWORD dwMilliseconds)（注意 S 是大写的），参数的单位是“毫秒”，位于 <windows.h> 头文件。

Liunx平台下暂停函数的原型的unsigned int sleep (unsigned int seconds)，参数的单位是“秒”，位于 <unistd.h> 头文件

```c
#include <stdio.h>

// 不同的平台下引入不同的头文件
#if _WIN32 //windows
#include <windows.h>
#elif __liunx__ // liunx
#include <unistd.h>
#endif

int main(){
    // 不同平台下调用不同的函数
    #if _WIN32
    Sleep(5000)
    #elif __liunx__
	sleep(5)
}
```

### include的用法有两种

```
#include <stdHeader.h>
#include "myHeader.h"
```

使用尖括号< >和双引号" "的区别在于头文件的搜索路径不同：

使用尖括号< >，编译器会到系统路径下查找头文件；

而使用双引号" "，编译器首先在当前目录下查找头文件，如果没有找到，再到系统路径下查找。

### include 用法的注意事项：

一个 #include 命令只能包含一个头文件，多个头文件需要多个 #include 命令

同一个头文件可以被多次引入，多次引入的效果和一次引入的效果相同，因为头文件在代码层面有防止重复引

文件包含允许嵌套，也就是说在一个被包含的文件中又可以包含另一个文件。

### 宏定义

```c
#dedfine 宏名 字符串
```

程序中反复使用的表达式就可以使用宏定义

```c
#include <stdio.h>
#define M(n*n+3*n)

int main(){
    int sum,n;
    printf("input");
    scanf("%d",$n);
    sum = 3*M+4*M+5*M
}
```

带参数的宏

```c
#include <stdio.h>
#define SQ(y) (y)*(y)
```

#### 带参数的宏和函数的区别

带参数的宏和函数很相似，但有本质上的区别：宏展开仅仅是字符串的替换，不会对表达式进行计算；宏在编译之

前就被处理掉了，它没有机会参与编译，也不会占用内存。而函数是一段可以重复使用的代码，会被编译，会给它

分配内存，每次调用函数，就是执行这块内存中的代码



