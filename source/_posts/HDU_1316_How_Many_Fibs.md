---
title: HDU 1316 How Many Fibs?
date: 2013-11-24 20:42:41
categories: [Algorithm, ACM,大数]
tags: [ACM,C++,HDU,大数]
---

题目链接：[HDU 1316 How Many Fibs?](http://acm.hdu.edu.cn/showproblem.php?pid=1316)

好吧，这道题目，让我WA了3次，实在是想哭，最后又重看了一遍题目，发现 f[1] = 1   f[2] = 2  ，  惯性思维害死人  

思路也没什么特别的  大数相加，然后大数的比较  

值得一提的还是审题啊  
<!-- more -->
```C++
#include<iostream>
#include<stdio.h>
#include<string>
using namespace std;

struct ds{
  int num[105] ;
  int len ;
  void init( char s[105] = "0" ){
    memset( num , 0 , sizeof(num) );
    len = 0 ;
    int l = strlen(s) ;
    for( ; len < l ; ++len ){
      num[len] = s[l-1-len] - '0' ;
    }
    return ;
  }
  void plus( const ds& a , const ds& b ){
    this->init();
    int maxlen = a.len>b.len?a.len:b.len;
    for( len = 0 ; len < maxlen ; ++len )
      num[len] = a.num[len] + b.num[len] ;
    for( len = 0 ; len < maxlen ; ++len ){
      num[len+1] += num[len]/10 ;
      num[len] %= 10 ;
    }
    if( num[len] )
      ++len ;
    return ;
  }
  bool is_less_than_or_equal_to( const ds& a ){
    if( len != a.len )
      return len<a.len ;
    for( int i = len - 1 ; i >= 0 ; --i ){
      if( num[i] != a.num[i] )
        return num[i]<a.num[i] ;
    }
    return true;
  }
}fb[500];

int main(){
  fb[1].init("1");
  fb[2].init("2");
  int i , ans ;
  for( i = 3 ; i < 500 ; ++i )
    fb[i].plus(fb[i-1],fb[i-2]);
  char a[105] , b[105] ;
  ds aa , bb ;
  while( scanf( "%s%s" , a , b ) ){
    if( strcmp(a,"0") == 0 && strcmp(b,"0") == 0 )
      break;
    aa.init(a);
    bb.init(b);
    ans = 0;
    for( i = 0 ; i < 500 ; ++i )
      if( aa.is_less_than_or_equal_to(fb[i]) && fb[i].is_less_than_or_equal_to(bb) )
        ++ans;
    printf( "%d\n" , ans );
  }
  return 0;
}
```
