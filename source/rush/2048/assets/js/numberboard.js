var React = require('react');
var Cell = require('./cell.js');

var NumberBoard = React.createClass({
	render : function(){
		var cells = this.props.data.map(function( cell ){
			if(!cell) return;
			return <Cell num={cell.num} index={cell.index} />
		});
		return (
			<div>
				{cells}
			</div>
		);
	}
});

module.exports = NumberBoard;