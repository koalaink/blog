---
title: 停留曝光
date: 2017-3-22 10:46:43
categories: [WEB,JS]
tags: [JS,plugin,exposure]
---

## 应用背景  

应BI要求，对于推荐商品的上报，需要做停留曝光，也就是当推荐商品出现在视窗中时，才可以进行数据上报，即与图片懒加载的加载时机相同。  
此插件可适用于：停留曝光、图片懒加载、翻页加载等。

## 实现要点  

停留曝光的实现关键点在于，如何判断商品出现在视窗中。我们可以通过判断滚动速度，来判断页面是否停留（当用户以很慢的速度滚动浏览页面时，也应该算曝光；但是如果是快速滑过，则不算曝光）。

## 使用说明  

### 配置参数  

| 参数字段    | 参数类型    | 参数描述                                            | 备注  |
| ---------- |:---------:| --------------------------------------------------:| |
| selector   | string    | 曝光元素选择器 | |
| speed      | number    | 页面滚动阀值，即当页面滚动速度等于此值时，则认定为元素曝光 | |
| autoClear  | boolean   | 当所有元素都曝光过(至少一次)后，是否自动清除事件监听 | &nbsp;|

### 钩子函数  

| 参数字段    | 参数类型    | 参数描述                                            | 备注  |
| ---------- |:---------:| --------------------------------------------------:| |
| onExposure   | 当有元素曝光时    | 曝光元素数组 | 元素重复曝光，会重复执行 |
| onFirstExposure | 当有元素首次曝光时    | 曝光元素数组 | 元素首次曝光后，不再执行此钩子函数 |
| onAllExposured  | 当所有元素都曝光过(至少一次)时   | 曝光元素数组 | &nbsp;|

### DEMO  

```javascript
var exposure = new Exposure({
  selector: '.selector',
  speed: 20,
  autoClear: true,
  onExposure: function(targets){
    console.log('targets exposured:', targets);
  },
  onFirstExposure: function(targets){
    console.log('targets first exposured:', targets);
  },
  onAllExposured: function(){
    console.log('all the targets are exposured.');
  },
});
```

## 用法举例  

### 停留曝光  

通过此插件，就可以很轻松的实现之前描述的停留曝光的需求了，代码如下：  

```javascript
// 停留曝光 上报
// 只需要在 onFirstExposure 中进行上报即可
var exposure = new Exposure({
  selector: '.recommend-item',
  speed: 20,
  onFirstExposure: function(targets){
    var items = [];
    for(var i = 0; i < targets.length; ++i){
      items.push(targets[i].getAttribute('item-id'));
    }
    // 上报
    spider.trackAction({
      actionName: "recommend-exposure",
      actionArgs: {
        "items": items.join(',')
      }
    });
  }
});
```

### 图片懒加载  

因为此插件工作机制类似图片懒加载功能，因此也可以用来实现图片懒加载，如下：  

```javascript
// 图片懒加载
var exposure = new Exposure({
  selector: '.recommend-item',
  speed: 20,
  onFirstExposure: function(targets){
    var items = [];
    for(var i = 0; i < targets.length; ++i){
      // 图片懒加载
      var img = $(targets[i]).find('img');
      img.attr('src', img.attr('data-src'));
    }
  }
});
```

### 翻页加载  

如果保证页面从顶部开始加载，可以将speed设置为一个很大的值，那么当所有的元素都曝光过的时候，就可以粗略的断定页面滚动到底部了，因此可以在 onAllExposured 回调中进行翻页加载，大致如下：  

```javascript

var isLoading = false,
    hasNext = true;
function loadPage(){
  // do something here ...
}
var exposure = new Exposure({
  selector: '.selector',
  speed: 9999, // 将滚动阀值设置为一个大值
  autoClear: false, // 所有元素都曝光后不清除事件
  onAllExposured: function(){
    if(isLoading) return;
    if(!hasNext){
      exposure.clear();
    }
    isLoading = true;
    loadPage();
  },
});
```

## 插件源码  

最后，贴上插件代码：  

