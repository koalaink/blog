---
title: HEXO+Github,搭建属于自己的博客
date: 2016-9-27 14:47:03
categories: [GIT,HEXO]
tags: [GIT,HEXO]
---

HEXO官网地址：[HEXO](https://hexo.io)  

-----------

## 什么是 Hexo?    

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 [Markdown](http://daringfireball.net/projects/markdown/)（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。  

## 安装  

安装 Hexo 只需几分钟时间，若在安装过程中遇到问题或无法找到解决方式，可提交问题至 [HEXO官网](https://github.com/hexojs/hexo/issues)。  

### 安装前提  

安装 Hexo 相当简单。然而在安装前，必须检查电脑中是否已安装下列应用程序：  

* [Node.js](http://nodejs.org/)  
* [Git](https://git-scm.com/)  

如果电脑中已经安装上述必备程序，那么恭喜！接下来只需要使用 npm 即可完成 Hexo 的安装。  

```bash
npm install -g hexo-cli
```

> **Mac 用户**  
> 在编译时可能会遇到问题，请先到 App Store 安装 Xcode，Xcode 完成后，启动并进入 Preferences -> Download -> Command Line Tools -> Install 安装命令行工具。  

### 安装 Git  
* Windows：下载并安装 [git](https://git-scm.com/download/win).  
* Mac：使用 [Homebrew](http://brew.sh/), [MacPorts](http://www.macports.org/) 或下载 [安装程序](https://sourceforge.net/projects/git-osx-installer/) 安装。  
* Linux (Ubuntu, Debian)：`sudo apt-get install git-core`  
* Linux (Fedora, Red Hat, CentOS)：`sudo yum install git-core`  

### 安装 Node.js

安装 Node.js 的最佳方式是使用 [nvm](https://github.com/creationix/nvm)。  

cURL:

```bash
curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```
Wget:

```bash
wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
```
安装完成后，重启终端并执行下列命令即可安装 Node.js。  

```bash
nvm install stable
```
或者也可以下载 [安装程序](http://nodejs.org/) 来安装。  

### 安装 Hexo  

所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。  

```bash
npm install -g hexo-cli
```

## 建站  

### 初始化  

安装 Hexo 完成后，执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。  

```bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```

新建完成后，指定文件夹的目录如下：  

```bash
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

#### \_config.yml

网站的 配置 信息，可以在此配置大部分的参数。  

#### package.json  

应用程序的信息。[EJS](http://embeddedjs.com/), [Stylus](http://learnboost.github.io/stylus/) 和 [Markdown](http://daringfireball.net/projects/markdown/) renderer 已默认安装，可以自由移除。  

####  scaffolds  

[模版](https://hexo.io/docs/writing.html#Scaffolds) 文件夹。当新建文章时，Hexo 会根据 scaffold 来建立文件。  

#### source  

资源文件夹是存放用户资源的地方。除 \_posts 文件夹之外，开头命名为 _ (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件会被拷贝过去。  

#### themes  

[主题](https://hexo.io/docs/themes.html) 文件夹。Hexo 会根据主题来生成静态页面。  

---------

更多的配置信息可参考 [HEXO官方文档](https://hexo.io/docs/)  

### 本地运行

至此，所有的安装工作都已经完成，`<folder>` 就是你个人博客的跟目录，接下去的所有操作都是在此目录下进行。  

在你的博客目录下执行以下命令：  

```bash
hexo server
```

在浏览器访问：[http://localhost:4000/](http://localhost:4000/) 即可进入访问自己的博客。  

## GitHub配置  

### 创建仓库  

创建与你GitHub用户名对应的仓库，在 Repository name 下填写 `your_user_name.github.io` ，这是固定写法，将 your_user_name 替换成你的GitHub用户名即可。  

### 关联  

修改博客跟目录下的`_config.yml`文件：  

```yml
deploy:
  type: git
  repository: https://github.com/your_user_name/your_user_name.github.io.git
  branch: master
```

安装插件支持git部署：  

```bash
npm install hexo-deployer-git --save
```

### 部署  

安装完以上插件后，执行：

```bash
hexo deploy
```

部署成功后，在浏览器访问：[http://your_user_name.github.io/](http://your_user_name.github.io/) ，其中your_user_name替换成你自己的GitHub用户名。  

## Hexo 命令  

### 部署步骤  

```bash
hexo clean      # 清除本地静态页面
hexo generate   # 生成静态页面至public目录
hexo deploy     # 部署到GitHub
```

也可以缩写成：  

```bash
hexo clean
hexo d -g
```

### 常用命令  

```bash
hexo new "postName"       # 新建文章
hexo new page "pageName"  # 新建页面
hexo generate   # 生成静态页面至public目录
hexo server     # 开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy     # 将.deploy目录部署到GitHub
hexo help       # 查看帮助
hexo version    # 查看Hexo的版本
```

## 使用自己的域名  

如果想使用自己的域名来访问博客，那就设置一下域名的DNS解析即可。  

进入 域名管理 -> 域名解析 ，类型选择CNAME记录，对应值填上 your_user_name.github.io ，保存即可。这样你就可以使用自己的域名来访问你的博客了 **（修改DNS解析不会马上生效，设置后大概需要等1~2小时左右才会生效）** 。  
