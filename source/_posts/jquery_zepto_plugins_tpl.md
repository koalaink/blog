---
title: jQuery/Zepto 插件模板
date: 2016-01-07 14:44:33
categories: [WEB,JS]
tags: [JS,jquery,zepto,plugin]
---

最近一个多月有点偷懒，好久没更博了，一直没有时间做个总结。今天就先对先前写jQuery/Zepto的插件做个总结，整理出一份模板，以供以后使用。确切的说应该是两份模板，一份jQuery，一份Zepto，但是这两者间差异不大，只是一些细小的区别罢了。好了，不说废话了，切入正题。  

在插件开发过程中，为了避免文件合并后代码之间的相互影响，所以每个插件都应该写在自己的一个命名空间内，在自己的命名空间中运行。  

```js
;(function(){

	// code your plugn ...

})();
```
<!-- more -->
如上使用立即执行的匿名函数包裹整个插件，这样插件就能拥有独立的命名空间而不受其他代码的影响，当然也不会影响其他的代码。在一些代码中，为了避免对 $ 使用的混乱，所以最好在自己插件的命名空间中设定好固定的$ ，所以改成如下  

```javascript
;(function( $ ){

	// code your plugn ...

})( jQuery );
```

这样就指定了$ 所代表的是jQuery ，避免了一些不必要的麻烦，当然，如果你使用的是Zepto开发插件，那么就将最后面的jQuery改成Zepto传给$ 就可以了。将这段代码保存为plugn.js 文件。之后就可以开始在这个命名空间内写自己的插件了。  

定义好命名空间之后，就是将插件函数扩展到 jQuery.fn  ，在jQuery中， jQuery.fn = jQuery.prototype， 所以只要将你的插件函数扩展到jQuery.fn 中，那么所有的jQuery对象都能够调用到这个函数。jQuery提供了扩展jQuery.fn 的方法，是 jQuery.fn.extend(object) ，这个方法将object对象扩展到jQuery.fn (也就是jQuery.prototype )中，如下：  

```javascript
;(function( $ ){

	$.fn.extend({
		plugn1 : function(){
			this.html('<h1>Hello in plugn1</h1>');
		},
		plugn2 : function(){
			this.html('<h1>Hello in plugn2</h1>');
		}
	});

})( jQuery );
```

这样在调用的时候就很简单，形式如下：  

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="test"></div>
	<script src="js/jquery-1.11.1.min.js"></script>
	<script src="js/plugn.js"></script>
	<script>
	$("#test").plugn1();	// <h1>Hello in plugn1</h1>
	// $("#test").plugn2();	// <h1>Hello in plugn2</h1>
	</script>
</body>
</html>
```

这里有必要提一下jQuery实现的extend函数，也就是jQuery.extend() 这个函数，这个函数形式如下：  

```javascript
Objectj jQuery.extend(dest,src1[,src2,src3...])
```

第一个参数为被扩展的目标源对象(dest)，这个函数会将之后的所有对象(src1[,src2...])扩展合并到dest中，函数返回扩展后的dest对象。可见这个函数修改了dest对象的结构，所以如果不希望改变dest对象的结构，也可以这样调用 res = $.extend({},src1[,src2,src3...]) 。   

这个函数的另一种形式是：   

```javascript
Objectj jQuery.extend(boolean,dest,src1[,src2,src3...])
```

这里的第一个参数是boolean型变量，代表是否进行深度拷贝，之后的几个参数如上一个形式中提到的一样，这里就不再重复。所谓的深度拷贝，就是当对象中还嵌套对象时，会继续合并扩展嵌套的对象，而不是单纯的替换。如下举例说明：  

```javascript
var result=$.extend( true, {},
	{ name: "John", location: {city: "Boston",county:"USA"} },
	{ last: "Resig", location: {state: "MA",county:"China"} });
