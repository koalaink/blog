---
title: LeetCode —— N-Queens
date: 2017-07-04 22:32:17
categories: [Algorithm, LeetCode]
tags: [Algorithm, LeetCode, DFS]
---

> 换用JavaScript刷题，有种不一样的感觉。  

[题目链接：LeetCode —— N-Queens](https://leetcode.com/problems/n-queens/#/description)  

## 题目描述  

N皇后问题，在一个n*n规格的棋盘上放置n个Queen，放置规则为：同一行/列/斜边上只能有一个Queen。
输入n，程序返回所有的放置方案。  
输出棋盘中：`.`表示空，`Q`表示Queen。  <!-- more -->
例：
```javascript
输入：n = 4
返回：
[
 [".Q..",  // Solution 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // Solution 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

## 解题思路  

经典的DFS问题，对于每行，枚举所有的列，判断当前状态是否可放置Q，如果可以放置，则进入下一行的搜索；因为题目要求返回所有的放置方案，因此在DFS回溯过程中记得要撤销放置；
map结构：map[i]表示第i行放置Q的列坐标。

## AC代码  

Runtime: **122 ms**  

![runtime](/posts_assets/leetcode_51_n_queens/runtime.jpeg)  

```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  var map = [];
  var ans = [];
  var tmpans = [];
  // init
  for(var i = 0; i < n; ++i) map.push(-1);

  function DFS(x){
    if(x === n){
      // find one solution
      tmpans = [];
      for(var i = 0; i < n; ++i){
        tmpans.push('.'.repeat(map[i]) + 'Q' + '.'.repeat(x-map[i]-1));
      }
      ans.push(tmpans);
      return true;
    }

    for(var j = 0; j < n; ++j){
      var flag = true;
      for(var i = 0; i < x; ++i){
        if(map[i] === j || x-i === j-map[i] || x-i === map[i]-j){
          flag = false;
          break;
        }
      }
      if(flag){
        map[i] = j;
        DFS(x+1);
        map[i] = -1;
      }
    }
  }

  DFS(0);

  return ans;
};
```
