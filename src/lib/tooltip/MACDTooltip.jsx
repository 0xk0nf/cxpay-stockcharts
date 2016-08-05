"use strict";

import d3 from "d3";
import React, { PropTypes, Component } from "react";
import GenericChartComponent from "../GenericChartComponent";

import ToolTipText from "./ToolTipText";
import ToolTipTSpanLabel from "./ToolTipTSpanLabel";

class MACDTooltip extends Component {
	constructor(props) {
		super(props);
		this.renderSVG = this.renderSVG.bind(this);
	}
	renderSVG(moreProps) {
		var { onClick, fontFamily, fontSize, calculator, displayFormat } = this.props;
		var { width, height } = this.context;
		var { currentItem } = moreProps;

		var yAccessor = calculator.accessor();

		var macdValue = currentItem && yAccessor(currentItem);

		var macd = (macdValue && macdValue.macd && displayFormat(macdValue.macd)) || "n/a";
		var signal = (macdValue && macdValue.signal && displayFormat(macdValue.signal)) || "n/a";
		var divergence = (macdValue && macdValue.divergence && displayFormat(macdValue.divergence)) || "n/a";

		var { origin: originProp } = this.props;
		var origin = d3.functor(originProp);
		var [x, y] = origin(width, height);

		return (
			<g transform={`translate(${ x }, ${ y })`} onClick={onClick}>
				<ToolTipText x={0} y={0}
					fontFamily={fontFamily} fontSize={fontSize}>
					<ToolTipTSpanLabel>MACD (</ToolTipTSpanLabel>
						<tspan fill={calculator.stroke().macd}>{calculator.slow()}</tspan>
						<ToolTipTSpanLabel>, </ToolTipTSpanLabel>
						<tspan fill={calculator.stroke().macd}>{calculator.fast()}</tspan>
					<ToolTipTSpanLabel>): </ToolTipTSpanLabel><tspan fill={calculator.stroke().macd}>{macd}</tspan>
					<ToolTipTSpanLabel> Signal (</ToolTipTSpanLabel>
						<tspan fill={calculator.stroke().signal}>{calculator.signal()}</tspan>
						<ToolTipTSpanLabel>): </ToolTipTSpanLabel><tspan fill={calculator.stroke().signal}>{signal}</tspan>
					<ToolTipTSpanLabel> Divergence: </ToolTipTSpanLabel><tspan fill={calculator.fill().divergence}>{divergence}</tspan>
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

MACDTooltip.contextTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
};

MACDTooltip.propTypes = {
	origin: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.func
	]).isRequired,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	calculator: PropTypes.func.isRequired,
	displayFormat: PropTypes.func.isRequired,
	onClick: PropTypes.func,
};

MACDTooltip.defaultProps = {
	origin: [0, 0],
	displayFormat: d3.format(".2f"),
};

export default MACDTooltip;
// export default MACDTooltip;
