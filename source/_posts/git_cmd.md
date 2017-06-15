---
title: Git 常用指令整理
date: 2017-05-17 21:32:12
categories: [GIT]
tags: [GIT]
banner: /posts_assets/git_cmd/banner.png
---

## 检出项目  

```bash
git clone [url]
git clone [url] dirname # 检出代码到指定目录
git clone [url] -b branch_name # 检出指定分支代码

git submodule init # 初始化submodule
git submodule update # 更新检出submodule
git submodule update --init --recursive # 初始化检出所有submodule
```

<!-- more -->
## 更新  

```bash
git fetch # 获取远程的更新
git fetch origin master # 获取master分支的远程更新

git pull origin master # 获取远程master分支到更新，并且与本地的master分支合并
```

## 分支  

```bash
git branch # 查看本地分支
git branch -r # 查看远端分支
git branch -a # 查看本地和远端分支

git branch my_branch # 创建my_branch分支
git checkout my_branch # 切换到my_branch分支
git checkout -b mybranch # 创建并切换到my_branch分支
git branch -d mybranch # 删除本地mybranch分支(需先切换到其它分支)

git push origin mybranch:mybranch # 以本地mybranch分支新建远端mybranch分支
git push origin --delete mybran # 删除远端mybranch分支

git merge mybranch # 将mybranch分支合并到当前分支
git merge --no-ff mybranch # 将mybranch分支合并到当前分支 使用非快进式合并
```

## 提交  

```bash
git status # 查看修改状态

git add file.js # 提交文件修改到暂存区
git reset file.js # 撤销提交文件到暂存区

git commit -m 'message' # 提交修改
git commit -am 'message' # 提交所有变动 相当于 git add . && git commit -m 'message'

# git push之前 先更新代码 git fetch && git pull
# push操作后 别人才能 fetch || pull 到你提交的更新
git push origin master # 将提交推送到远端master分支
```

## 暂存  

```bash
git stash # 暂存当前工作环境
git stash list # 列出所有暂存的工作环境列表

git stash pop # 恢复到上一个暂存的工作环境 并从stash list中删除
git stash apply stash@{0} # 恢复 stash@{0} 工作环境 不从stash list中删除
git stash drop stash@{0} # 从stash list中删除 stash@{0}工作环境
git stash clear # 清空暂存工作环境列表
```

## Tag  

```bash
git fetch -t # 获取远端tag更新

git tag # 列出所有tag
git tag tag_name -m 'message' # 创建tag_name标签
git show tag_name # 查看tag信息
git checkout tag_name # 切换到tag_name标签
git tag -d tag_name # 删除tag_name标签
git push origin tag_name # 将tag_name标签提交到远端
git push origin --delete tag tag_name # 删除远程tag_name标签
```

## Log  

```bash
git log -p #查看上次提交的差异变化
git log -p -2 #查看最近两次提交的差异变化
git log --online #列表列出提交记录
git log --committer xxx #列出xxx的提交记录
```

## 其它常见问题  

### .gitignore 无效  

原因可能是 gitignore 中的文件已经存在git版本库中，需要将文件从git中移除，gitignore文件才会生效
```bash
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

### 更改项目git地址  

```bash
git remote rm origin #删除旧的git地址
git remote add origin [url] #添加新的git地址
```
