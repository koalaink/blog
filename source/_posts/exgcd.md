---
title: 扩展欧几里得算法及实现
date: 2014-12-02 12:07:22
categories: [Algorithm, ACM,数论]
tags: [ACM,C++,数论]
---

欧几里得算法，即辗转相除法，用于求整数a,b的最大公约数。  

欧几里得算法C++实现代码：（无需确定 a,b 大小关系）  

```C++
long long gcd(long long a,long long b){
    return b?gcd(b,a%b):a;
}
```

扩展欧几里得算法：设a和b不全为0，则存在整数x和y，使得 gcd(a,b) = xa + yb  
证明： 假设 a>b  

当 b==0 时：gcd(a,b) = a , 此时 x=1 , y=0  
<!-- more -->
当 ab!=0时：  

设： x1a + y1b = gcd(a,b)  

x2b + y2(a%b) = gcd(b,a%b)  

因为 gcd(a,b) == gcd(b,a%b)  

所以 x1a + y1b = x2b + y2(a%b) = x2b + y2(a-a/b*b) =y2a  + x2b - y2(a/b)\*b  

因此 x1 = y2 , y1 = x2-(a/b)y2  

这样就能够基于 x2, y2 求出 x1 , y1 的解。  


扩展欧几里得C++实现代码 01：  

```C++
long long Exgcd(long long a,long long b,long long& x,long long& y){
    if(b==0){
        x=1;
        y=0;
        return a;
    }
    long long d=exgcd(b,a%b,x,y);
    long long tmp=x;
    x=y;
    y=tmp-a/b*y;
    return d;
}
```
扩展欧几里得C++实现代码 02：  

```C++
#define ll long long
void Exgcd(ll a,ll b,ll& d,ll& x,ll& y){
    if(!b){ d=a;x=1;y=0;return ;}
    Exgcd(b,a%b,d,y,x);
    y -= a/b*x ;
    return ;
}
```
