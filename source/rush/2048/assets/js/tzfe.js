var $ = require('webpack-zepto');
var privateMethod = require('./functions.js');
var React = require('react');
var Board = require('./board.js');
var NumberBoard = require('./numberboard.js');

var TZFE = React.createClass({
	getDefaultProps : function(){
		return {
			minDis: parseInt($('html').css('font-size')),
			direction : [
				{startIndex:0,dx:1,dy:0},	// left
				{startIndex:15,dx:0,dy:-1},	// down
				{startIndex:0,dx:0,dy:1},	// up
				{startIndex:15,dx:-1,dy:0}	// right
			]
		};
	},
	getInitialState : function(){
		var data = [], mark = {},
			arr = privateMethod.getRandomArray(2,0,16,mark);

		data[arr[0]] = { num: privateMethod.getRandomPowerOf2(2), index: arr[0] };
		data[arr[1]] = { num: privateMethod.getRandomPowerOf2(2), index: arr[1] };

		return {
			data  : data,
			mark  : mark
		};
	},
	handleTouchStart : function(e){
		e.preventDefault();

		this.startPos = {
			x : e.touches[0].pageX,
			y : e.touches[0].pageY
		};

		this.$grid.on("touchmove",this.handleTouchMove);
		this.$grid.on("touchend",this.handleTouchEnd);
		
	},
	handleTouchMove : function(e){

		this.endPos = {
			x : e.touches[0].pageX,
			y : e.touches[0].pageY
		}

	},
	handleTouchEnd : function(e){

		if(!!!this.endPos) return ;

		var deltaX = this.endPos.x - this.startPos.x,
			deltaY = this.endPos.y - this.startPos.y;

		if( Math.sqrt(Math.pow(deltaX,2)+Math.pow(deltaY,2)) > this.props.minDis ){
			var k = deltaY/deltaX,
				direction = 0;	// left
			if(k>1||k<-1){
				if( deltaY > 0 ){
					// down
					direction = 1;
				} else {
					// up
					direction = 2;
				}
			} else if( deltaX > 0 ){
				// right
				direction = 3;
			}
			this.changeNumber(direction);

		}

		this.startPos = null;
		this.endPos = null;

		
	},
	changeNumber : function(direction){
		var data = this.state.data,
			mark = this.state.mark,
			dis = this.props.direction[direction],
			x = parseInt(dis.startIndex%4),
			y = parseInt(dis.startIndex/4),
			flag = false;
		for(var i=0;i<4;++i){
			var tmpx = x,
				tmpy = y,
				index = x+y*4,
				tmpindex,
				baseNum = 0,
				cur=-1,next=-1;
			if(mark[index]){
				cur = index;
			}
			for(var j=0;j<3;++j){
				tmpx += dis.dx;
				tmpy += dis.dy;
				tmpindex = tmpx+tmpy*4;
				if(!mark[tmpindex]) continue;
				if(cur==-1){
					cur = tmpindex;
					continue;
				} else {
					next = tmpindex;
					if(data[cur].num != data[next].num){
						flag = this.move(cur,x+baseNum*dis.dx+(y+baseNum*dis.dy)*4,data,mark) || flag;
						baseNum++;
						cur = next;
						next = -1;
					} else {
						flag = this.move(cur,-1,data,mark) || flag;
						data[next].num *= 2;
						flag = this.move(next,x+baseNum*dis.dx+(y+baseNum*dis.dy)*4,data,mark) || flag;
						baseNum++;
						cur = -1;
						next = -1;
					}
				}
			}
			if(cur!=-1){
				flag = this.move(cur,x+baseNum*dis.dx+(y+baseNum*dis.dy)*4,data,mark) || flag;
			}
			x += dis.dy;
			y += dis.dx;
		}
		
		if(flag){
			var arr = privateMethod.getRandomArray(1,0,16,mark);

			data[arr[0]] = { num: privateMethod.getRandomPowerOf2(2), index: arr[0] };
		}

		this.setState({
			data : data,
			mark : mark
		});
	},
	move : function(from,to,data,mark){
		if(from==to) return;
		if(to == -1){
			data[from] = null;
			mark[from] = false;
		} else {
			data[to] = {
				num : data[from].num,
				index : to
			};
			mark[to] = true;
			data[from] = null;
			mark[from] = false;
			return true;
		}
	},
	componentDidMount : function(){
		this.$grid = $(this.refs.grid);

		this.$grid.on("touchstart",this.handleTouchStart);

	},
	render : function(){
		return (
			<div className="grid" ref="grid">
				<Board/>
				<NumberBoard data={this.state.data} />
			</div>
		);
	}
});

module.exports = TZFE;