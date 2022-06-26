---
title: mysql
date: 2022-04-05 20:16:42
permalink: /pages/526761/
categories:
  - 其他笔记
tags:
  - 
---
**创建/切换数据库**
use sheet

**查看数据库中的表**

SHOW TABLES

**查看表结构**

DESC tables

**将数据表的某个字段修改后另一个字段的后面**

`ALTER TABLE table MODIFY table_name VARCHAR(10) AFTER name`

**表字段名修改**

`ALTER TABLE user CHANGE usernames username VARCHAR(255);`

**修改字段类型**

`ALTER TABLE user CHANGE username VARCHAR(254);`

**删除字段**

`ALTER TABLE user DROP username`

**增加字段**

`ALTER TABLE user ADD description VARCHAR(255);`

**删除表**

`DROP TABLE table`

创建表并设置主键

`CREATE TABLE tb_name3
(
id  INT(11) PRIMARY KEY,
name VARCHAR(255),
deptid int(11),
salary FLOAT
);`

给数据库添加主键

`ALTER TABLE tb_name2 ADD PRIMARY KEY(id)`

创建数据表并设置外键

创建带外键的表

`CREATE TABLE tb_emp5
(
id INT(11) PRIMARY KEY,
name VARCHAR(255),
 deptid INT(11),
 salary FLOAT,
 CONSTRAINT tb_name4 FOREIGN KEY(deptid) REFERENCES tb_name4(id)
);`

**在修改表的时候，添加外键约束**

`ALTER TABLE tb_name5 ADD CONSTRAINT fk_tb_dept2 FROMEIGN KEY(depid) REFERENCES tb_name4(id)`

删除外键约束

`ALTER TABLE tb_name5 DROP FOREIGN KEY fk_tb_dept2` 外键约束名称，不是字段名

### Mysql错误1452 和1005问题

报错的原因大概分为三种：
原因一：

添加的外键列与另一个表的唯一索引列（一般是主键）的数据类型不同
原因二：
要添加外键的表类型与另一个表的存储引擎是不是都为innodb引擎
#查看表引擎
法一： show create table 表名;
法二：show table status from 数据库 where name=‘表名’;
法三：use information_schema;
select table_catalog,table_schema,table_name,engine from tables
where table_schema=‘数据库名’ and table_name=‘表名’;
原因三：
设置的外键与另一个表中的唯一索引列（一般是主键）中的值不匹配
#解决办法：删除要成为外键的列，再次创建并默认为NULL

### 唯一约束(Uinque,Constraint)

要求该列唯一，允许为空，但只能出现一个空值

`CREATE TABLE tb_dept2

(

id INT(11) PRIMARY KEY,

name VARCHAR(255) UNIQU,

location VARCHAR(55)

)`

**在修改表时添加唯一约束**

`ALTER TABLE <数据库名称> ADD CONSTRAINT <唯一约束名> UNIQUE(<列名>)`

`ALTER TABLE tb_dept1 ADD CONSTRAINT unique_name UNIQUE(name)`

删除唯一约束

`ALTER TABLE tb_derp1 DROP INDEX name`



在创建表的时候设置检查约束

`CREATE TABLE tb_emp7
(
id INT(11) PRIMARY KEY,
name VARCHAR(25),
deptid INT(11),
sa FLOAT,
CHECK(sa>0)
);`

修改表时添加检查约束

`ALTER TABLE tb_emp7  ADD CONSTRAINT check_id CHECK(id<0)`

删除检查约束

`ALTER TABLE tb_emp7 DROP CONSTRAINT check_id`

默认值约束

`CREATE TABLE tb_name33 (`

`id INT(11) PRIMARY KEY`

`name VARCHAR(255) DEFAULT '默认值'`

`)`

修改表时增加默认约束

`ALTER TABLE tb_name33  CHANGE COLUMN locaiton location VARCHAR(255) DEFAULT '默认值'`

删除默认值约束

`ALTER TABLE tb_name33 CHANGE COLUMN locaiton location VERCHAR(255) DEFAULT NULL`