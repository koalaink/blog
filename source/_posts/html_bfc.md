---
title: BFC的概念及应用与原理
date: 2015-11-03 17:50:01
categories: [WEB,HTML]
tags: [HTML,BFC]
---

BFC这个概念应该都不陌生，网上也有很多的文章介绍BFC概念以及用法。看了一些关于BFC的文章，下面就对BFC的概念以及用法做个总结。  

## Formatting context  

在理解BFC之前，先理解什么是Formatting context  
Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。  
<!-- more -->
## Block fomatting context  

首先先介绍一下BFC概念的定义，一下是摘抄自[W3C对BFC的定义](http://www.w3.org/TR/CSS2/visuren.html#block-formatting)：  

> Floats, absolutely positioned elements, block containers (such as inline-blocks , table-cells , and table-captions ) that are not block boxes, and block boxes with 'overflow ' other than 'visible ' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.
>
>In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin ' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.
>
>In a block formatting context, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch). This is true even in the presence of floats (although a box's line boxes may shrink due to the floats), unless the box establishes a new block formatting context (in which case the box itself may become narrower due to the floats).

翻译一下上面的描述：  
>浮动元素、绝对定位元素，非块元素的块级容器（如inline-blocks ,table-cells ,和table-captions ），以及overflow 属性值不为visible 的块元素（除非这个值已经传播到视窗上），这些元素建立新的块格式化上下文的内容（BFC）。  
>
>在一个块格式化上下文中，盒子从包含块的顶部开始，垂直往下依次排布，兄弟盒子间的垂直距离由他们的margin决定。垂直方向相邻的两个块元素的margin 会重叠。  
>
>在一个块格式化上下文中，每个盒子的左外边缘与包含块的左边缘接触（对于从右往左的格式，则是右外边缘与包含块的右边缘接触），即使是浮动元素也是如此（尽管一个盒子会由于浮动而缩小），除非这个盒子建立了新的块格式化上下文（在这种情况下盒子本身可能会因为浮动而变窄）。  

----

到这里介绍完W3C对BFC的定义，概念的描述比较不好理解，做几点概括  

### 什么是BFC  
BFC全称是Block Formatting Context，直译就是块格式化上下文，它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。  

### BFC的布局规则  
1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin 决定。属于同一个BFC的两个相邻Box的margin 会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此，除非这个盒子建立了新的块格式化上下文。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

### 会建立BFC的元素  
1. 根元素
2. float 属性不为none
3. position 属性为absolute 或fixed
4. display 属性为inline-block ,table-cell ,table-caption ,flex ,inline-flex
5. overflow 属性不为visible

有些文章中说display: table; 也能触发BFC，需要注意的是，display:table; 本身并不会创建BFC，但是它会产生[匿名框(anonymous boxes)](http://www.w3.org/TR/CSS21/tables.html#anonymous-boxes)，而匿名框中的display:table-cell; 可以创建新的BFC，换句话说，触发块级格式化上下文的是匿名框，而不是display:table; 。所以通过display:table;和display:table-cell; 创建的BFC效果是不一样的。  

### BFC的应用  

#### 解决margin重叠问题  

在实践中，总会遇到相邻块元素的margin 会发生重叠的现象，这个从BFC布局的规则中的第二点可以找到原因。比如两个相邻的`<p>`标签，他们都有`margin: 50px auto;`，那么他们垂直方向上的间距只有50px ，因为第一个`<p>`的margin-bottom 与第二个`<p>`的margin-top 发生了重叠，因而只留下了50px 的间距。  

```html
<div class="container">
  <p style="margin: 50px auto;background-color: red;">first</p>
  <p style="margin: 50px auto;background-color: green;">second</p>
</div>
```
![截图](/posts_assets/html_bfc/DL1I5ZP2W646G0OWGZXLF.png)  

要解决这种问题，只需要让其中让一个`<p>`外部包裹一个`<div>`，并且触发这个`<div>`建立一个BFC，这样两个`<p>`不属于同一个BFC,他们的margin就不会重叠。  
```html
<div class="container">
  <p style="margin: 50px auto;background-color: red;">first</p>
  <div style="overflow: auto;">
    <p style="margin: 50px auto;background-color: green;">second</p>
  </div>
</div>
```
![截图](/posts_assets/html_bfc/P-NDUYT657KS53FV3_XO.png)  

#### 实现两栏布局  
对于常见的两栏布局问题，要求要让一栏定宽，另一栏自适应宽度，也可以利用BFC的特性来实现。  
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		html, body, div{
			margin: 0;
			padding: 0;
		}
		html, body {
			height: 100%;
		}
		.container {
			height: 100%;
			color: #fff;
		}
		.left {
			width: 200px;
			height: 300px;
			float: left;
			background-color: red;
		}
		.right {
			height: 400px;
			background-color: green;
		}
	</style>
</head>
<body>
<div class="container">
	<div class="left">red is left</div>
	<div class="right">green is right</div>
</div>
</body>
</html>
```
![截图](/posts_assets/html_bfc/I516QBYDU6-C38VMX0JIMW.png)  

可以发现，此时我们设置左栏浮动，右栏的内容依然从包含块(div.container )的左边缘开始，所以绿色部分也占据了左边栏底下部分，根据BFC布局规则第三、四条，我们可以触发右边`<div>`建立新的BFC，这样右边`<div>`就不会与左边栏重叠，形成两栏布局。代码只需要在`.right`中添加一句`overflow: auto;`即可出现如下图中的效果。  
![截图](/posts_assets/html_bfc/3Q90B6R86Y7AJ9XIGC.png)  

#### 清除浮动  
常见的浮动造成的问题，如高度坍塌现象，就是因为浮动元素脱离了文档流，包含块计算高度时没有计算浮动元素的高度，导致包含块的高度比实际内容的高度要小。  
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		.wrapper {
			width: 450px;
			border: 2px solid red;
		}
		.box {
			width: 200px;
			height: 200px;
			border: 2px solid green;
			margin: 10px;
		}
	</style>
</head>
<body>
    <div class="wrapper">
    	<div class="box" style="float: left;"></div>
    	<div class="box" style="float: left;"></div>
    </div>
</body>
</html>
```
代码的运行效果如图：  
![截图](/posts_assets/html_bfc/NAU4K6CQ7I5NH1YN4B.png)  

图中可以明显看见，包含块div.wrapper 的高度为零（红色边框，由于高度为零所以边框重叠了显示成一条直线），这种效果明显不是我们想要的。要解决这种现象，就可以利用BFC布局规则的第六条：计算BFC的高度时，浮动元素也参与计算。所以我们只需要触发包含块div.wrapper 生成BFC即可。  
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		.wrapper {
			width: 450px;
			border: 2px solid red;
		}
		.box {
			width: 200px;
			height: 200px;
			border: 2px solid green;
			margin: 10px;
		}
	</style>
</head>
<body>
<div class="wrapper" style="overflow: auto;*zoom: 1;">
	<div class="box" style="float: left;"></div>
	<div class="box" style="float: left;"></div>
</div>
</body>
</html>
```
代码中的*zoom: 1; 是为了在IE 下触发hasLayout ，这时的运行效果如下图：  
![截图](/posts_assets/html_bfc/IDRHGA_OMJVGEVOAC29T.png)  

这时的效果明显就跟我们预期想要的效果是一样的了，浮动被清楚了。更多关于清除浮动的方法，移步 [清除浮动的常见方法与原理解析](/2015/11/03/css_clean_float/)。  

## 总结  
通俗地来说：创建了 BFC的元素就是一个独立的盒子，里面的子元素不会在布局上影响外面的元素，反之亦然，同时BFC任然属于文档中的普通流。至此你可能会联想到以前在实际应用中，可能经常会遇到一些布局上的问题，出现各种BUG，有时候只要加个`overflow: auto | hidden;`问题就解决了，屡试不爽，其中很有可能就是因为生成BFC对布局产生了影响。当然，也不是出现布局上的BUG一定是因为这个原因，但是也不妨一试，万一BUG就解决了呢。  

----

参考文章：[http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html](http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
