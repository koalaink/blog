---
title: HDU 2100 Lovekey
date: 2013-11-14 22:56:38
categories: [ACM,ACM]
tags: [ACM,C++,HDU]
---

题目链接：[HDU 2100](http://acm.hdu.edu.cn/showproblem.php?pid=2100)  

题目说了那么多，其实就是一道类似A + B的题目。  

输入两个26进制的数a和b，用26进制的形式输出a+b的结果 。  

a b的长度最长不超过200  

这道题我用的是字符去处理的，大数现在还未写过，只能用字符去计算了。  

实现过程就是将a，b用两个字符数组储存，然后用i，j从串尾开始往前遍历，计算过程也没什么好说的，就是取模运算而已  

以下AC代码  
<!-- more -->
```C++
#include<iostream>
#include<stdio.h>
#include<string>
using namespace std;

int main(){
	char a[205] , b[205] , ans[205] ;
	int tmp;
	int i , j , k , l1 , l2 ;
	while( scanf( "%s%s" , a , b ) != EOF ){
		l1 = strlen(a);
		l2 = strlen(b);
		i = l1 - 1;				// 初始化i j ， k的最开始要保留一位，故ans的长度不用 -1
		j = l2 - 1;
		k = l1>l2?l1:l2;
		ans[k+1] = '\0' ;		// 先将ans的最末尾置上结束符
		tmp = 0;				// 初始化进位为0
		while( i>=0 && j>=0 ){	// 第一次循环，就是两串 尾对其的部分，为 a + b
			ans[k--] = (char)( ( tmp + a[i] + b[j] - 2 * 'A' ) % 26 + 'A' );
			tmp = ( tmp + a[i] + b[j] - 2 * 'A' ) / 26 ;
			--i;
			--j;
		}
		if( i >= 0 ){			// if else  就是计算剩余的高位， a+tmp 或者 b+tmp
			while( i >= 0 ){
				ans[k--] = (char)( ( tmp + a[i] - 'A' ) % 26 + 'A' );
				tmp = ( tmp + a[i] - 'A' ) / 26 ;
				--i;
			}
		}else if( j >= 0 ){
			while( j >= 0 ){
				ans[k--] = (char)( ( tmp + b[j] - 'A' ) % 26 + 'A' );
				tmp = ( tmp + b[j] - 'A' ) / 26 ;
				--j;
			}
		}
		ans[k] = tmp + 'A' ;		//  最后是补上ans的最高位
		while( ans[k] == 'A' ) ++k;	 // 这里要注意，因为A表示的是0，故要先将串头的A都去掉再输出ans
		printf( "%s\n" , ans+k );
	}
}
```
