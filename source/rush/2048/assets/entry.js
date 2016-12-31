require('./style/main.sass');
require('./js/refreshRem.js');

var React = require('react');
var ReactDOM = require('react-dom');

var TZFE = require('./js/tzfe.js');
	
ReactDOM.render(
  <TZFE/>,
  document.getElementById('J_tzfe')
);
