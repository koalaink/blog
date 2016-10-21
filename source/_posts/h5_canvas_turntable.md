---
title: H5 CANVAS 幸运转盘
date: 2015-09-18 18:02:05
categories: [WEB,HTML]
tags: [H5,canvas,JS]
---

使用H5 的canvas 绘制的一个转盘  

能够配置转盘的格数，每格的图片以及文本内容  

点击开始 旋转转盘，结束后弹出结果  

DEMO运行效果：[点击查看](/rush/150918/)  

<!-- more -->
## HTML代码  
```html
<div class="turntable">
    <div class="turntable-content">
        <canvas id="turntable-face" class="turntable-face"></canvas>
        <canvas id="turntable-pointer" class="turntable-pointer"></canvas>
        <div id="turntable-btn" class="turntable-btn"></div>
        <img src="img/gift.png" id="turntableGift" style="display: none;"/>
        <img src="img/smile.png" id="turntableSmile" style="display: none;"/>
        <img src="img/pointer.png" id="turntablePointer" style="display: none;"/>
    </div>
</div>
```

## CSS代码  
```css
.turntable {
    position: absolute;
    top: 80px;
    left: 30px;
    width: 500px;
}

.turntable .turntable-content {
    position: relative;
    width: 100%;
}

.turntable-content canvas {
    position: absolute;
}

.turntable-content .turntable-face {
    top: 0;
    left: 0;
}

.turntable-content .turntable-pointer {
    top: 33.435%;
    left: 38.82%;

    /*width: 22.358%;
    height: 27.744%;*/

}

.turntable-content .turntable-btn {
    position: absolute;
    top: 38.82%;
    left: 38.82%;
    width: 22.358%;
    height: 22.358%;
    cursor: pointer;
}

.turntable-btn {

    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -moz-tap-highlight-color: rgba(0,0,0,0);
    -ms-tap-highlight-color: rgba(0,0,0,0);
    -o-tap-highlight-color: rgba(0,0,0,0);
    tap-highlight-color: rgba(0,0,0,0);


    -webkit-tap-highlight-color:transparent;
    -moz-tap-highlight-color:transparent;
    -ms-tap-highlight-color:transparent;
    -o-tap-highlight-color:transparent;
    tap-highlight-color:transparent;

}

.turntable-face.rotating  {
    -webkit-animation: rotating .8s ease-in infinite;
    -moz-animation: rotating .8s ease-in infinite;
    -ms-animation: rotating .8s ease-in infinite;
    -o-animation: rotating .8s ease-in infinite;
    animation: rotating .8s ease-in infinite;
}

@-webkit-keyframes rotating {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@-moz-keyframes rotating {
    0% { -moz-transform: rotate(0deg); }
    100% { -moz-transform: rotate(360deg); }
}

@-ms-keyframes rotating {
    0% { -ms-transform: rotate(0deg); }
    100% { -ms-transform: rotate(360deg); }
}

@-o-keyframes rotating {
    0% { -o-transform: rotate(0deg); }
    100% { -o-transform: rotate(360deg); }
}

@keyframes rotating {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.turntable-face.rotateTo {
    -webkit-animation: rotateto 5s ease-out backwards;
    -moz-animation: rotateto 5s ease-out backwards;
    -ms-animation: rotateto 5s ease-out backwards;
    -o-animation: rotateto 5s ease-out backwards;
    animation: rotateto 5s ease-out backwards;
}

@-webkit-keyframes rotateto {
    0% { -webkit-transform: rotate(0deg); }
}

@-moz-keyframes rotateto {
    0% { -moz-transform: rotate(0deg); }
}

@-ms-keyframes rotateto {
    0% { -ms-transform: rotate(0deg); }
}

@-o-keyframes rotateto {
    0% { -o-transform: rotate(0deg); }
}
@keyframes rotateto {
    0% { transform: rotate(0deg); }
}
```

## JS代码  
```javascript
<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="js/turntable-1.2.0.js"></script>
<script type="text/javascript">
    var items = [
        {
            text : "谢谢参与",
            img : "smile"
        },
        {
            text : "100M",
            img : "gift"
        },
        {
            text : "谢谢参与",
            img : "smile"
        },
        {
            text : "200M",
            img : "gift"
        },
        {
            text : "谢谢参与",
            img : "smile"
        },
        {
            text : "50M",
            img : "gift"
        },
        {
            text : "谢谢参与",
            img : "smile"
        },
        {
            text : "100M",
            img : "gift"
        }
    ],turntable;

    window.onload = function(){
        turntable = $(".turntable-content").turntable({
            items : items
        }).data("turntable");
        turntable = $.fn.turntable.lookup[turntable];
    };

    $(window).on("resize",function(){
        turntable.init();
    });

</script>
```

