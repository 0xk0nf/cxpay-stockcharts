'use strict';
var React = require('react');
// var TestUtils = React.addons.TestUtils;

var EventCaptureMixin = require('./mixin/EventCaptureMixin');
var ChartContainerMixin = require('./mixin/ChartContainerMixin');
var Canvas = require('./Canvas');

var ChartCanvas = React.createClass({
	// mixins: [ChartContainerMixin, EventCaptureMixin],
	propTypes: {
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		margin: React.PropTypes.object,
		interval: React.PropTypes.oneOf(['D']).isRequired, //,'m1', 'm5', 'm15', 'W', 'M'
		data: React.PropTypes.array.isRequired,
		initialDisplay: React.PropTypes.number.isRequired,
	},
	getAvailableHeight(props) {
		return props.height - props.margin.top - props.margin.bottom;
	},
	getAvailableWidth(props) {
		return props.width - props.margin.left - props.margin.right;
	},
	getInitialState() {
		return {};
	},
	getDefaultProps() {
		return {
			margin: {top: 20, right: 30, bottom: 30, left: 80},
			interval: "D",
			initialDisplay: 30,
		};
	},
	childContextTypes: {
		_width: React.PropTypes.number.isRequired,
		_height: React.PropTypes.number.isRequired,
		data: React.PropTypes.object.isRequired,
		interval: React.PropTypes.string.isRequired,
		initialDisplay: React.PropTypes.number.isRequired,
		// canvas: React.PropTypes.any,
	},
	getChildContext() {
		var data = {};
		data[this.props.interval] = this.props.data;
		return {
			_width: this.getAvailableWidth(this.props),
			_height: this.getAvailableHeight(this.props),
			data: data,
			interval: this.props.interval,
			initialDisplay: this.props.initialDisplay,
		}
	},
	componentDidMount() {
		// console.log(this.getCanvas());
	},
	getCanvas() {
		return this.refs.canvas.getCanvas();
	},
	render() {
		var w = this.getAvailableWidth(this.props), h = this.getAvailableHeight(this.props);
		var children = this.props.children;
		// var children = this.renderChildren();

		return (
			<div style={{position: 'relative'}}>
				<svg width={this.props.width} height={this.props.height}>
					<defs>
						<clipPath id="chart-area-clip">
							<rect x="0" y="0" width={w} height={h} />
						</clipPath>
					</defs>
					<g transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}>
						{this.props.children}
					</g>
				</svg>
			</div>
		);
	}
});

module.exports = ChartCanvas;

/*
				<Canvas ref="canvas" width={w} height={h} left={this.props.margin.left} top={this.props.margin.top} />
*/
