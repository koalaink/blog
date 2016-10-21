---
title: HDU 1715 大菲波数 大数
date: 2013-11-22 22:45:11
categories: [ACM,大数]
tags: [ACM,C++,HDU,大数]
---

题目链接：[HDU 1715 大菲波数 大数](http://acm.hdu.edu.cn/showproblem.php?pid=1715)  

第一题手敲大数，自己的写法，应该很不规范  

毕竟是自己写的，贴代码纪念一下  
<!-- more -->
```C++
#include<iostream>
#include<stdio.h>
using namespace std;

struct ds{
	int num[1001];
	int len;
	void inif(int a , int l){
		memset(num,0,sizeof(num));
		len = l;
		num[0] = a;
	}
	void plus(const ds& a , const ds& b){
		int j = 0 ;
		int tmp = 0;
		while( j < a.len && j < b.len ){
			num[j] = ( a.num[j] + b.num[j] + tmp ) % 10;
			tmp = ( a.num[j] + b.num[j] + tmp ) / 10 ;
			++j;
		}
		if( j < a.len ){
			while( j < a.len ){
				num[j] = ( a.num[j] + tmp ) % 10 ;
				tmp = ( a.num[j] + tmp ) / 10 ;
				j++;
			}
		}else{
			while( j < b.len ){
				num[j] = ( b.num[j] + tmp ) % 10 ;
				tmp = ( b.num[j] + tmp ) / 10 ;
				++j;
			}
		}
		if( tmp ) num[j++] = tmp ;
		len = j ;
		return ;
	}
	void print(){
		for( int i = len - 1 ; i >= 0 ; --i )
			printf( "%d" , num[i] );
		printf( "\n" );
		return ;
	}
}f[1001];

int main(){
	f[1].inif(1,1);
	f[2].inif(1,1);
	for( int i = 3 ; i < 1001 ; ++i )
		f[i].plus(f[i-1],f[i-2]);
	int t , n ;
	scanf( "%d" , &t );
	while( t-- ){
		scanf( "%d" , &n );
		f[n].print();
	}
	return 0;
}
```
