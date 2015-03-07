'use strict';

var Utils = require('./utils');
var MACalculator = require('./moving-average-calculator');

var OverlayUtils = {
	getToolTipLabel(props) {
		if (props.type === "sma" || props.type === "ema") {
			var tooltip = props.type.toUpperCase() + '(' + props.options.period + ')';
			return tooltip;
		}
		return 'N/A';
	},
	getYAccessor(props) {
		if (props.type === "sma" || props.type === "ema") {
			var key = props.type + props.options.period;
			return (d) => d[key];
		}
		return false;
	},
	calculateOverlay(data, overlay) {
		//console.log(overlay);
		if (overlay.type === 'sma') {
			data = MACalculator.calculateSMA(data, overlay.options.period);
		} else if (overlay.type === 'ema') {
			data = MACalculator.calculateEMA(data, overlay.options.period);
		}
		return data;
	},
	firstDefined(data, accessor) {
		var each;
		for (var i = 0; i < data.length; i++) {
			if (accessor(data[i]) === undefined) continue;
			each = data[i];
			// console.log(i, each, accessor(each));
			break;
		};
		return Utils.cloneMe(each);
	},
	lastDefined(data, accessor) {
		var each;
		for (var i = data.length - 1; i >= 0; i--) {
			if (accessor(data[i]) === undefined) continue;
			each = data[i];
			// console.log(i, each, accessor(each));
			break;
		};
		return Utils.cloneMe(each);
	}
}

module.exports = OverlayUtils;
