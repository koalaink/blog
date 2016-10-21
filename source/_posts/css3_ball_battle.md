---
title: CSS3 泡泡球
date: 2015-08-14 17:16:25
categories: [WEB,CSS]
tags: [css3,animation]
---

CSS3 实现的小球效果  

简单的进行边缘碰撞检测，小球碰撞边框后消失（从DOM 中remove ）。  

使用 A/D  控制发射器左右旋转，空格 发射小球。  

DEMO运行效果：[点击查看](/rush/150814/)  

<!--- more -->

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>H5 & CSS3 Rush!</title>
    <style>
        .control-panel {
            position: relative;
            width: 800px;
            height: 500px;
            margin: 80px auto 30px;
            border: 2px solid #666;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            -o-border-radius: 5px;
            border-radius: 5px;
            -webkit-box-shadow: 0 0 10px 4px #666;
            -moz-box-shadow: 0 0 10px 4px #666;
            -ms-box-shadow: 0 0 10px 4px #666;
            -o-box-shadow: 0 0 10px 4px #666;
            box-shadow: 0 0 10px 4px #666;
        }
        .ball {
            width: 60px;
            height: 60px;
            cursor: pointer;
            border: 2px solid #fff;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            -ms-border-radius: 50%;
            -o-border-radius: 50%;
            border-radius: 50%;
            -webkit-box-shadow: 0 0 10px 4px #fff inset;
            -moz-box-shadow: 0 0 10px 4px #fff inset;
            -ms-box-shadow: 0 0 10px 4px #fff inset;
            -o-box-shadow: 0 0 10px 4px #fff inset;
            box-shadow: 0 0 10px 4px #fff inset;
            background: -webkit-linear-gradient(top,#fff,#ace);
            background:    -moz-linear-gradient(top,#fff,#ace);
            background:     -ms-linear-gradient(top,#fff,#ace);
            background:      -o-linear-gradient(top,#fff,#ace);
            background:         linear-gradient(top,#fff,#ace);
        }
        .ball-hover {
            -webkit-box-shadow: 0 0 10px 4px #fff;
            -moz-box-shadow: 0 0 10px 4px #fff;
            -ms-box-shadow: 0 0 10px 4px #fff;
            -o-box-shadow: 0 0 10px 4px #fff;
            box-shadow: 0 0 10px 4px #fff;
        }
        .ball-bullet {
            position: absolute;
            z-index: -1;
            opacity: 1;
            transition: all 1.5s linear;
            -webkit-animation: burst 1s linear 1.5s forwards;
            -moz-animation: burst 1s linear 1.5s forwards;
            -ms-animation: burst 1s linear 1.5s forwards;
            -o-animation: burst 1s linear 1.5s forwards;
            animation: burst 1s linear 1.5s forwards;
        }
        @-webkit-keyframes burst {
            0% { opacity: 1;transform: scale(1); }
            100% { opacity: 0;transform: scale(1.8); }
        }
        @-moz-keyframes burst {
            0% { opacity: 1;transform: scale(1); }
            100% { opacity: 0;transform: scale(1.8); }
        }
        @-ms-keyframes burst {
            0% { opacity: 1;transform: scale(1); }
            100% { opacity: 0;transform: scale(1.8); }
        }
        @-o-keyframes burst {
            0% { opacity: 1;transform: scale(1); }
            100% { opacity: 0;transform: scale(1.8); }
        }
        @keyframes burst {
            0% { opacity: 1;transform: scale(1); }
            100% { opacity: 0;transform: scale(1.8); }
        }
        .ball-red {
            background: -webkit-linear-gradient(top,#fff,red);
            background:    -moz-linear-gradient(top,#fff,red);
            background:     -ms-linear-gradient(top,#fff,red);
            background:      -o-linear-gradient(top,#fff,red);
            background:         linear-gradient(top,#fff,red);
        }
        .ball-green {
            background: -webkit-linear-gradient(top,#fff,forestgreen);
            background:    -moz-linear-gradient(top,#fff,forestgreen);
            background:     -ms-linear-gradient(top,#fff,forestgreen);
            background:      -o-linear-gradient(top,#fff,forestgreen);
            background:         linear-gradient(top,#fff,forestgreen);
        }
        .ball-blue {
            background: -webkit-linear-gradient(top,#fff,#004c9b);
            background:    -moz-linear-gradient(top,#fff,#004c9b);
            background:     -ms-linear-gradient(top,#fff,#004c9b);
            background:      -o-linear-gradient(top,#fff,#004c9b);
            background:         linear-gradient(top,#fff,#004c9b);
        }
        .ball-purple {
            background: -webkit-linear-gradient(top,#fff,purple);
            background:    -moz-linear-gradient(top,#fff,purple);
            background:     -ms-linear-gradient(top,#fff,purple);
            background:      -o-linear-gradient(top,#fff,purple);
            background:         linear-gradient(top,#fff,purple);
        }
        .ball-yellow {
            background: -webkit-linear-gradient(top,#fff,yellow);
            background:    -moz-linear-gradient(top,#fff,yellow);
            background:     -ms-linear-gradient(top,#fff,yellow);
            background:      -o-linear-gradient(top,#fff,yellow);
            background:         linear-gradient(top,#fff,yellow);
        }
        .ball-gray {
            background: -webkit-linear-gradient(top,#fff,gray);
            background:    -moz-linear-gradient(top,#fff,gray);
            background:     -ms-linear-gradient(top,#fff,gray);
            background:      -o-linear-gradient(top,#fff,gray);
            background:         linear-gradient(top,#fff,gray);
        }
        .control-ball {
            position: absolute;
            display: block;
            left: 50%;
            bottom: 0;
            margin-left: -32px;
            z-index: 99;
        }
        .control-ball:hover {
            -webkit-box-shadow: 0 0 10px 4px #fff;
            -moz-box-shadow: 0 0 10px 4px #fff;
            -ms-box-shadow: 0 0 10px 4px #fff;
            -o-box-shadow: 0 0 10px 4px #fff;
            box-shadow: 0 0 10px 4px #fff;
        }
        .control-barrel {
            position: absolute;
            bottom: 30px;
            left: 50%;
            margin-left: -32px;
            width: 60px;
            height: 100px;
            border: 2px solid #fff;
            -webkit-box-shadow: 0 0 10px 4px #fff inset;
            -moz-box-shadow: 0 0 10px 4px #fff inset;
            -o-box-shadow: 0 0 10px 4px #fff inset;
            box-shadow: 0 0 10px 4px #fff inset;
            background: -webkit-linear-gradient(left,#fff,#ace);
            background:    -moz-linear-gradient(left,#fff,#ace);
            background:     -ms-linear-gradient(left,#fff,#ace);
            background:      -o-linear-gradient(left,#fff,#ace);
            background:         linear-gradient(left,#fff,#ace);
            -webkit-transform-origin: 32px 102px;
            -moz-transform-origin: 32px 102px;
            -ms-transform-origin: 32px 102px;
            -o-transform-origin: 32px 102px;
            transform-origin: 32px 102px;
            -webkit-transition: all .1s linear;
            -moz-transition: all .1s linear;
            -ms-transition: all .1s linear;
            -o-transition: all .1s linear;
            transition: all .1s linear;
        }
        .control-barrel::before {
            content: " ";
            position: absolute;
            top: -21px;
            left: -2px;
            display: block;
            width: 60px;
            height: 30px;
            border: 2px solid #fff;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            -ms-border-radius: 50%;
            -o-border-radius: 50%;
            border-radius: 50%;
            -webkit-box-shadow: 0 0 13px 0 #fff inset;
            -moz-box-shadow: 0 0 13px 0 #fff inset;
            -ms-box-shadow: 0 0 13px 0 #fff inset;
            -o-box-shadow: 0 0 13px 0 #fff inset;
            box-shadow: 0 0 13px 0 #fff inset;
            background: -webkit-linear-gradient(top,#333,#000,#333);
            background:    -moz-linear-gradient(top,#333,#000,#333);
            background:     -ms-linear-gradient(top,#333,#000,#333);
            background:      -o-linear-gradient(top,#333,#000,#333);
            background:         linear-gradient(top,#333,#000,#333);
        }
        .control-barrel,
        .next-balls {
            z-index: -1;
        }
        .barrel-ready {
            width: 64px;
            height: 80px;
            margin-left: -34px;
            -webkit-transform-origin: 34px 84px;
            -moz-transform-origin: 34px 84px;
            -ms-transform-origin: 34px 84px;
            -o-transform-origin: 34px 84px;
            transform-origin: 34px 84px;
        }
        .barrel-ready::before {
            width: 64px;
        }
    </style>
</head>
<body>
<div class="content">
    <div class="control-panel" id="control-panel">
        <div class="ball control-ball" id="control-ball"></div>
        <div class="control-barrel" id="control-barrel"></div>
    </div>
</div>
</body>
<script type="text/javascript" src="./js/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="./js/main.js"></script>
</html>
```

```javascript
$(document).ready(function(){
    var ox = 402,
        oy = 474,
        sx = 1,
        sy = 1,
        sin= 0,
        cos= 1,
        angle = 0,
        k=cos/sin,
        canShoot = false,
        leftDown = false,
        rightDown = false,
        blankDown = false,
        blankUp = false,
        controlBall = $("#control-ball"),
        controlPanel = $("#control-panel"),
        controlBarrel = $("#control-barrel");

    var colorArr = ["red","green","blue","purple","yellow","gray"];
    var colorNum = colorArr.length;

    var nextSize = 6;
    var nextArr = new Array(nextSize+1);

    var cur=0;
    for(cur=0;cur<nextSize;++cur){
        nextArr[cur] = colorArr[Math.floor(Math.random()*colorNum)];
    }

    cur=nextSize;

    controlBall.addClass("ball-"+nextArr[cur]);

    $(document).bind("keydown",function(e){
        //alert(e.keyCode);
        if(e.keyCode == 32 ){
            blankDown = true;
            blankUp = false;
        }

        if(e.keyCode == 65 ){
            leftDown = true;
            rightDown = false;
        }

        if(e.keyCode == 68 ){
            rightDown = true;
            leftDown = false;
        }

        if(blankDown){
            shootReady();
        }
    });

    $(document).bind("keyup",function(e){

        if(e.keyCode == 32 ){
            blankDown = false;
            blankUp = true;controlBarrel
        }

        if(e.keyCode == 65 ){
            leftDown = false;
        }

        if(e.keyCode == 68 ){
            rightDown = false;
        }

        if(blankUp){
            shoot();
            shootEnd();
        }
    });

    setInterval(function(){

        if(leftDown){
            angle -= 5;
            if(angle<=-90){ angle=-90;}
            sin = Math.sin(angle*Math.PI/180);
            cos = Math.sqrt(1-Math.pow(sin,2));
            k = cos/sin;
            controlBarrel.css("transform","rotate("+angle+"deg)");
        }
        else if(rightDown){
            angle += 5;
            if(angle>=90){ angle=90;}
            sin = Math.sin(angle*Math.PI/180);
            cos = Math.sqrt(1-Math.pow(sin,2));
            k = cos/sin;
            controlBarrel.css("transform","rotate("+angle+"deg)");
        }

    },100);

    function shootReady(){
        canShoot = true;
        controlBall.addClass("ball-hover");
        controlBarrel.addClass("barrel-ready");
        controlBarrel.css("transform","rotate("+angle+"deg)");
    }

    function shootEnd(){
        sx = 1;
        sy = 1;
        controlBall.removeClass("ball-hover");
        controlBarrel.removeClass("barrel-ready");
        controlBarrel.css("transform","rotate("+angle+"deg)");
    }

    function shoot(){
        if(!canShoot) return ;
        var bullet = $("<div></div>");
        bullet.addClass("ball ball-bullet ball-"+nextArr[cur]);
        bullet.css("top","100%");
        bullet.css("left","50%");
        bullet.css("margin-left",100*sin-32);
        bullet.css("margin-top",-64-100*cos);
        controlPanel.append(bullet);
        var ty = 32;
        var tx = ox+(oy-ty)/k;
        if(tx>772){
            tx = 772;
            ty = oy-(tx-ox)*k;
        }
        else if(tx<32){
            tx = 32;
            ty = oy-(tx-ox)*k;
        }
        //bullet.css("margin-bottom",-ty);
        setTimeout(function(){
            bullet.css("top",ty-32);
            bullet.css("left",tx-32);
            bullet.css("margin",0);
        },30);
        setTimeout(function(){bullet.remove()},3000);
        canShoot = false;
        controlBall.removeClass("ball-"+nextArr[cur]);
        nextArr[cur] = colorArr[Math.floor(Math.random()*colorNum)];
        cur = (cur+1)%nextSize;
        controlBall.addClass("ball-"+nextArr[cur]);
    }

});
```
