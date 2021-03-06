---
title: H5 canvas绘制出现模糊的问题
date: 2015-11-18 15:53:07
categories: [WEB,HTML]
tags: [H5,canvas]
---

## 背景  

在之前做移动端小游戏 [幸运转盘](/rush/150918/index.html) 、 [九宫格转盘](/rush/150924/index.html) ，使用到了`canvas`，也是第一次在项目中使用`canvas`来实现。  

近期测试人员反应`canvas`绘制的内容太模糊，心想着用`canvas`绘制出来的怎么会模糊，先前也有考虑到适配不同尺寸的移动设备，担心直接使用`img`或者设置`background`会使图片拉伸而变得模糊，所以使用`canvas`来绘制转盘与九宫格，精确的计算每个物体所在的坐标以及尺寸绘制出来的，怎么会模糊。  

<!-- more -->

## 对比  

然而将绘制的内容与页面中的其他文字或者图片作对比后，发现使用`canvas`绘制输出的确实比直接使用标签输出的来的模糊，如下两张截图：  

![大转盘模糊](/posts_assets/h5_canvas_blur/turntable_blur.png)  

![九宫格模糊](/posts_assets/h5_canvas_blur/sudoku_blur.png)  

可以看出转盘中或者九宫格中的图片跟文字，明显与下面直接使用HTML标签显示的文字来的模糊。  

## 原因排查

在网上查了下`canvas`模糊的问题，确实存在，也有不少的解决方法。  

有一种说法是说因为绘制的坐标不是整数级的坐标，所以会变得模糊，所以在计算坐标的时候可以使用`Math.floor`将坐标取整，这样绘制就会变得清晰。  

个人觉得这种说法并不实际，因为在实现的时候就是要计算到每个点每条线的具体位置，角度等等的精确值，这样粗糙的取整，会使得绘制出来的整体跟设计图上有比较大的出入，而且本身也无法维护让每次绘制都是在整数级的坐标上，比如绘制一个圆，要如何让每个点都是在整数坐标的像素点上？  

还有一种方法比较简单，容易实现，而且效果在目前看来还是不错的。  

## canvas 大小

先补充说明一个基础知识点，在使用`canvas`的时候，要设置画布的大小，要使用的是`canvas`的`width`与`height`属性，而不是设置`canvas`的`style`或者CSS样式中的`width`与`height`。  

因为在绘制的过程中画布内容的实际大小是根据`canvas`的`width`与`height`属性设置的，而`style`或者CSS设置的`width`与`height`只是简单的对画布进行缩放。  

这里可以将`canvas`比喻为一个`img`，其中画布的`width`与`height`属性，相当于`img`中图片的原始尺寸；我们使用JS在画布上绘制的内容对应的就是`img`中的图片；而`style`或者CSS设置的`width`与`height`，就是设置`canvas`或者`img`在页面上要显示的大小。  

## 解决方法  

因此这里要解决模糊的做法，就是将这张“图片”变得高清一点，然后缩小了来显示。具体实现就是将画布的大小设置为实际显示大小的两倍，然后在canvas的css属性设置正常显示的宽高，比如，要显示一个100\*200的画布，可以这样写：  

```html
<canvas width="200" height="400" style="width: 100px;height: 200px;"></canvas>
```

如此就相当于画了一张200\*400的图片，然后设置他显示成100\*200的大小，这样一来就变得清晰了。需要注意的是，这样将画布放大之后，绘制的过程中对应的那些坐标，长度等等都要相应的放大，比如原本在100\*200的画布上绘制`ctx.arc(10,10,5,0,Math.PI*2)`，现在在200\*400的画布上就得改成`ctx.arc(20,20,10,0,Math.PI*2)`。如此修改后的效果如下两张截图：  

![大转盘清晰](/posts_assets/h5_canvas_blur/turntable_clear.png)  

![九宫格清洗](/posts_assets/h5_canvas_blur/sudoku_clear.png)  

现在相比之前，明显清晰了许多，画布中的文字和图片与下面HTML标签直接输出的一样清楚，模糊的问题解决了，不会再觉得是撸多了，眼睛花。  

## last  

另外，如果要比较好的解决`canvas`模糊的问题，可以使用JS类库`hidpi-canvas-polyfill`来解决，由于我也没试过，就不多说了，想了解的可以查看 [html5 canvas绘制图片模糊的问题](http://segmentfault.com/q/1010000002391424/a-1020000002391631)，这里有介绍这个插件的使用方法。  

-----------------

本文链接：[H5 canvas绘制出现模糊的问题](/2015/11/18/h5_canvas_blur/)  
