---
title: css3动画详解
date: 2016-09-29 22:33:29
categories: [WEB,CSS]
tags: [css3,transition,animation]
banner: /posts_assets/css3_transition_animation/banner.jpg
---

## DEMO  

* [3D transforms](/rush/css3_transition_animation/demo/3dtransforms/index.html)  
* [3D hover](/rush/css3_transition_animation/demo/3dhover/index.html)  
* [leaves](/rush/css3_transition_animation/demo/leaves/index.html)  
* [menu](/rush/css3_transition_animation/demo/menu/index.html)  

## transition  

description：设置对象变换时的过渡，指定对象属性的值发生变化时的过渡动画。  
transition：`transition-property || transition-duration || transition-timing-function || transition-delay`  

default:  `all 0s ease 0s`  

<!-- more -->

### transition-duration  

description：设置对象过渡的持续时间
transition-duration：`<time>`  

### transition-property  

description：设置对象中的参与过渡的属性  
value: `none | all |  [IDENT]`  

`none`指所有属性都不参与过渡；`all`指所有属性都参与过渡；`[IDENT]`指定个别属性参与过渡。  

```css
.button {
    background-color: #800;
    transition: background-color .5s;
}

.panel {
    height: 0px;
    transition: height .5s;
}

.button:hover {
    background-color: red;
}

.button:hover + .panel {
    height: 180px;
}
```
查看演示：[transition demo](/rush/css3_transition_animation/diy/transition.html)  

此时我们`hover`在`.button`上的时候，可以看到`.button`元素的`background-color`属性值会从`#800`过渡到`red`，`.panel`的`height`的属性会从`0px`过渡到`180px`。如果此时我们在`.panel`中增加文案，之前设定的`180px`已经展示不下新的文案，所以需要把代码`.button:hover + .panel`选择器中的`height: 180px`改成`height: auto`，这时我们再看看页面效果。([点击查看DEMO](/rush/css3_transition_animation/diy/transition_1.html))  

此时会发现，`.panel`的高度不再有一个过渡的动画，而是直接从`0px`瞬间变化到`auto`，这是为什么呢？  

**<font color="red">注：并不是所有的属性和属性值都能存在过渡动画。</font>**  

这里特别需要注意的是，如果想要指定某个属性有过渡的状态，我们就需要保证我们能够计算出过渡过程中每个时间点的属性值。
比如，从`height: 0;`过渡到`height: 180px;`，过度时间是`t`，那我们可以算出在`x`时刻的属性状态是`height: (180px-0)*x/t;`。（**注：这里公式成立的前提是假设`transition-timing-function: linear;`，如果`transition-timing-function`为其他值，一样可以计算，只不过算法不同**）  

然而刚才设置了`height: auto;`，则在`x`时刻的属性状态为`height: (auto-0px)*x/t;`，显然，这种状态是不存在的，因此在设置高度变成`auto`之后，也自然不会再有过渡动画了。  

所以此处可以修改为使用`transform: scale(1, 0);`来代替`height: 0;`，使用`transform: scale(1);`代替`height: auto;`，如此一来，就又能出现过渡动画了，[请看修改为`transform`后的DEMO](/rush/css3_transition_animation/diy/transition_scale.html)。  

再比如日常中最常使用的控制元素显示隐藏的代码是`display: block;`和`display: none;`，这也是不存在过渡动画的，因此，可以调整改为使用`opacity: 1;`和`opacity: 0;`来替换。  

### transition-timing-function  

description：设置对象中过渡的动画类型，通俗的理解就是设置在过渡过程中元素值的变化速度  
transition-timing-function:  `ease | linear | ease-in | ease-out | ease-in-out | step-start | step-end | steps(<integer>[, [ start | end ] ]?) | cubic-bezier(<number>, <number>, <number>, <number>)`  

#### 预设的五个时间曲线  

![transition_timing_function_0.jpg](/posts_assets/css3_transition_animation/transition_timing_function_0.jpg)  

上图展示了`transition-timing-function`设置为`ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`的运动状态图。图中表示的是相同时间间隔捕捉到的小球位置，可以看出，在小球越密集的地方，表示其运动速度越快；小球越稀疏的地方，表示其运动速度越慢。  

```css
.box {
    transition-property: transform;
    transition-duration: 2s;
}

.box1 { transition-timing-function: ease;}
.box2 { transition-timing-function: linear; }
.box3 { transition-timing-function: ease-in; }
.box4 { transition-timing-function: ease-out; }
.box5 { transition-timing-function: ease-in-out; }
```
运行效果[点击查看DEMO](/rush/css3_transition_animation/diy/ease.html)  