## 转盘JS插件源码  
```javascript
(function($){

    var Turntable, privateMethod;

    Turntable = (function(){

        function Turntable(element, options){

            /* extend options */
            this.settings = $.extend({}, $.fn.turntable.defaults, options);

            this.el = $(element);

            //console.log((new Date()).getTime());

            this.init();

            //console.log((new Date()).getTime());
        }

        Turntable.prototype = {
            PI : Math.PI,
            init : function(){

                var cxt = this.initElement();

                this.renderCanvas(cxt.face,cxt.pointer);

                this.startTurntable();

            },
            initElement : function(){

                var width = this.el.width();

                this.el.height(width);

                this.faceCanvas = this.el.children(".turntable-face");

                var cxt = {
                    face : this.faceCanvas.attr({width: width, height: width})[0].getContext("2d"),
                    pointer : this.el.children(".turntable-pointer").attr({width: width*.2236, height: width*.2774})[0].getContext("2d")
                };

                this.images = {
                    gift : document.getElementById("turntableGift"),
                    smile :document.getElementById("turntableSmile"),
                    pointer :document.getElementById("turntablePointer")
                };

                return cxt;
            },
            renderCanvas : function(face,pointer){

                var radius = this.el.width()/ 2,
                    r1 = radius*.91,r2,
                    w1 = radius*.06,
                    baseAngle = this.PI/18,
                    i, j,linear,
                    len = this.settings.items.length,
                    imgWidth = radius*.154,
                    imgHeight = radius*.189;

                face.clearRect(0,0,radius*2,radius*2);
                /* 外圈 */
                face.translate(radius,radius);

                face.save();

                face.arc(0,0,r1,0,this.PI*2);

                face.lineWidth = w1;
                face.shadowBlur = w1;
                face.shadowColor = "#691c14";
                face.strokeStyle = "#691c14";
                face.stroke();

                /* 边框小灯 */
                w1 = radius*.015;
                face.shadowBlur = w1;
                face.shadowColor = "#fecb02";
                face.fillStyle = "#fecb02";

                for(i=j=0;i<36;++i,j+=baseAngle){
                    face.beginPath();
                    face.arc(r1*Math.sin(j),-r1*Math.cos(j),w1,0,this.PI*2);
                    face.fill();
                }

                /* 内圈 */
                r1 = radius*.87;
                w1 = radius*.02;
                face.beginPath();
                face.arc(0,0,r1,0,this.PI*2);

                face.shadowBlur = 0;
                face.lineWidth = w1;
                face.strokeStyle = "#fc5d01";
                face.stroke();

                /* 内圆 */
                r1 = radius*.86;
                face.beginPath();
                face.arc(0,0,r1,0,this.PI*2);

                linear = face.createRadialGradient(0,0,0,0,0,r1);
                linear.addColorStop(0,"#ffd267");
                linear.addColorStop(1,"#fdc236");
                face.fillStyle = linear;
                face.fill();

                /* 内圈分割 */
                baseAngle = this.PI*2/len;
                linear = face.createRadialGradient(0,0,0,0,0,r1);
                linear.addColorStop(0,"#ffd13d");
                linear.addColorStop(1,"#ff9c01");
                face.fillStyle = linear;
                for(i=0,j=baseAngle;i<len;++i,j+=baseAngle){
                    if(i&1) continue;

                    face.beginPath();
                    face.arc(0,0,r1,j,j+baseAngle);
                    face.lineTo(0,0);
                    face.closePath();

                    face.fill();
                }

                /* 块分割线 */
                face.lineWidth = radius*.004;
                face.strokeStyle = "#fc5d01";

                face.beginPath();
                for(i=j=0;i<len;++i,j+=baseAngle){
                    face.moveTo(0,0);
                    face.lineTo(r1*Math.sin(j),-r1*Math.cos(j));
                }

                face.stroke();

                /* 块信息 */
                r1 = radius*.805;
                r2 = radius*.571;

                face.restore();
                face.save();
                face.font = r2*.35*Math.tan(baseAngle/2)+"px Helvetica";
                face.textBaseline = "top";
                face.textAlign = "center";
                face.fillStyle = "#691c14";
                face.rotate(-baseAngle/2);
                for(i=0;i<len;++i){
                    face.rotate(baseAngle);
                    if(this.settings.items[i].img === "gift"){
                        this.images.gift.onload = function(){
                            face.drawImage(this,-imgWidth/2,-r1,imgWidth,imgHeight);
                        };
                        face.drawImage(this.images.gift,-imgWidth/2,-r1,imgWidth,imgHeight);
                    }
                    else if(this.settings.items[i].img === "smile") {
                        this.images.smile.onload = function(){
                            face.drawImage(this,-imgWidth/2,-r1,imgWidth,imgWidth);
                        };
                        face.drawImage(this.images.smile,-imgWidth/2,-r1,imgWidth,imgWidth);
                    }
                    face.fillText(this.settings.items[i].text,0,-r2);
                }

                /* 指针 */
                r1 = radius * .4472;
                r2 = radius * .5548;
                this.images.pointer.onload = function(){
                    pointer.drawImage(this,0,0,r1,r2);
                };
                pointer.drawImage(this.images.pointer,0,0,r1,r2)
            },
            startTurntable : function(){

                var $this = this;

                $this.btn = this.el.children("#turntable-btn");

                $this.isRotating = false;

                $this.btn.on("click tap",function(){

                    if($this.isRotating) return;

                    $this.rotate();
                });

            },
            rotate : function(){

                if(this.isRotating) return;

                var $this = this;

                $this.isRotating = true;

                $this.faceCanvas.addClass("rotating");

                setTimeout(function(){

                    $this.rotateTo();

                },800);

            },
            rotateTo : function(num){

                var $this = this;

                if(!$this.faceCanvas.hasClass("rotating")) return;

                isNaN(num) && (num =privateMethod.randRange(0,$this.settings.items.length));

                var deg = 360*(privateMethod.randRange(6,8) - (num+.5)/$this.settings.items.length),msg;

                $this.faceCanvas.removeClass("rotating").css({
                    "-webkit-transform" : "rotate("+deg+"deg)",
                       "-moz-transform" : "rotate("+deg+"deg)",
                        "-ms-transform" : "rotate("+deg+"deg)",
                         "-o-transform" : "rotate("+deg+"deg)",
                            "transform" : "rotate("+deg+"deg)"
                }).addClass("rotateTo");

                setTimeout(function(){

                    alert("image: "+$this.settings.items[num].img+" text:"+$this.settings.items[num].text);

                    $this.faceCanvas.removeClass("rotateTo");

                    $this.isRotating = false;

                },5200);

            },
            pointTo : function(num){
                var $this = this;

                if(!$this.faceCanvas.hasClass("rotating")) return;

                isNaN(num) && (num =privateMethod.randRange(0,$this.settings.items.length));

                var deg = -360*(num+.5)/$this.settings.items.length;

                $this.faceCanvas.css({
                    "-webkit-transform" : "rotate("+deg+"deg)",
                       "-moz-transform" : "rotate("+deg+"deg)",
                        "-ms-transform" : "rotate("+deg+"deg)",
                         "-o-transform" : "rotate("+deg+"deg)",
                            "transform" : "rotate("+deg+"deg)"
                });
            }
        };

        return Turntable;
    })();

    privateMethod = {
        drawImage : function(img,callback){
            if( img.complete ){
                callback.call(img);
                return;
            }

            img.onload = function(){
                callback.call(img);
            }
        },
        randRange : function(min,max){
            return Math.floor(this.rand()*(max-min)+min);
        },
        rand : function(){
            var s = (new Date()).getTime();
            s = ( s * 9301 + 49297 ) % 233280;
            return s / ( 233280.0 );
        }
    };

    $.fn.turntable = function(options){

        return this.each(function () {
            var me = $(this),
                instance = $.fn.turntable.lookup[me.data("turntable")];

            if(!instance){
                $.fn.turntable.lookup[++$.fn.turntable.lookup.i] = new Turntable(me,options);
                me.data("turntable", $.fn.turntable.lookup.i);
                instance = $.fn.turntable.lookup[me.data('turntable')];
            }

            if(typeof options === "string"){
                instance[options]();
            }

        });

    };

    $.fn.turntable.lookup = {
        i: 0
    };

    $.fn.turntable.defaults = {

    };
})(Zepto);
```
