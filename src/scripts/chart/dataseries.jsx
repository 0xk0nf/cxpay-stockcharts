'use strict';
var React = require('react'),
	PureRenderMixin = require('../mixin/restock-pure-render-mixin');

function updatePropsToChildren(props) {
	var children = props.children;
	if (!Array.isArray(props.children)) {
		children = [props.children];
	}

	children
		.filter((child) => /Series$/.test(child.props.namespace))
		.forEach((child) => {
			child.props._xScale = props._xScale;
			child.props._yScale = props._yScale;
			child.props._xAccessor = props.xAccessor || props._xAccessor;
			child.props._yAccessor = props.yAccessor;
			child.props.data = props.data;
		});
}

var DataSeries = React.createClass({
	//namespace: "ReStock.DataSeries",
	mixins: [PureRenderMixin],
	propTypes: {
		xAccessor: React.PropTypes.func,
		_xAccessor: React.PropTypes.func,
		yAccessor: React.PropTypes.func.isRequired
	},
	getDefaultProps() {
		return {
			namespace: "ReStock.DataSeries"
		};
	},
	componentWillMount() {
		this.updatePropsToChildren(this.props);
	},
	componentWillReceiveProps(nextProps) {
		this.updatePropsToChildren(nextProps);
	},
	updatePropsToChildren(props) {
		updatePropsToChildren(props)
	},
	render() {
		//throw new Error();
		return (
			<g>{this.props.children}</g>
		);
	}
});

module.exports = DataSeries;
