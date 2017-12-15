---
title: LeetCode —— Regular Expression Matching
date: 2017-06-10 15:37:25
categories: [Algorithm, LeetCode]
tags: [Algorithm, LeetCode, DP]
---

> 换用JavaScript刷题，有种不一样的感觉。  

[题目链接：LeetCode —— Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/#/description)  

## 题目描述  

正则表达式匹配，规定正则表达式中的符号只有：`.` 和 `*`  

`.` 可以匹配任意一个字符  
`*` 可以匹配它的前一个字符0或任意多次  
并且要求匹配整个字符串才算成功  <!-- more -->
例：  
```javascript
isMatch("aa","a"); // false
isMatch("aa","aa"); // true
isMatch("aaa","aa"); // false
isMatch("aa", "a*"); // true
isMatch("aa", ".*"); // true
isMatch("ab", ".*"); // true
isMatch("aab", "c*a*b"); // true
```

## 解题思路  

### Solution 1  

可以直接使用JS的正则匹配方法，尽管有点投机……  

### Solution 2  

动态规划  

假设 Si = `<s1, s2, s3, ..., sm>`，Pj = `<p1, p2, p3, ..., pn>`  
dp[i][j] 表示 `isMatch(Si, Pj)` 的值  

初始化：  
`dp[0][0] = isMatch('', '') = true;`  
`i > 0 && j = 0` 时 `dp[i][0] = isMatch(Si, '') = false;`  

状态转移：  
分以下两种情况：  
`pj !== '*'`
当i=0时，Pj必然不会匹配空串，因此`dp[i][j] = false`  
当i>0时，若pj = si，那么`dp[i][j] = dp[i-1][j-1]`；若pj != si，那么`dp[i][j] = false`  

`pj === '*'`  
匹配字符出现`'*'`，则需要去比较 pj-1 与 si 是否想等
因为`'*'`也可以匹配0次，所以如果Pj-2匹配Si成功，那么Pj匹配Si也必然成功  

## AC代码  

### Solution 1

Runtime: **155 ms**  

![runtime 1](/posts_assets/leetcode_10_regular_expression_matching/runtime_1.jpeg)  

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  return (new RegExp('^'+p+'$')).test(s);
};
```

### Solution 2  

Runtime: **145 ms**  

![runtime 2](/posts_assets/leetcode_10_regular_expression_matching/runtime_2.jpeg)  

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  var dp = [[]], i, j;
  dp[0][0] = true;
  for(i = 0; i <= s.length; ++i){
    i > 0 && dp.push([]);
    for(j = 1; j <= p.length; ++j){
      if(p[j-1] !== '*'){
        dp[i][j] = i > 0 && dp[i-1][j-1] && (s[i-1] === p[j-1] || p[j-1] === '.');
      } else {
        dp[i][j] = dp[i][j-2] || i > 0 && dp[i-1][j] && (s[i-1] === p[j-2] || p[j-2] === '.');
      }
    }
  }
  return dp[s.length][p.length] ? true : false;
};
```
