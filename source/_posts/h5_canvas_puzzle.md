---
title: H5 CANVAS 拼图游戏
date: 2015-10-13 20:10:02
categories: [WEB,HTML]
tags: [H5,canvas,JS]
---

移动端拼图小游戏  

可设置拼图面板块数row \*col  

设置单次拼图游戏时间  

DEMO运行效果：[点击查看](/rush/151013/)  

<!-- more -->
## HTML代码  
```html
<div class="timer">
<span class="first">剩余时间</span><span class="progress-bar"><i id="progressBar"></i></span><span id="remainTime">20.00秒</span>
</div>
<div class="puzzle" id="puzzle">

</div><div class="start-btn" id="start">开始游戏</div>
```

## CSS代码
```css
.timer {
    position: absolute;
    top: 22.9%;
    width: 100%;
    height: 3.165%;
    text-align: center;
    color: #691c14;
}

.timer span {
    display: block;
    float: left;
    margin-right: 1.94%;
    font-size: 1.25rem;
    line-height: 1.7rem;
}

.timer .first {
    margin-left: 11.94%;
}

.timer .progress-bar {
    display: block;
    width: 42.4%;
    height: 38.2%;
    margin-top: 1.3%;
    background-color: #38110d;
}

.progress-bar i {
    display: block;
    height: 100%;
    max-width: 100%;
    width: 0;
    background: url(../img/progressbarbg.jpg) repeat-x;
    background-size: 1px 100%;
}

.puzzle {
    position: absolute;
    top: 27.04%;
    left: 10.65%;
    width: 78.89%;
    height: 49.02%;
}

.puzzle .img-block {
    position: absolute;
    cursor: move;
    background: url(../img/img.jpg) no-repeat;
}

.start-btn {
    position: absolute;
    top: 86%;
    left: 32%;
    width: 38.8%;
    height: 7.54%;
    border: 0;
    background: url(../img/startbg.png) no-repeat transparent;
    background-size: 100%;
    cursor: pointer;

    font-size: 1.6rem;
    line-height: 3.81rem;
    font-weight: bold;
    text-align: center;
    color: #fff;
}
```

## JS代码  
```javascript
<script type="text/javascript" src="js/puzzle.js"></script>
<script type="text/javascript">
var puzzle = $("#puzzle").puzzle({
    row : 4,
    col : 4,
    time : 20
});

$(window).on("resize",function(){
    puzzle.puzzle("resize");
});
</script>
```