```javascript
/**
 * 停留曝光 by daihuibin 2017/3/21
 *
 * var exposure = new Exposure({
 *   selector: 'selector', // 曝光元素的选择器
 *   speed: 20, // 滚屏速度阀值 滚动速度小于此值则也认定为曝光
 *   autoClear: true, // 在所有元素都曝光过之后，自动清除事件监听
 *   onExposure: function(targets){}, // 元素曝光回调 传入当前曝光的元素数组
 *   onFirstExposure: function(targets){}, // 元素首次曝光回调 传入当前首次曝光的元素数组
 *   onAllExposured: function(){}, // 所有元素都曝光过执行回调
 * });
 */
define(function(require, exports, module){
    var Exposure = (function(){

    var DEF = {
      selector: '',
      speed: 20,
      autoClear: true,
      onExposure: function(targets){},
      onFirstExposure: function(targets){},
      onAllExposured: function(){}
    };

    function Exposure(ops){
      this.ops = $.extend({}, DEF, ops);

      this.init();
    }

    Exposure.prototype = {
      targetCanExposure: function(target){
        var rect = target.getBoundingClientRect(),
            vpHeight = document.head.parentNode.clientHeight;
        // 定义元素超过一半内容展示在窗口即为曝光
        if(rect.bottom >= rect.height/2 && rect.top <= vpHeight - rect.height/2){
          return true;
        } else {
          return false;
        }
      },
      getScrollSpeed: function(el){
        var curPosY = el ? el.getBoundingClientRect().top : 0;
        var curPosX = el ? el.getBoundingClientRect().left: 0;
        var speedY = this.lastPosY - curPosY;
        var speedX = this.lastPosX - curPosX;
        if(this.lastSpeeds.length<10){
            this.lastSpeeds.push((speedY+speedX)/2)
        }else{
            this.lastSpeeds.shift()
            this.lastSpeeds.push((speedY+speedX)/2)
        }
        var sumSpeed = 0;
        for(var i = 0; i < this.lastSpeeds.length; ++i){
          sumSpeed += this.lastSpeeds[i];
        }
        this.aveSpeed = Math.abs(sumSpeed/this.lastSpeeds.length);
        this.lastPosY = curPosY;
        this.lastPosX = curPosX;
      },
      getExposureTargets: function(){
        var _this = this,
            els = $(this.ops.selector),
            obj = {
              exposureTargets: [],
              firstExposureTargets: [],
            },
            exposureCount = 0;

        els.each(function(){
          var $this = $(this);
          // 元素是否可以曝光
          if(_this.targetCanExposure(this)){
            // 元素是否首次曝光
            if(!Number($this.attr('exposure'))){
              $this.attr('exposure', 1);
              obj.exposureTargets.push(this);
              obj.firstExposureTargets.push(this);
            } else {
              obj.exposureTargets.push(this);
            }
          }

          if(Number($this.attr('exposure'))){
            ++exposureCount;
          }
        });

        if(els.length === exposureCount){
          // 元素全都曝光过 执行回调函数
          if(this.ops.autoClear){
            this.clear();
          }
          typeof this.ops.onAllExposured === 'function' && this.ops.onAllExposured.call(this);
        }

        return obj;
      },
      doExposure: function(){
        // 获取曝光元素
        var obj = this.getExposureTargets();
        // console.log(obj);
        if(obj.exposureTargets.length && typeof this.ops.onExposure === 'function'){
          this.ops.onExposure.call(this, obj.exposureTargets);
        }
        if(obj.firstExposureTargets.length && typeof this.ops.onFirstExposure === 'function'){
          this.ops.onFirstExposure.call(this, obj.firstExposureTargets);
        }
      },
      scrollEventHandle: function(e){
        var el = null
        for(var i = 0; i < e.target.childNodes.length; ++i){
          if(e.target.childNodes[i].nodeType == 1){
            el = e.target.childNodes[i];
            break;
          }
        }
        this.getScrollSpeed(el);
        // console.log(this.aveSpeed);

        // 滚屏速度大于设置的速度阀值 return
        if(this.aveSpeed > this.ops.speed){
          return ;
        }

        this.doExposure();
      },
      clear: function(){
        $(window).off('scroll', this.scrollEventHandleBind);
        $(window).off('scrollEnd', this.scrollEndEventHandleBind);
        this.scrollEventHandleBind = null;
        this.scrollEndEventHandleBind = null;
      },
      run: function(){
        var _this = this;

        this.scrollEventHandleBind = this.scrollEventHandle.bind(this);
        this.scrollEndEventHandleBind = this.doExposure.bind(this);

        this.lastPosY = document.body ? document.body.getBoundingClientRect().top : document.head.parentNode.getBoundingClientRect().top;
        this.lastPosX = document.body ? document.body.getBoundingClientRect().left : document.head.parentNode.getBoundingClientRect().left;
        this.lastSpeeds = [];
        this.aveSpeed = 0;

        var onload = function(){
          _this.doExposure();
          $(window).off('load', onload);
          $(window).on('scroll', _this.scrollEventHandleBind);
          $(window).on('scrollEnd', _this.scrollEndEventHandleBind);
        }
        $(window).on('load', onload);
      },
      init: function(){
        // scrollEnd event
        var cntr = 0;
        var lastCntr = 0;
        var diff = 0;
        var scrollEnd = document.createEvent('HTMLEvents');
        scrollEnd.initEvent('scrollEnd', true, false);
        scrollEnd.eventType = 'message';
        function enterFrame(){
          if(cntr != lastCntr){
            diff++;
            if(diff == 5){
              window.dispatchEvent(scrollEnd);
              cntr = lastCntr;
            }
          }
          requestAnimationFrame(enterFrame);
        }
        window.requestAnimationFrame(enterFrame)
        document.addEventListener('scroll',function(){
          lastCntr = cntr;
          diff = 0;
          ++cntr;
        }, true);

        // start exposure listener
        this.run();
      }
    };

    return Exposure;
  })();

  return Exposure;
});
```
