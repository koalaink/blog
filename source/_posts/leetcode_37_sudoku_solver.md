---
title: LeetCode —— Sudoku Solver
date: 2018-01-17 15:18:25
categories: [Algorithm, LeetCode]
tags: [Algorithm, LeetCode, DFS]
---

> 换用JavaScript刷题，有种不一样的感觉。  

[题目链接：LeetCode —— Sudoku Solver](https://leetcode.com/problems/sudoku-solver/description/)  

## 题目描述  

数独游戏规则：需要根据9×9盘面上的已知数字，推理出所有剩余空格的数字，并满足每一行、每一列、每一个粗线宫（3*3）内的数字均含1-9，不重复。  
`board`中使用字符串`'.'`表示空格；

## 解题思路  

状态标记：  
使用三个`int`数组`rolSt`、`colSt`、`blkSt`分别表示每行/每列/每宫的填入状态；
举例说明：如果`rolSt[i]=9`，转换成二进制`000001001`，也就是说第`i`行已经填入了数字`1`和`4`；  

深度优先遍历(DFS)棋盘，注意终点和边界的判断即可；   <!-- more -->

## AC代码  

> 竟打败了100%的javascript提交  

Runtime: **117 ms**  

![runtime](/posts_assets/leetcode_37_sudoku_solver/runtime.jpg)  

```javascript
var rolSt;
var colSt;
var blkSt;

function DFS(board, fi, fj){
  var i, j, k, blkId, t;
  if(fi === 8 && fj === 8){ // 全部填写完毕
    return true;
  }

  i = fi;
  j = fj;
  while(board[i][j] !== '.'){ // 找到下一个要填入的单元格
    ++j;
    i += Math.floor(j/9);
    j %= 9;
    if(i >= 9){ // 全部填写完毕
      return true;
    }
  }

  blkId = Math.floor(i/3)*3+Math.floor(j/3); // 宫下标
  for(k = 0; k < 9; ++k){
    t = 1<<k;
    if((rolSt[i]&t) === 0 && (colSt[j]&t) === 0 && (blkSt[blkId]&t) === 0){
      rolSt[i] |= t;
      colSt[j] |= t;
      blkSt[blkId] |= t;
      board[i][j] = k+1+'';
      if(DFS(board, i, j)){ // 递归往后填
        return true;
      } else { // 回溯
        rolSt[i] -= t;
        colSt[j] -= t;
        blkSt[blkId] -= t;
        board[i][j] = '.';
      }
    }
  }
  // 找不到可以填入的数字 返回false
  return false;
}

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  rolSt = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  colSt = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  blkSt = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var blkId, t;
  for(var i = 0; i < 9; ++i){ // 初始化状态
    for(var j = 0; j < 9; ++j){
      if(board[i][j] !== '.'){
        blkId = Math.floor(i/3)*3+Math.floor(j/3);
        t = 1<<(board[i][j]-1);
        rolSt[i] |= t;
        colSt[j] |= t;
        blkSt[blkId] |= t;
      }
    }
  }
  DFS(board, 0, 0); // 开始DFS
};

```
