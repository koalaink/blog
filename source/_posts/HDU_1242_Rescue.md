---
title: HDU 1242 Rescue
date: 2013-11-21 18:11:34
categories: [Algorithm, ACM,BFS]
tags: [ACM,C++,HDU,BFS]
---

题目链接：[HDU 1242](http://acm.hdu.edu.cn/showproblem.php?pid=1242)  

不知道怎么的最近写题目很粗心  

就这道题吧，之前A过了，现在重敲了一遍，然后呵呵呵呵的一排过去  


* `scanf( "%d%d" , &n , &m );`  居然漏了一个 `%d` 写成 `scanf( "%d" , &n , &m );`  

* `main`函数里忘了调用`bfs()`函数，漏掉 `bfs();` 一句  

* `printf( "%d\n" , ans );`  也能漏掉一个 `\n`    

* `vis[sx][sy] = true;`  同漏  

呵呵呵呵呵又是一排过去  

最后是，原本是用 r 做起点 a 做终点去做 ， 可是没想到人家 angle 是有好多朋友的啊呵呵呵呵呵哭了  

于是改掉用a做起点 r去判断终状态  

于是有了下面的代码
<!-- more -->
```C++
#include<iostream>
#include<stdio.h>
#include<queue>
using namespace std;

int n , m ;
char map[205][205];
bool vis[205][205];
int dir[4][2] = { 1 , 0 , -1 , 0 , 0 , 1 , 0 , -1 };
int sx , sy , ex , ey , ans ;

struct node{
    int x , y ;
    int time;
    bool check(){
        if( x<0 || x>=n || y<0 || y>=m || map[x][y] == '#' )
            return false;
        return true;
    }
};

void bfs(){
    node now , next;
  now.x = sx ;
  now.y = sy ;
  now.time = 0 ;
  vis[sx][sy] = true;
  queue<node> q;
  q.push(now);
  while( !q.empty() ){
    now = q.front();
    q.pop();
    if( map[now.x][now.y] == 'r' ){
      ans = now.time;
      return ;
    }
    for( int i = 0 ; i < 4 ; ++i ){
      next.x = now.x + dir[i][0];
      next.y = now.y + dir[i][1];
      next.time = now.time;
      if( !next.check() ) continue;
      if( vis[next.x][next.y] ) continue;
      if( map[next.x][next.y] == 'x' )
        next.time += 2;
      else
        next.time += 1;
      vis[next.x][next.y] = true;
      q.push(next);
    }
  }
    return ;
}

int main(){
    while( scanf( "%d%d" , &n , &m ) != EOF ){
        for( int i = 0 ; i < n ; ++i ){
            char tmp[205];
            scanf( "%s" , tmp );
            for( int j = 0 ; j < m ; ++j ){
                map[i][j] = tmp[j] ;
                if( tmp[j] == 'a' )
                    sx = i , sy = j;
            }
        }
        memset( vis , false , sizeof(vis) );
        ans = -1;
        bfs();
        if( ans != -1 )
            printf( "%d\n" , ans );
        else
            printf( "Poor ANGEL has to stay in the prison all his life.\n" );
    }
    return 0;
}
```
