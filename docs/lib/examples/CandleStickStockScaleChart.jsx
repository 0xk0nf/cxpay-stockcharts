'use strict';

var React = require('react');
var d3 = require('d3');

var ReStock = require('src/');

var ChartCanvas = ReStock.ChartCanvas
	, XAxis = ReStock.XAxis
	, YAxis = ReStock.YAxis
	, CandlestickSeries = ReStock.CandlestickSeries
	, DataTransform = ReStock.DataTransform
	, Chart = ReStock.Chart
	, DataSeries = ReStock.DataSeries
	, ChartWidthMixin = require('./mixin/ChartWidthMixin')
	, InitialStateMixin = require('./mixin/initial-state-mixin')
;

var CandleStickChart = React.createClass({
	mixins: [InitialStateMixin, ChartWidthMixin],
	render() {
		if (!this.state.width) return <div />;

		return (
			<ChartCanvas width={this.state.width} height={400}
				margin={{left: 50, right: 50, top:10, bottom: 30}} data={this.props.data}>
				<DataTransform transformType="stockscale">
					<Chart id={1} >
						<XAxis axisAt="bottom" orient="bottom" />
						<YAxis axisAt="right" orient="right" ticks={5} />
						<DataSeries yAccessor={CandlestickSeries.yAccessor} >
							<CandlestickSeries />
						</DataSeries>
					</Chart>
				</DataTransform>
			</ChartCanvas>
		);
	}
});

module.exports = CandleStickChart;

