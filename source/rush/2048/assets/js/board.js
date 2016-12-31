var React = require('react');
var Cell = require('./cell.js');

var Board = React.createClass({
	render : function(){
		var board = [];
		for(var x = 0; x < 16; ++x){
			board.push(<Cell index={x} />);
		}
		return (
			<div>
				{board}
			</div>
		);
	}
});

module.exports = Board;