![transition_timing_function_1.jpg](/posts_assets/css3_transition_animation/transition_timing_function_1.jpg)  

#### 阶跃函数  
**steps(<integer>[, [ start | end ] ]?)**  
阶跃函数指定接收两个参数，第一个参数为正整数，指定阶跃函数的间隔数；第二个参数可选，值为`[ start | end ]`，为跃点，指定在每个间隔的起点或是终点发生阶跃变化，默认为`end`。  
`step-start`和`step-end`是`steps`函数的特殊形式：`step-start = steps(1, start)`，`step-end = steps(1, end)`  

![steps.jpg](/posts_assets/css3_transition_animation/steps.jpg)  
上图为一张`500*72`的雪碧图，其中有十个小企鹅，每个小企鹅`50*72`，连起来播放是一个挥手的动画。  
```css
.hello {
    width: 50px;
    height: 72px;
    background: url(steps.png) no-repeat 0 0;

    transition-duration: 3s;

    transition-timing-function: steps(3, start);

    transition-timing-function: steps(3, end);

    transition: background-position 1s steps(9);
}

.hello:hover {
    background-position: -450px 0;
}
```
代码中指定`.hello`的大小为一个小企鹅的尺寸，背景图片为上面的这张雪碧图，起始`background-position: 0px 0px;`，鼠标`hover`时`background-position`会过渡到`-450px 0`的位置，也就是最后一个小企鹅的左上角。这里设置了`steps(9)`，其中9是因为我们希望每次阶跃变化的大小是一个企鹅的宽度`50px`，从`0px 0px`过渡到`-450px 0`，状态一共需要阶跃9次。[点击查看DEMO](/rush/css3_transition_animation/diy/steps.html)  

接下去看下一个例子，区别一下第二个参数设置为`start`和`end`的不同之处  
```css
.box {
    width: 100px;
    transition-property: width;
    transition-duration: 3s;
}

.box:hover {
    width: 400px;
}

.box1 {
    transition-timing-function:  steps(3, start);
}

.box2 {
    transition-timing-function:  steps(3, end);
}
```
[点击查看DEMO](/rush/css3_transition_animation/diy/start_end.html)  

可以看到，`.box1`在鼠标`hover`的时候，他的宽度马上增加了`100px`,进入了第一阶段的状态，第三秒开始的时候，他的宽度已经达到了`400px`；而`.box2`在鼠标`hover`的时候，在第一秒始终停留在初始状态，直到第三秒末，宽度才变成`400px`。如下两张状态图：  

![steps_start.jpg](/posts_assets/css3_transition_animation/steps_start.jpg)  
`start`是在一个阶段开始之前就发生阶跃变化，整体过渡过程表现为跳过了初始状态。  

![steps_end.jpg](/posts_assets/css3_transition_animation/steps_end.jpg)  
`end`是在一个阶段结束的之后发生阶跃变化，整个过渡过程表现为跳过了最后的结束状态。  

