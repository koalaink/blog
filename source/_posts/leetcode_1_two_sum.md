---
title: LeetCode —— Two Sum
date: 2017-06-02 20:42:33
categories: [Algorithm, LeetCode]
tags: [Algorithm, LeetCode, HASH]
---

> 换用JavaScript刷题，有种不一样的感觉。  

[题目链接：LeetCode —— Two Sum](https://leetcode.com/problems/two-sum/#/description)  

## 题目描述  

给定一个整数数组和一个整数target，在数组中找到两个数相加和等于target，输出这两个数在数组中的下标。
**注：每个输入都能保证有一个唯一解，且同一个位置的数不会被使用两次。**  <!-- more -->
例：
```javascript
输入：nums = [2, 7, 11, 15], target = 9
因为：nums[0] + nums[1] = 2 + 7 = 9
所以 return [0, 1]
```

## 解题思路  

直接暴力，时间复杂度O(n^2)必然是要吃TLE的。这里得想个O(n)的算法，因此可以用hash map，循环数组，依次判断 `nums[i]` 是否在hash map中，若存在，则已找到答案；若不存在，则在hash map中纪录 `hash[target - nums[i]] = i`。  

## AC代码  

Runtime: **95 ms**  

![runtime](/posts_assets/leetcode_1_two_sum/runtime.jpeg)  

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var i, hash = {};
    for(i = 0; i < nums.length; ++i){
        if(hash[nums[i]] !== undefined){
            return [hash[nums[i]], i];
        } else {
            hash[target - nums[i]] = i;
        }
    }
    return [-1, -1];
};
```
