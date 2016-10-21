---
title: 清除浮动的常见方法与原理解析
date: 2015-11-03 00:02:08
categories: [WEB,CSS]
tags: [css,float]
---

在页面布局中，使用浮动(float )往往是不可避免的，尽管使用浮动后总可能会带来一系列的问题（如常见的“**高度坍塌**”），但是通过浮动能够方便我们的布局，因此，设置了浮动，我们总需要并也有必要去清除浮动。清除浮动的形式有很多种，但是总的概括起来就是两种类别：  

1. 在浮动元素之后添加空元素，并设置`style="clear:both;"`  
2. 在浮动元素的父元素设置overflow 或者display 属性为某些特定值  

<!-- more -->
## 清除浮动的方式  

以下将介绍一些常见的用来清除浮动的方式。

### 额外空标签  
这种方式是最简单易懂的，即在浮动元素的后面额外添加一个标签，并且设置样式的clear属性，代码如：`<div style="clear: both;"></div>` ，这里不一定要使用`<div>`标签，也可以使用其他任意的标签，也能起到清除浮动的效果。  
```html
<div class="wrapper">
	<div style="float: left;">left</div>
	<div style="float: right;">right</div>
	<div style="clear: both;"></div>
</div>
```

**优点**：通俗易懂，易于掌握  
**缺点**：添加了额外无意义的标签，破坏了文档的结构，不易于后期的维护  

### br 标签

这种方法与上面的第一种方法类似，也是添加额外标签，这里的标签是使用`<br>` ，`<br>`标签有一个clear属性，具有三种值，为：`left | right | all` ，不清楚这个属性的可以参考[ w3school <br>标签的 clear属性](http://www.w3school.com.cn/tags/tag_br_prop_clear.asp)。清除浮动的代码如：`<br clear="all">`  
```html
<div class="wrapper">
	<div style="float: left;">left</div>
	<div style="float: right;">right</div>
	<br clear="all"></br>
</div>
```

**优点**：比第一种方法中使用空标签的语义性好  
**缺点**：同样破坏了文档的结构，不易于后期的维护  

### after伪元素  
使用CSS 的伪元素after，这种方法的原理与上面介绍的类似。在浮动元素的父级元素定义after 伪元素，这个伪元素会生成在父元素内的最末尾处，通过这个伪元素来清除浮动，关键的CSS 代码还是`clear: both;` 。  

CSS代码如下：  
```css
.clearfix::after {
	content: " ";
	display: block;
	height: 0;
	visibility: hidden;
	clear: both;
}
.clearfix {
	*zoom: 1;
}
```
使用如下：
```html
<div class="wrapper clearfix">
	<div style="float: left;">left</div>
	<div style="float: right;">right</div>
</div>
```
其中定义after为块元素并且设置`height: 0;` 避免其对文档正常布局造成影响，将其隐藏，然后就是设置清除浮动。zoom属性是因为IE6/7 不支持after ，故使用`zoom: 1;`来触发hasLayout 。  
**优点**:文档结构与语义化未被破坏，使用方便  
**缺点**:代码较多，定义了一个隐藏块元素来清除浮动  

### 父元素浮动  
在浮动元素的父元素也设置浮动，这样能解决局部的浮动问题，但在实际使用中并不推荐用这种方法来清除浮动，因为这种通过设置浮动来清除浮动的方法，会将一些隐藏的浮动问题转移给父元素，可能导致你需要继续去解决父元素的浮动问题，直到`<body>`处才停止。  
**优点**:未添加任何元素来清除浮动，设置简单，代码量少  
**缺点**:问题转移，父元素浮动后可能导致父元素级别布局出现问题，需要一直往上解决问题  

### 父元素display  
设置浮动元素的父元素display 属性为table。  
**优点**:不会引起结构与语义上的问题，代码简单  
**缺点**:元素的盒子模型改变，可能会导致其他的问题出现  

### 父元素overflow  
设置浮动元素的父元素overflow属性值为hidden | auto 。在IE 下需要设置zoom: 1; 来触发 hasLayout 。
**优点**:不会引起结构与语义上的问题，代码简单  
**缺点**:多个嵌套后，firefox 某些情况会造成内容全选；IE 中 mouseover  造成宽度改变时会出现最外层模块有滚动条等，firefox 早期版本会无故产生focus 等  

## 清除浮动的原理  
以上列举的六种方法，主要分为两种类型：  

1. 在浮动元素之后添加空元素，并设置`style="clear:both;"`  
2. 在浮动元素的父元素设置overflow 或者display 属性为某些特定值  

其中第一种类型容易理解，起作用的关键就是在于`clear: both;` 这句代码，将它放在浮动元素的后面清除浮动。  
那第二种类型的原理是设置overflow 或display 属性的值为某些特定值时，触发父元素生成BFC(Block formatting context) ，而BFC 规定了其内部的Block-level Box 的布局规则，使得浮动被清除了。关于BFC 的概念如果不太清楚，可以看一下[BFC的概念及应用与原理](/2015/11/03/html_bfc/)，这篇文章会有介绍BFC的概念以及一些用法。  

----
参考文章：[http://www.w3cfuns.com/article-1287-1.html](http://www.w3cfuns.com/article-1287-1.html)
