---
title: HDU 1081 To The Max
date: 2013-11-13 21:56:22
categories: [Algorithm, ACM,DP]
tags: [ACM,C++,HDU]
---

题目链接：[HDU 1081](http://acm.hdu.edu.cn/showproblem.php?pid=1081)  

想了好久都没想出来，最后还是看了别人的思路，自己动手实现了一下才AC了。  

求最大子串和，将一个二维的问题转化成多个一维的最大子串和问题进行求解  

大致转换思路是 给定一个 i 为起始行，j 为结束行，将每一列的元素从 i 行到 j 行累加起来作为一个元素，组成一个长度为n的数组，既可将一个 i 到 j 行的二维数组压缩为一维，求解这个一维数组的最大子串和，循环每一个可能的 i 跟 j ，得到的最大的那个最大子串和即为所求值。  

至于一维的最大子串和求解，最大子串和必定以数组中某个元素为结尾，可用dp[i]表示以元素a[i]为结尾的所有子串的最大和，对于dp[i]这个状态，可有两种状态推得，因为dp[i]中必然要含有a[i]这个元素，所以 dp[i] = max ( dp[i-1]+a[i] , a[i] ) ，这个就是状态转移方程，所以找出dp[n]中最大的值就是该数组的最大子串和。  


具体见以下代码的实现  
<!-- more -->
```C++
#include<iostream>
#include<stdio.h>
using namespace std;

int a[105][105] , c[105][105][105];    // a为所给元素  c[i][j][n] 表示对于一个 i j 压缩得的长度为n的数组
int dp[105][105][105];

int max(const int& a , const int& b){
  return a>b?a:b;
}

int main(){
  int n , i , j , k , l ;
  int MAX;
  while( scanf( "%d" , &n ) != EOF ){
    for( i = 0 ; i < n ; ++i )
      for( j = 0 ; j < n ; ++j )
        scanf( "%d" , &a[i][j] );
    memset( c , 0 , sizeof(c) );
    memset( dp , 0 , sizeof(dp) );
    MAX = -99999999;              // 对于MAX的初始化不能用0，因为最大子串和也可能是为负
    for( i = 0 ; i < n ; ++i ){          // 起始行
      for( j = i ; j < n ; ++j ){        // 结束行
        for( k = 0 ; k < n ; ++k ){      // 循环所有列
          for( l = i ; l <= j ; ++l ) c[i][j][k] += a[l][k] ;      // 计算每一列的和
          dp[i][j][k] = max(dp[i][j][k-1]+c[i][j][k],c[i][j][k]);    // 求该i j 对应的压缩数组的最大子串和
          if( dp[i][j][k] > MAX ) MAX = dp[i][j][k];
        }
      }
    }
    printf( "%d\n" , MAX );
  }
  return 0;
}
```