```

运行的结果result值如下：   

```javascript
result = { name: "John", last: "Resig", location: { city: "Boston", state: "MA", county: "China" } }
```

如果将$.extend 的第一个参数改为false ，那么运行的结果如下所示：  

```javascript
result = { name: "John", last: "Resig", location: { state: "MA", county: "China" } }
```

extend函数还有另外一个形式，就是  

```javascript
Objectj jQuery.extend(src)
```

这里就是当参数只有一个的时候，那么jQuery.extend(src)  就是将src扩展到jQuery中。因此 jQuery.extend(object)也可以扩展jQuery，但是扩展的函数调用形式不再是 $(...).myFunc() ，而是 $.myFunc() ，因为这里是扩展到jQuery类全局，相当于是添加jQuery类的方法，属于类级别插件；而$.fn.extend扩展到jQuery.prototype中，是扩展到jQuery的对象原型中，所以每个jQuery对象都能调用到这个函数，属于对象级别的插件。这样说比较抽象，写个demo对比一下  

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script>

	function jQuery(){
		// ...
	}

	jQuery.fn = jQuery.prototype = {
		// ...
	}

	/**
	 * 这里与使用 jQuery.fn.extend(objPlugn) 等效
	 * @type {Function}
	 */
	jQuery.fn.objPlugn = function(){
		console.log("objPlugn");
	}

	/**
	 * 这里与使用 jQuery.extend(funcPlugn) 等效
	 * @type {Function}
	 */
	jQuery.funcPlugn = function(){
		console.log("funcPlugn");
	}

	/**
	 * 这里的 jq 实例即我们使用的 $(...)
	 * @type {jQuery}
	 */
	var jq = new jQuery();

	jq.objPlugn();			// objPlugn
	// jq.funcPlugn();		// 报错 TypeError: jq.funcPlugn is not a function
	jQuery.funcPlugn();		// funcPlugn

	</script>
</body>
</html>
```

因此使用$.extend 与使用$.fn.extend 扩展的jQuery插件还是有区别的。  

这里我们可以查看jQuery的源码  

![jQuery.extend](/posts_assets/jquery_zepto_plugins_tpl/extend.png)  


jQuery.extend 函数实现


图中的第一行我们就能看到，$.extend 与$.fn.extend 这两个函数的实现其实是一样的，而之所以会有刚才说的那些区别，原因就在代码中的197行：target = this; 这一句。在这个if 分支内，就表示传入的src 只有一个的情况，那么就将扩展源对象设置为this，对this进行扩展。当调用extend的上下文环境不同，要扩展的目标源对象就不同，当使用$.extend扩展插件，this指向的是jQuery；而使用$.fn.extend的时候，this指向的是$.fn，即$.prototype。所以要搞清楚$.extend(obj) 与$.fn.extend(obj) 所扩展的对象不同，调用的形式也不同。  

回到刚才说的$.fn.extend() ，这里我们将我们的插件扩展到$.fn 中，以便所有的jQuery对象能够调用，调用形式为$(...).myPlugn() ，如上面在index.html 文件中的$("#test").plugn1(); 。  

在使用jQuery对象函数的时候，往往能够链式调用，这点是jQuery一个很大的优点，所以为了使我们开发的插件也能够这样链式操作，我们应该在我们写的插件函数中将自身return回来，把plugn.js文件改成如下形式：  

```javascript
;(function( $ ){

	/**
	 * 如之前说,这里与使用如下形式无异
	 * $.fn.extend({
	 * 		myPlugn : function(){
	 * 			// ...
	 * 		}
	 * })
	 * @return {[type]} [description]
	 */
	$.fn.myPlugn = function(){
		return this.each(function(){
			var $this = $(this);

			$this.html('<h1>Hello World</h1>');

		});
	}

})( jQuery );
```

这里对this还执行了一次each，是为了支持如果jQuery选择器选中了多个元素，那么可以对选中每个元素都执行到我们插件想要做的事。将index.html代码改为如下  

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div class="test"></div>
	<div class="test"></div>
	<script src="js/jquery-1.11.1.min.js"></script>
	<script src="js/plugn.js"></script>
	<script>
	$(".test").myPlugn().css({color: '#f00'});
	</script>
