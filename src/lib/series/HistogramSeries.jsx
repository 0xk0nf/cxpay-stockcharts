"use strict";

import React, { PropTypes, Component } from "react";

import StackedHistogramSeries from "./StackedHistogramSeries";
import wrap from "./wrap";

class HistogramSeries extends Component {
	render() {
		var { yAccessor } = this.props;
		return <StackedHistogramSeries {...this.props} yAccessor={[yAccessor]} />;
	}
}

HistogramSeries.propTypes = {
	baseAt: PropTypes.oneOfType([
		PropTypes.oneOf(["top", "bottom", "middle"]),
		PropTypes.number,
		PropTypes.func,
	]).isRequired,
	direction: PropTypes.oneOf(["up", "down"]).isRequired,
	stroke: PropTypes.bool.isRequired,
	widthRatio: PropTypes.number.isRequired,
	opacity: PropTypes.number.isRequired,
	fill: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]).isRequired,
	className: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string
	]).isRequired,
	xAccessor: PropTypes.func,
	yAccessor: PropTypes.func.isRequired,
	xScale: PropTypes.func,
	yScale: PropTypes.func,
	plotData: PropTypes.array,
};

HistogramSeries.defaultProps = {
	baseAt: "bottom",
	direction: "up",
	className: "bar",
	stroke: false,
	fill: "#4682B4",
	opacity: 1,
	widthRatio: 0.5,
};

export default wrap(HistogramSeries);
