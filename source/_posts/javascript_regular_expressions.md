---
title: javascript正则表达式 —— 速查
date: 2016-11-10 13:31:23
categories: [WEB,JS]
tags: [JS]
---

> 写好正则表达式，有时能高效提高代码效率。

## JavaScript创建正则表达式  

字面量赋值：  
```javascript
var reg = /pattern/attributes;
```
实例化`RegExp`对象：  
```javascript
var reg = new RegExp(pattern, attributes);
```

## Pattern  

## Attributes  

| 修饰符 | 描述
| :--- | :---
| g   | 全局搜索。
| i   | 不区分大小写搜索。
| m   | 多行搜索。
| y   | 执行“粘性”搜索,匹配从目标字符串的当前位置开始，可以使用y标志。  