#### 贝塞尔曲线函数
**cubic-bezier(< number >, < number >, < number >, < number >)**  
贝塞尔曲线函数接收四个参数，取值范围为[0,1]。之前介绍的 [预设的五个时间曲线](#预设的五个时间曲线) ，都可以转化为贝塞尔曲线的表达形式，如下所示：  
**ease:** `cubic-bezier(0.25, 0.1, 0.25, 1.0)`   
**linear:** `cubic-bezier(0.0, 0.0, 1.0, 1.0)`   
**ease-in:** `cubic-bezier(0.42, 0, 1.0, 1.0)`  
**ease-out:** `cubic-bezier(0, 0, 0.58, 1.0)`  
**ease-in-out:** `cubic-bezier(0.42, 0, 0.58, 1.0)`  

贝塞尔曲线函数，其实定义的是属性状态与时间的一个关系函数。如下坐标轴所示：  
![cubic_bezier.jpg](/posts_assets/css3_transition_animation/cubic_bezier.jpg)  

坐标轴中横坐标是时间，纵坐标是属性状态，最右上角的坐标是`(1,1)`。在时间曲线中的每一个点，表示的就是对应时刻下属性的取值，每个点的斜率表示的就是在这个时刻属性的变化速度，因此在时间曲线中斜率越小，也就是越平缓的地方，表示属性变化速度越慢；斜率越大，也就是越陡峭的地方，表示属性变化速度越快。如上图中开始跟结束的时候，斜率都比较小，而中间的阶段，斜率比较大，因此这个曲线表示的就是在变化过程中由慢到快再到慢的一个过程。  

贝塞尔曲线函数的四个参数，前两个是上图中红色点的坐标(x1,y1)，后两个是图中蓝色点的坐标(x2,y2)，也就是 **cubic-bezier(x1, y1, x2, y2)** 这样的形式。我们可以在 [http://cubic-bezier.com/](http://cubic-bezier.com/) 这个工具上来调整我们独特的贝塞尔曲线，通过拖拽红色跟蓝色点，可以形成不一样的贝塞尔曲线。我们发现，其实规定取值范围在[0,1]之间，针对的是x坐标，也就是时间，因为时间如果超过了这个范围，就会出现在同一个时刻对应了两个不同的属性状态，这个是没有意义的；而y坐标是可以超过这个范围的，如下我们通过拖拽两个点形成了这样一个曲线：  
![cubic_bezier_over.jpg](/posts_assets/css3_transition_animation/cubic_bezier_over.jpg)  
表示的是在过渡过程中属性值会超过终止状态的设定值然后在回到终点位置，表现为回弹的效果。  
又或者是这样：  
![cubic_bezier_back.jpg](/posts_assets/css3_transition_animation/cubic_bezier_back.jpg)  
表示在开始的时候会往回运动之后再过渡到终点位置。  
![cubic_bezier_preview.jpg](/posts_assets/css3_transition_animation/cubic_bezier_preview.jpg)    
因此我们可以通过拖拽两个点来实现不一样的动画效果，在右边窗口可以看到最上面展示了我们调整出来的贝塞尔曲线表达式，点击 **Preview & compare** 右边的 **GO!** 按钮，既可以查看我们调整出来的曲线运动情况，红色的为我们调整的曲线，蓝色的为对照曲线，可以点击 **Library** 下面的曲线来选择不一样的参照曲线。  

### transition-delay  

description：设置对象延迟过渡的时间  
transition-duration：`<time>`  

可以通过设置不一样的`transition-delay`来错开不同属性过渡的开始时间，呈现为按一定的顺序来开始过渡。  

### transition的不足  

* 在页面加载的时候不能触发，因为只有在属性值发生改变的时候才会触发过渡动画。  
* 动画不能重复播放，过渡动画只会播放一次。  
* 无法设置多种状态（keyframes只有from，to），只能从初始状态过渡到终止状态，无法再设置其他的状态。  
* transition规则作用的是单个属性的过渡状态，不能涉及多个属性，即使定义了`transition: all 1s ease 0s;`这样的规则，其对应的每个属性过渡动画也都是相互独立，相当于是定义了很多个`transition`规则，而每个`transition`只作用于一个属性。  

## animation  

description：设置对象所应用的动画特效。  
animation： `animation-name  ||  animation-duration  ||  animation-timing-function  ||  animation-delay  ||  animation-iteration-count  ||  animation-direction  ||  animation-fill-mode  ||  animation-play-state`  

### animation-name  

description：设置对象所应用的动画名称(`@keyframes`)  
animation-name：`none | <identifier>`  
default: `none`  

定义动画的写法如下：  
```css
@@keyframes identifier {
    from { /* css styles */ }
    20% { /* css styles */ }
    40% { /* css styles */ }
    to { /* css styles */ }
}
```
其中`from`等同于`0%`，`to`等同于`100%`。  

### animation-duration  

description：指定对象动画的持续时间  
transition-duration：`<time>`  

### animation-timing-function  

description：设置对象动画的过渡类型  

这里`animation-timing-function`的用法与 [transition-timing-function](#transition-timing-function) 类似，就不在多做介绍。  

```css
.box {
    transform: translate(0);
    animation-duration: 2s;
    animation-timing-function: ease;
}

.box1 { animation-name: move; }
.box2 { animation-name: anotherMove; }

@keyframes move {
    to { transform: translate(400px, 0); }
}

@keyframes anotherMove {
    50% { transform: translate(200px, 0); }
    to { transform: translate(400px, 0); }
}
```
上面的代码为两个`.box`指定不一样的`animation-name`：`move`动画让box从`translate(0)`运动到`translate(400px, 0)`，动画时间是`2s`；`anotherMove`动画让box第一秒从`translate(0)`运动到`translate(200px, 0)`，第二秒再从`translate(200px, 0)`运动到`translate(400px, 0)`，比较这两个动画是否相同？[点击查看DEMO演示](/rush/css3_transition_animation/diy/timingfunction.html)  

实际运行效果两个动画并不相同，他们的运动情况如下所示：  
![animation_timing_function.jpg](/posts_assets/css3_transition_animation/animation_timing_function.jpg)  

可以看到，**<font color="red">`animation-timing-function`作用的对象，其实是两个关键帧之间，而不是整个动画过程。</font>**  

### animation-delay  

description：指定对象动画延迟的时间  
transition-duration：`<time>`  

可以通过给每个动画设置不同的`animation-delay`来设置每个动画开始的时间，调整每个动画的播放顺序。  

```css
.box {
    animation: zoomInLeft .5s 1s backwards, shake .5s 1.5s;
}

@keyframes zoomInLeft {
    from {
        opacity: 0;
        transform: scale3d(.1, .1, .1) translate3d(-1000px, 0, 0);
        animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }
    60% {
        opacity: 1;
        transform: scale3d(.475, .475, .475) translate3d(10px, 0, 0);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
}

@keyframes shake {
    from, to {
        transform: translate3d(0, 0, 0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translate3d(-10px, 0, 0);
    }
    20%, 40%, 60%, 80% {
        transform: translate3d(10px, 0, 0);
    }
}
```

上面的代码为`.box`设定了两个动画，一个是`zoomInLeft`，控制让`.box`出现的动画；另一个是`shake`，控制`.box`的抖动动画。这里希望`shake`动画的播放在`zoomInLeft`动画之后，所以就要将`shake`动画的`animation-delay`设置为`zoomInLeft`动画的延迟时间加上动画时间，即：`shake.animation-delay = zoomInLeft.animation-delay + zoomInLeft.animation-duration;`。[点击查看动画效果](/rush/css3_transition_animation/diy/delay.html)  

### animation-iteration-count  

description：设置对象动画的循环次数  
animation-iteration-count：`infinite | <number>`  
default: `1`  

`animation-iteration-count`默认值是1，也就是只播放一次动画，这里可以设置一个正整数，表示你希望动画播放的次数，或者设置为`infinite`，表示无限循环。  

### animation-direction  

description：设置对象动画在循环中是否反向运动  
animation-direction：`normal | reverse | alternate | alternate-reverse`  
default: `normal`  

`normal`为正常模式，动画会从第一帧播放到最后一帧；`reverse`为反向模式，动画会倒着从最后一帧播放到第一帧；`alternate`设置动画先正向播放，第二次再从反向播放，如此交替；`alternate-reverse`则是先让动画反向播放，第二次再正向播放，如此交替。  

```css
.box {
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: 3;
}

div:hover .box {
    animation-name: move;
}

.box1 { animation-direction: normal; }
.box2 { animation-direction: reverse; }
.box3 { animation-direction: alternate; }
.box4 { animation-direction: alternate-reverse; }

@keyframes move {
    to { transform: translate(400px, 0); }
}
```

代码为四个box分别设置了不同的`animation-direction`，[点击查看代码运行效果](/rush/css3_transition_animation/diy/direction.html)  

从DEMO的运行效果中，可以总结出这四个不同值的区别表现为如下效果：  

![animation_direction.jpg](/posts_assets/css3_transition_animation/animation_direction.jpg)  

在一开始的DEMO中有一个 [模拟树叶飘落](/rush/css3_transition_animation/demo/leaves/index.html) 的动画，树叶除了匀速下落的动画之外，还有一个左右旋转的动画，来模拟左右飘动，左右旋转就是通过设置对象的`animation-direction: alternate`来实现的。

### animation-fill-mode  

description：设置对象动画时间之外的状态  
animation-fill-mode：`none | forwards | backwards | both`  
default: `none`  

`animation-fill-mode`属性用来设置对象动画之外的状态，动画之外的状态包括两个，一个是动画开始之前，一个是动画开始之后。`none`就是指定不设置动画之外的状态；`forwards`设置对象在动画结束之后停留在最后一帧的状态；`backwards`设置对象动画 **<font color="red">开始之前</font>** 停留在第一帧的状态；`both`是同时设置`forwards`和`backwards`。

```css
.box {
    animation: move 1s linear;
}

.box1 { animation-fill-mode: none; }
.box2 { animation-fill-mode: forwards; }
.box3 { animation-fill-mode: backwards; }
.box4 { animation-fill-mode: both; }

@keyframes move {
    to { transform: translate(400px, 0); }
}
```

[点击查看DEMO运行效果](/rush/css3_transition_animation/diy/fillmode.html)  

很多人不能理解`animation-fill-mode`属性各个值的区别，主要在于错误的理解了这个属性的含义，认为这个属性是用来设置动画结束之后的状态，于是就单单看了上面的这个 [DEMO](/rush/css3_transition_animation/diy/fillmode.html) ，发现完全无法区分`none`和`backwards`的区别，也无法区分`forwards`和`both`的区别，不能理解`both`同时设置`forwards`和`backwards`到底是什么意思。  

其实关键就在于没有理解`animation-fill-mode`属性设置的是对象动画之外的状态，不仅包括了动画结束的状态，还有动画开始前的状态。下面这个截图是W3C上对这四个值对解释：  
![animation_fill_mode_diff.jpg](/posts_assets/css3_transition_animation/animation_fill_mode_diff.jpg)  

理解完这四个属性对真正区别，再来看下面对这个DEMO就不会再搞混了。
```css
.box {
    transform: translate(200px, 0);

    animation: 2s linear 1s;
}

div:hover .box {
    animation-name: move;
}

.box1 { animation-fill-mode: none; }
.box2 { animation-fill-mode: forwards; }
.box3 { animation-fill-mode: backwards; }
.box4 { animation-fill-mode: both; }

@keyframes move {
    from { transform: translate(0, 0); }
    to { transform: translate(400px, 0); }
}
```
[点击查看DEMO运行效果](/rush/css3_transition_animation/diy/fillmodediff.html)  

### animation-play-state  

description：设置对象动画的状态  
animation-play-state：`running | paused`  
default: `running`  

可以通过`animation-play-state`来设置动画对运动和暂停，比如希望在鼠标`hover`的时候，让动画先停止下来，鼠标移开之后再继续播放，就可以通过设置`.element:hover { animation-play-state: paused; }`来实现就可以了。  

## 零JS实现的游戏机DEMO

到此就介绍完`transition`和`animation`两个属性的所有子属性各值的区别和用法了，接下去看一个完全用HTML和CSS3实现的一个游戏机DEMO：  
![game.jpg](/posts_assets/css3_transition_animation/game.jpg)  

[DEMO演示传送门](/rush/css3_transition_animation/demo/game/index.html)  

这个DEMO中的两个难点是如何划定人物移动的范围，还有就是在放开控制按钮的时候如何让人物停在当前位置。  

* 人物的上下左右移动，是使用的`margin-top`和`margin-left`属性的`transition`过渡来实现的，按下上下的时候，控制人物的`margin-top`到最上或最下的位置；按下左右的时候，控制人物的`margin-left`在最左或最右的位置，这样人物的移动就不会超过范围了。  
**注：这里不使用`transform`，是因为使用`translate`来控制人物左右位移的时候，还得同时维持他的`translateY`值；控制人物上下位移的时候，同样得维持他的`translateX`值。不使用`transform`来控制上下左右的位移，就是因为没法得知当前人物的`translateY`或`translateX`是多少。**  
* 放开控制按钮，让人物停留在当前位置，是因为在人物对象上设置了`transition-delay: 999999s;`，也就是让人物属性发生变化的时候会先delay 999999s之后才开始过渡，在点击按钮的时候，再重新设置人物对象的`transition`使得人物属性值变化没有delay。这样就能实现当放开控制按钮的时候，让人物 **看起来好像** 停留在当前的位置。  

## JS VS CSS3 Animation  

这里简单罗列几点JS动画和CSS3动画之间的优劣：  

* 功能涵盖面，JS比CSS3大  
    * 定义动画过程的@keyframes不支持递归定义，如果有多种类似的动画过程，需要调节多个参数来生成的话，将会有很大的冗余（比如jQuery Mobile的动画方案），而JS则天然可以以一套函数实现多个不同的动画过程  
    * 时间尺度上，@keyframes的动画粒度粗，而JS的动画粒度控制可以很细  
    * CSS3动画里被支持的时间函数非常少，不够灵活  
    * 以现有的接口，CSS3动画无法做到支持两个以上的状态转化  
* 实现/重构难度不一，CSS3比JS更简单，性能调优方向固定  
* 对于帧速表现不好的低版本浏览器，CSS3可以做到自然降级，而JS则需要撰写额外代码  
* CSS动画有天然事件支持（TransitionEnd、AnimationEnd，但是它们都需要针对浏览器加前缀），JS则需要自己写事件  
* CSS3有兼容性问题，而JS大多时候没有兼容性问题  

## Share  

最后分享几个CSS3动画库：  

* [Animate.css](https://daneden.github.io/animate.css/)  
* [Magic Animations](https://www.minimamente.com/example/magic_animations/)  
* [Bouncejs](http://bouncejs.com/)  
* [CSShake](http://elrumordelaluz.github.io/csshake/)  

## Ending ...  

终