## 拼图JS插件源码  
```javascript
(function($){

    var Puzzle, privateMethod;

    Puzzle = (function(){

        function Puzzle(element, options){

            var that = this;

            that.el = $(element);

            that.btn = $("#start");

            this.progressBar = $("#progressBar");

            this.remainTime = $("#remainTime");

            that.options = $.extend({}, $.fn.puzzle.defaults, options);

            that.init();

        }

        /* 交换数组下标 i 与 j 的值 */
        Array.prototype.swap = function(i,j){
            var tmp = this[i];
            this[i] = this[j];
            this[j] = tmp;
            return this;
        };

        Array.prototype.indexOf = function(val){
            var i,l=this.length;
            for(i=0;i<l;++i) if(this[i] === val) return i;
                return -1;
        }

        Puzzle.prototype = {
            init : function(){

                var that = this,
                    side = that.el.width(),
                    i,j,curIndex,pos;

                that.offset = that.el.offset();

                /* 图块边距 */
                that.blockMargin = side*.01;

                /* 图块宽高 */
                that.blockWidth = (side-that.blockMargin*(that.options.col-1))/that.options.col;
                that.blockHeight = (side-that.blockMargin*(that.options.row-1))/that.options.row;

                that.pos = [];      //  图块坐标
                that.order = [];    //  图块顺序
                that.block = [];    //  图块

                /* 图块总数 */
                that.num = that.options.row * that.options.col;

                /* 初始化图块信息 */
                for(i=0;i<that.options.row;++i){
                    for(j=0;j<that.options.col;++j){
                        curIndex = i*that.options.col+j;

                        that.pos[curIndex] = {
                            x : j*(that.blockWidth+that.blockMargin),
                            y : i*(that.blockHeight+that.blockMargin)
                        };

                        that.block.push($("<div>"));
                        that.block[curIndex].css({width: that.blockWidth, height: that.blockHeight, "background-size": side+"px,"+side+"px", "background-position-x": -that.pos[curIndex].x, "background-position-y": -that.pos[curIndex].y}).addClass("img-block");
                        that.el.append(that.block[curIndex]);

                        that.order[curIndex] = curIndex;

                    }
                }

                /* 定位图块 */
                that.locate();

                this.playtime = 0;
                that.refreshTime();

                this.playing = false;

                that.btn.on("click tap",function(){
                    that.start();
                });

            },
            /* 窗体大小变化 */
            resize : function(){
                var that = this,
                    side = that.el.width(),
                    i,j,curIndex,pos;

                that.offset = that.el.offset();

                /* 图块边距 */
                that.blockMargin = side*.01;

                /* 图块宽高 */
                that.blockWidth = (side-that.blockMargin*(that.options.col-1))/that.options.col;
                that.blockHeight = (side-that.blockMargin*(that.options.row-1))/that.options.row;

                that.pos = [];      //  图块坐标

                /* 初始化图块信息 */
                for(i=0;i<that.options.row;++i){
                    for(j=0;j<that.options.col;++j){
                        curIndex = i*that.options.col+j;

                        that.pos[curIndex] = {
                            x : j*(that.blockWidth+that.blockMargin),
                            y : i*(that.blockHeight+that.blockMargin)
                        };

                        that.block[curIndex].css({width: that.blockWidth, height: that.blockHeight, "background-size": side+"px,"+side+"px", "background-position-x": -that.pos[curIndex].x, "background-position-y": -that.pos[curIndex].y}).addClass("img-block");
                        that.el.append(that.block[curIndex]);

                    }
                }

                /* 定位图块 */
                that.locate();

            },
            /* 根据 that.order 数组中的序列对各图块进行定位 */
            locate : function(){

                var that = this,
                    i,j,curIndex;
                for(i=0;i<that.options.row;++i) for(j=0;j<that.options.col;++j){
                        curIndex = i*that.options.col+j;
                        that.block[that.order[curIndex]].css({top: that.pos[curIndex].y, left: that.pos[curIndex].x});
                }

            },
            /* 开始游戏 */
            start : function(){

                if(this.playing) return;

                this.playing = true;

                this.playtime = 0;

                for(var i=0;i<this.num;++i){
                    this.dragBlock(this.block[i]);
                }

                this.order.sort(privateMethod.randomSort);

                this.locate();

                this.play();

            },
            refreshTime : function(){

                this.progressBar.css("width",(this.playtime/this.options.playtime)*100+"%");

                this.remainTime.text((this.options.playtime-this.playtime).toFixed(2)+"秒");

            },
            play : function(){
                var that = this;

                if(that.playtime >= that.options.playtime){

                    that.playtime = that.options.playtime;

                    clearTimeout(that.timer);

                    that.playing = false;

                    that.refreshTime();

                    that.alertInfo("Time out!");

                    return;
                }

                that.refreshTime();

                that.playtime += .01;

                that.timer = setTimeout(function(){

                    that.play();

                },10);

            },
            dragBlock : function(block){
                var that = this,
                    offset = block.offset();

                block.on("touchstart",function(event){

                    event.preventDefault();

                    var touch = event.touches[0],
                        disX = touch.pageX - block.offset().left,
                        disY = touch.pageY - block.offset().top;
                    block.css("z-index",2);

                    block.on("touchmove",function(event){

                        var touch = event.touches[0],
                            l = touch.pageX-that.offset.left-disX,
                            t = touch.pageY-that.offset.top-disY;

                        block.css({top: t, left: l});

                    });

                    block.on("touchend",function(event){

                        that.updateOrder(block.index());

                        block.off("touchmove");
                        block.off("touchend");

                    });

                });

            },
            unDragBlock : function(block){
                block.off("touchstart");
            },
            updateOrder : function(index){
                var that = this,
                    ox = that.block[index].offset().left+that.blockWidth/2,
                    oy = that.block[index].offset().top+that.blockHeight/2,
                    ex,ey,i,
                    to = -1;

                for(i=0;i<that.num;++i){
                    if(i === index) continue;
                    ex = that.block[i].offset().left;
                    ey = that.block[i].offset().top;
                    if(ox>ex&&ox<ex+that.blockWidth&&oy>ey&&oy<ey+that.blockHeight){
                        to = i;
                        break;
                    }
                }

                if(to === -1){
                    that.move(that.block[index],that.order.indexOf(index));
                }
                else {
                    ox = that.order.indexOf(index);
                    ex = that.order.indexOf(to);
                    that.block[to].css("z-index",1);
                    that.move(that.block[index],ex);
                    that.move(that.block[to],ox);
                    that.order.swap(ox,ex);

                    that.block[index].css("z-index",0);
                    that.block[to].css("z-index",0);

                    if(that.isSuccess()){

                        clearTimeout(that.timer);

                        for(i=0;i<that.num;++i){
                            that.unDragBlock(that.block[i]);
                        }

                        setTimeout(function(){

                            that.playing = false;

                            that.alertInfo("Done!");

                        },100);

                    }
                }
            },
            move : function(obj, index){
                obj.css({top: this.pos[index].y, left: this.pos[index].x});
            },
            isSuccess : function(){
                var i;
                for(i=0;i<this.num;++i){
                    if(this.order[i] !== i)
                        return false;
                }
                return true;
            },
            alertInfo : function(info){
                alert(info);
            }
        };

        return Puzzle;

    })();

    privateMethod = {
        /* 在数组arr中查找第一个值为val的下标，未找到返回-1 */
        indexOf : function(arr, val){
            var l = arr.length,i;
            for(i=0;i<l;++i) if(arr[i]===val) return i;
            return -1;
        },
        /* 数组随机排序 */
        randomSort : function(){
            return 0.5 - Math.random();
        }
    };

    $.fn.puzzle = function(options){

        return this.each(function(){
            var that = $(this),
                instance = $.fn.puzzle.lookup[that.data("puzzle")];

            if(!instance){

                instance = new Puzzle(that, options);

                $.fn.puzzle.lookup[++$.fn.puzzle.lookup.i] = instance;

                that.data("puzzle", $.fn.puzzle.lookup.i)

            }

            if(typeof options === "string"){
                instance[options]();
            }

        });
    };

    $.fn.puzzle.lookup = {
        i : 0
    };

    $.fn.puzzle.defaults = {
        row : 3,        // 行数
        col : 3,        // 列数
        playtime : 20   // 单轮拼图时间 单位 s
    };
})(Zepto);
```