</body>
</html>
```

注意此时的jQuery选择器选中了所有class="test" 的元素，然后执行myPlugn() ，之后还将选中元素的 css 样式修改了，可见，现在已经可以支持链式操作，并且能对选中的jQuery元素都分别进行myPlugn() 操作。到现在为止，已经可以开始开发自己的jQuery小插件了。但是我们在开发过程中，往往希望能够将插件封装起来，这样可以反复的调用，并且操作简单，易于维护。所以我们先假定已经写好了一个MyPlugn的类，我们先修改一下plugn.js文件  

```javascript
;(function( $ ){

	/**
     * 将 plugn 扩展到 $.fn
     * @author   dhb(dai_huibin@126.com)
     * @date     2015-12-23
     * @datetime 2015-12-23T11:20:43+0800
     * @param    {object|string}    options    setting options
     * @param    {array}            paramArray 调用参数
     * @return   {object}          	return self
     */
	$.fn.myPlugn = function(options, paramArray){
		return this.each(function(){
			/**
			 * 我们在首次调用myPlugn的时候，实例化一个 MyPlugn 对象，并且将这个实例缓存在$(this).data(myPlugn)中
			 * 这样下次再调用myPlugn的时候，就不需要再实例化，只需要从$(this).data(myPlugn)中取出之前的实例进行操作即可
			 */
			var $this = $(this),
				instance = $this.data($.fn.myPlugn.info.name);

			// 这里判断，如果已经存在instance，则表示已实例化过，就无需再实例化MyPlugn对象了
			if( !instance ){
				instance = new MyPlugn($this, options);
				// 这里将首次实例化的instance对象缓存到$(this).data(myPlugn)中
				$this.data($.fn.myPlugn.info.name, instance);
			}

			/**
			 * 这里是对插件的一个优化
			 * 判断当传入的options参数为字符串类型时，表示的是要调用instance实例中的options方法。举个例子
			 * var test = $('.test').myPlugn();
			 * test.myPlugn('add');
			 * 这样的第二句代码就调用了instance.add()这个方法
			 * 这里还能够传入参数，比如 add 函数形式为： add(a,b){ return a+b; }
			 * 那么我们就把第二句代码改为 test.myPlugn('add',[1,2]) 即可
			 * 注意这里的第二个参数要求是一个数组，对应你要调用的那个函数的参数，比如上面的例子就如同调用了 instance.add(1,2)
			 */
			typeof options === "string" && typeof instance[options] === "function" && instance[options].apply(instance,paramArray);

		});
	};

	/**
     * plugn infomation
     * 这里可以添加一些插件的信息
     * 如版本号，插件名等
     * @type {Object}
     */
	$.fn.myPlugn.info = {
		"version" : "v1.0",
		"name" : "myPlugn"
	}

    /**
     * plugn default settings
     * 这里可以配置插件的一些默认项
     * @type {Object}
     */
	$.fn.myPlugn.defaults = {
		// default settings
	}

})( jQuery );
```

写到这里，我们就可以开始安心的去实现 MyPlugn 这个类了，将我们插件要实现的功能写在这个类里面就大功告成了。  

下面贴上完整的jQuery-plugn.js 模板：  

```javascript
;(function( $ ){

	// 这里先定义了我们要实现的MyPlugn类，以及在开发过程中需要用到的一些私有函数方法集合
	var MyPlugn, myPlugnPrivateMethod;

	// 这里使用立即执行的匿名函数来划分一个命名空间，避免干扰，在匿名函数内返回MyPlugn类
	MyPlugn = (function(){

		/**
		 * 构造函数
		 * @author   dhb(dai_huibin@126.com)
		 * @date     2015-12-23
		 * @datetime 2015-12-23T11:12:00+0800
         * @param       {object|string}   	element 	DOM object or selector
         * @param       {object}         	options 	settings
		 */
		function MyPlugn(element, options){
			// 构造函数内，将调用这儿插件函数的元素存下，并获取到一些插件配置的信息，执行初始化函数
			this.el = $(element);
			this.ops = $.extend({}, $.fn.myPlugn.defaults, options);
			this.init();
		}

		MyPlugn.prototype = {
			init : function(){
				// 这里是我们插件的一些初始化动作...
			},
			add : function(a,b){
				console.log(a+b);
			},
			// ... 这里添加更多我们需要的函数，接口
		};

		return MyPlugn;
	})();

	/**
	 * plugn 私有函数对象
	 * @type {Object}
	 */
	myPlugnPrivateMethod = {
		// 这里添加不希望被外界调用到的函数，只供 MyPlugn 使用
	};

	/**
     * 将 plugn 扩展到 $.fn
     * @author   dhb(dai_huibin@126.com)
     * @date     2015-12-23
     * @datetime 2015-12-23T11:20:43+0800
     * @param    {object|string}    options    setting options
     * @param    {array}            paramArray 调用参数
     * @return   {object}          	return self
     */
	$.fn.myPlugn = function(options, paramArray){
		return this.each(function(){
			/**
			 * 我们在首次调用myPlugn的时候，实例化一个 MyPlugn 对象，并且将这个实例缓存在$(this).data(myPlugn)中
			 * 这样下次再调用myPlugn的时候，就不需要再实例化，只需要从$(this).data(myPlugn)中取出之前的实例进行操作即可
			 */
			var $this = $(this),
				instance = $this.data($.fn.myPlugn.info.name);

			// 这里判断，如果已经存在instance，则表示已实例化过，就无需再实例化MyPlugn对象了
			if( !instance ){
				instance = new MyPlugn($this, options);
				// 这里将首次实例化的instance对象缓存到$(this).data(myPlugn)中
				$this.data($.fn.myPlugn.info.name, instance);
			}

			/**
			 * 这里是对插件的一个优化
			 * 判断当传入的options参数为字符串类型时，表示的是要调用instance实例中的options方法。举个例子
			 * var test = $('.test').myPlugn();
			 * test.myPlugn('add');
			 * 这样的第二句代码就调用了instance.add()这个方法
			 * 这里还能够传入参数，比如 add 函数形式为： add(a,b){ return a+b; }
			 * 那么我们就把第二句代码改为 test.myPlugn('add',[1,2]) 即可
			 * 注意这里的第二个参数要求是一个数组，对应你要调用的那个函数的参数，比如上面的例子就如同调用了 instance.add(1,2)
			 */
			typeof options === "string" && typeof instance[options] === "function" && instance[options].apply(instance,paramArray);

		});
	};

	/**
     * plugn infomation
     * 这里可以添加一些插件的信息
     * 如版本号，插件名等
     * @type {Object}
     */
	$.fn.myPlugn.info = {
		"version" : "v1.0",
		"name" : "myPlugn"
	}

    /**
     * plugn default settings
     * 这里可以配置插件的一些默认项
     * @type {Object}
     */
	$.fn.myPlugn.defaults = {
		// default settings
	}

})( jQuery );
```

到此jQuery插件的模板就完整了。  

在使用Zepto开发插件时，用法与jQuery大同小异。在这份模板上最大的区别在于$(this).data() 函数的使用。  

jQuery的data函数功能十分强大，能够缓存字符串，对象，函数等任何类型的数据，比如我们这边使用的时候将整个instance实例存在了$(this).data('myPlugn') 中。这点在Zepto上就有所不同，Zepto的data函数相对来说就比较弱，只能存字符串变量，不能存储对象类型的变量，因此使用Zepto开发插件的时候，要想缓存实例的instance对象，需要做一个优化。下面贴上Zepto插件的模板，在data上缓存instance的细节不同罢了。  

贴上Zepto-plugn.js 模板代码：  

```javascript
;(function( $ ){

	// 这里先定义了我们要实现的MyPlugn类，以及在开发过程中需要用到的一些私有函数方法集合
	var MyPlugn, myPlugnPrivateMethod;

	// 这里使用立即执行的匿名函数来划分一个命名空间，避免干扰，在匿名函数内返回MyPlugn类
	MyPlugn = (function(){

		/**
		 * 构造函数
		 * @author   dhb(dai_huibin@126.com)
		 * @date     2015-12-23
		 * @datetime 2015-12-23T11:12:00+0800
         * @param       {object|string}   	element 	DOM object or selector
         * @param       {object}         	options 	settings
		 */
		function MyPlugn(element, options){
			// 构造函数内，将调用插件的元素存下，并获取到一些插件配置，执行初始化函数
			this.el = $(element);
			this.ops = $.extend({}, $.fn.myPlugn.defaults, options);
			this.init();
		}

		MyPlugn.prototype = {
			init : function(){
				// 这里是我们插件的一些初始化动作...
			},
			add : function(a,b){
				console.log(a+b);
			},
			// ... 这里添加更多我们需要的函数，接口
		};

		return MyPlugn;
	})();

	/**
	 * plugn 私有函数对象
	 * @type {Object}
	 */
	myPlugnPrivateMethod = {
		// 这里添加不希望被外界调用到的函数，只供 MyPlugn 使用
	};

	/**
     * 将 plugn 扩展到 $.fn
     * @author   dhb(dai_huibin@126.com)
     * @date     2015-12-23
     * @datetime 2015-12-23T11:20:43+0800
     * @param    {object|string}    options    setting options
     * @param    {array}            paramArray 调用参数
     * @return   {object}          	return self
     */
	$.fn.myPlugn = function(options, paramArray){
		return this.each(function(){
			/**
			 * 我们在首次调用myPlugn的时候，实例化一个 MyPlugn 对象，并且将这个实例缓存在$(this).data(myPlugn)中
			 * 这样下次再调用myPlugn的时候，就不需要再实例化，只需要从$(this).data(myPlugn)中取出之前的实例进行操作即可
			 */
			var $this = $(this),
				instance = $.fn.myPlugn.lookup[$this.data($.fn.myPlugn.info.name)];

			// 这里判断，如果已经存在instance，则表示已实例化过，就无需再实例化MyPlugn对象了
			if( !instance ){
				instance = new MyPlugn($this, options);
				// 这里将首次实例化的instance对象缓存到$.myPlugn.lookup中，对应key值存入$(this).data(myPlugn)中
				$.fn.myPlugn.lookup[++$.fn.myPlugn.lookup.i] = instance;
				$this.data($.fn.myPlugn.info.name,$.fn.myPlugn.lookup.i);
			}

			/**
			 * 这里是对插件的一个优化
			 * 判断当传入的options参数为字符串类型时，表示的是要调用instance实例中的options方法。举个例子
			 * var test = $('.test').myPlugn();
			 * test.myPlugn('add');
			 * 这样的第二句代码就调用了instance.add()这个方法
			 * 这里还能够传入参数，比如 add 函数形式为： add(a,b){ return a+b; }
			 * 那么我们就把第二句代码改为 test.myPlugn('add',[1,2]) 即可
			 * 注意这里的第二个参数要求是一个数组，对应你要调用的那个函数的参数，比如上面的例子就如同调用了 instance.add(1,2)
			 */
			typeof options === "string" && typeof instance[options] === "function" && instance[options].apply(instance,paramArray);

		});
	};

	/**
     * plugn infomation
     * 这里可以添加一些插件的信息
     * 如版本号，插件名等
     * @type {Object}
     */
	$.fn.myPlugn.info = {
		"version" : "v1.0",
		"name" : "myPlugn"
	}

	/**
     * plugn instance
     * i 为 MyPlugn 实例的计数
     * 将instance实例存放在这个对象中
     * 获取instance的key为 $(this).data('myPlugn') => instance
     * @type {Object}
     */
	$.fn.myPlugn.lookup = {
		i : 0
	}

    /**
     * plugn default settings
     * 这里可以配置插件的一些默认项
     * @type {Object}
     */
	$.fn.myPlugn.defaults = {
		// default settings
	}

})( Zepto );
```
