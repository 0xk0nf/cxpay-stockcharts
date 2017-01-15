"use strict";

import { format } from "d3-format";
import React, { PropTypes, Component } from "react";
import GenericChartComponent from "../GenericChartComponent";

import { functor } from "../utils";

import ToolTipText from "./ToolTipText";
import ToolTipTSpanLabel from "./ToolTipTSpanLabel";

class StochasticTooltip extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
	}
	renderSVG(moreProps) {
		var { onClick, fontFamily, fontSize, yAccessor, displayFormat, label } = this.props;
		var { className, options, appearance } = this.props;
		var { chartConfig: { width, height } } = moreProps;
		var { currentItem } = moreProps;

		var { stroke } = appearance;
		var stochastic = currentItem && yAccessor(currentItem);

		var K = (stochastic && stochastic.K && displayFormat(stochastic.K)) || "n/a";
		var D = (stochastic && stochastic.D && displayFormat(stochastic.D)) || "n/a";

		var { origin: originProp } = this.props;
		var origin = functor(originProp);
		var [x, y] = origin(width, height);

		return (
			<g className={className} transform={`translate(${ x }, ${ y })`} onClick={onClick}>
				<ToolTipText x={0} y={0} fontFamily={fontFamily} fontSize={fontSize}>
					<ToolTipTSpanLabel>{`${ label } %K(`}</ToolTipTSpanLabel>
					<tspan fill={stroke.kLine}>{`${options.windowSize}, ${options.kWindowSize}`}</tspan>
					<ToolTipTSpanLabel>): </ToolTipTSpanLabel>
					<tspan fill={stroke.kLine}>{K}</tspan>
					<ToolTipTSpanLabel> %D (</ToolTipTSpanLabel>
					<tspan fill={stroke.dLine}>{options.dWindowSize}</tspan>
					<ToolTipTSpanLabel>): </ToolTipTSpanLabel>
					<tspan fill={stroke.dLine}>{D}</tspan>
				</ToolTipText>
			</g>
		);
	}
	render() {
		return <GenericChartComponent
			clip={false}
			svgDraw={this.renderSVG}
			drawOnMouseMove
			/>;
	}
}

StochasticTooltip.propTypes = {
	origin: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.func
	]).isRequired,
	className: PropTypes.string,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	onClick: PropTypes.func,
	yAccessor: PropTypes.func.isRequired,
	options: PropTypes.shape({
		windowSize: PropTypes.number.isRequired,
		kWindowSize: PropTypes.number.isRequired,
		dWindowSize: PropTypes.number.isRequired,
	}).isRequired,
	appearance: PropTypes.shape({
		stroke: {
			dLine: PropTypes.string.isRequired,
			kLine: PropTypes.string.isRequired,
		}.isRequired,
	}).isRequired,
	displayFormat: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
};

StochasticTooltip.defaultProps = {
	displayFormat: format(".2f"),
	origin: [0, 0],
	className: "react-stockcharts-toottip",
	label: "STO",
};

export default StochasticTooltip;
