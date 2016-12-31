var React = require('react');

var Cell = React.createClass({
	getDefaultProps : function(){
		return {
			num  : 0,
			index: 0
		};
	},
	render : function(){
		var index = this.props.index,
			className = "cell",
			txt = this.props.num === 0 ? '' : this.props.num;

		className += " row"+parseInt(index/4)+" col"+parseInt(index%4);

		if( this.props.num != 0 ) className += " c"+this.props.num;

		return (
			<div className={className}>
				{txt}
			</div>
		);
	}
});

module.exports = Cell;