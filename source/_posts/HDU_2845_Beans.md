---
title: HDU 2845 Beans
date: 2013-11-22 13:03:31
categories: [ACM,ACM]
tags: [ACM,C++,HDU]
---

题目链接：[HDU 2845 Beans](http://acm.hdu.edu.cn/showproblem.php?pid=2845)

吃豆豆  

一个方格里一个值表示豆的质量，吃豆的规则是当你在(x,y)处吃了一个豆  

那个这个豆的左边一格、右边一格、以及上一行、下一行的豆都不能吃。  

问最多能吃到多少质量的豆  


解题思路：  
<!-- more -->

每一行计算最大质量，因为一个格子只能选择吃或者不吃，所以用用nsum[0]、nsum[1]分别表示到这个格子处吃、或者不吃的最大质量  

用 cmax[0]、cmax[1] 表示前一格吃没吃豆子的最大质量  

若在该点没有吃豆子 ， 那显然可以从前状态可以推得到此最大值为 max(cmax[0],cmax[1]) ， nsum[0] = max(cmax[0],cmax[1])  

若在该点吃了豆子，那么根据规则，前一格必须没有吃  故 nsum[1] = cmax[0] + weight ;  

用这两个式子去更新状态，到达行末是，max(cmax[0],cmax[1])就是这一行的最大质量。  

算到这里，会发现，如果每一行的最大质量都算出来之后，我们就又得到一列数字，根据规则，吃了i行，那么i-1行与i+1行就不能吃  

可否将这列数字又看成是一行，吃了第i个位置的大豆子，就不能再吃左边、右边的豆子  

于是就可以根据刚才的更新规则再推一次，这次推完之后得到的就是题目所要求的最大质量了。  


由于考虑到题目对于  m  n   的限定是  1<=M*N<=200000  

如果要开二维数组来存的话显然是不行的  

所以就得到一个数据更新一次状态，就不用开数组了  

```C++
#include<iostream>
#include<stdio.h>
using namespace std;

int main(){
	int nsum[2] , pmax[2] , cmax[2] , rmax[2] , sum ;
	int m , n , i , j , tmp ;
	while( scanf( "%d%d" , &m , &n ) != EOF ){
		memset(pmax,0,sizeof(pmax));
		memset(rmax,0,sizeof(rmax));
		for( i = 0 ; i < m ; ++i ){
			memset(cmax,0,sizeof(cmax));
			memset(nsum,0,sizeof(nsum));
			for( j = 0 ; j < n ; ++j ){
				scanf( "%d" , &tmp );
				nsum[0] = cmax[1]>cmax[0]?cmax[1]:cmax[0];
				nsum[1] = cmax[0]+tmp ;
				cmax[0] = nsum[0];
				cmax[1] = nsum[1];
			}
			sum = cmax[0]>cmax[1]?cmax[0]:cmax[1] ;		
			rmax[0] = pmax[1]>pmax[0]?pmax[1]:pmax[0];
			rmax[1] = pmax[0]+sum;
			pmax[0] = rmax[0];
			pmax[1] = rmax[1];
		}
		printf( "%d\n" , pmax[0]>pmax[1]?pmax[0]:pmax[1] );
	}
	return 0;
}
```
