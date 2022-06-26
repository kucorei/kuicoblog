---
title: shell
date: 2022-04-05 20:16:42
permalink: /pages/a0bdb2/
categories:
  - 其他笔记
tags:
  - 
---
# shell功能代码

## 取文件名

只取文件名（不要扩展名)

```shell
＃显示目录下所有文件名 ［去掉扩展名］
for file in *; do
  echo ${file%.*}
done
```

## pb转js

pb文件转成js

```sh
pbtojs(){
  echo "开始搜索当前目录下的proto文件"
  for dirs in `dir`;
     do
       if [ "${dirs##*.}"x == "proto"x ]
       then
          echo "开始编译" $dirs
          pbjs -o ${dirs%.*}.d.ts $dirs
          echo $dirs "编译完成"
       fi
     done
}
run(){
   pbtojs
}
run
```

