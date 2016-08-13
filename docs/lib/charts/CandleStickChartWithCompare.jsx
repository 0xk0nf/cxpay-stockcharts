"use strict";

import React from "react";
import d3 from "d3";

import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";



var { CandlestickSeries, BarSeries, LineSeries, AreaSeries, CompareSeries } = series;
var { discontinuousTimeScaleProvider } = scale;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } = coordinates;
var { EdgeIndicator } = coordinates;

var { OHLCTooltip, SingleValueTooltip } = tooltip;
var { XAxis, YAxis } = axes;

var { compare, sma } = indicator;
var { fitWidth } = helper;

class CandleStickChartWithCompare extends React.Component {
	render() {
		var { data, type, width } = this.props;

		var compareCalculator = compare()
			.base(d => d.close)
			.mainKeys(["open", "high", "low", "close"])
			.compareKeys(["AAPLClose", "SP500Close"])
			.accessor(d => d.compare)
			.merge((d, c) => { d.compare = c; });

		var smaVolume50 = sma()
			.id(3)
			.windowSize(10)
			.source(d => d.volume)
			.merge((d, c) => {d.smaVolume50 = c})
			.accessor(d => d.smaVolume50);

		return (
			<ChartCanvas width={width} height={400}
					margin={{left: 70, right: 70, top:20, bottom: 30}} type={type}
					seriesName="MSFT"
					data={data} calculator={[smaVolume50]} postCalculator={compareCalculator}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>

				<Chart id={1}
						yExtents={d => d.compare}>
					<XAxis axisAt="bottom" orient="bottom" />
					<YAxis axisAt="right" orient="right" ticks={5} tickFormat={d3.format(".0%")} />

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={d3.time.format("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={d3.format(".2f")} />

					<CandlestickSeries yAccessor={d => d.compare}/>
					<LineSeries yAccessor={d => d.compare.AAPLClose} stroke="#ff7f0e" />
					<LineSeries yAccessor={d => d.compare.SP500Close} stroke="#2ca02c"/>

					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.compare.AAPLClose} fill="#ff7f0e"
						displayFormat={d3.format(".0%")} />

					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.compare.SP500Close} fill="#2ca02c"
						displayFormat={d3.format(".0%")} />

					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.compare.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}
						displayFormat={d3.format(".0%")} />

					<OHLCTooltip origin={[-40, 0]} />
					<SingleValueTooltip
						yAccessor={d => d.AAPLClose}
						yLabel="AAPL"
						yDisplayFormat={d3.format(".2f")}
						valueStroke="#ff7f0e"
						/* labelStroke="#4682B4" - optional prop */
						origin={[-40, 20]}/>
					<SingleValueTooltip
						yAccessor={d => d.SP500Close}
						yLabel="S&P 500"
						yDisplayFormat={d3.format(".2f")}
						valueStroke="#2ca02c"
						/* labelStroke="#4682B4" - optional prop */
						origin={[-40, 35]}/>
				</Chart>
				<Chart id={2}
						yExtents={d => d.volume}
						height={150} origin={(w, h) => [0, h - 150]}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format("s")}/>
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={d3.format(".4s")} />

					<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
				</Chart>
				<CrossHairCursor />

			</ChartCanvas>
		);
	}
};

CandleStickChartWithCompare.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithCompare.defaultProps = {
	type: "svg",
};
CandleStickChartWithCompare = fitWidth(CandleStickChartWithCompare);

export default CandleStickChartWithCompare;
