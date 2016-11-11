var _ = require('lodash');

var ss = module.exports = {
	defaults: {
		charOrder: 'abcdefghijklmnopqrstuvwxyz0123456789:/-_', // Character orders when comparing string positions (anything not here gets run via fallback())
		fallback: c => 999,
	},

	sort: function(arr, options) {
		arr.sort((a, b) => ss.compare(a, b, options));
		return arr;
	},

	compare: function(a, b, options) {
		var settings = _.defaults(options, this.defaults);

		if (_.isNumber(a) && _.isNumber(b)) {
			if (a == b) return 0;
			return a > b ? 1 : -1;
		} else if (_.isString(a) && _.isString(b)) {
			for (var i = 0; i < Math.min(a.length, b.length); i++) {
				var aChar = a.substr(i, 1), bChar = b.substr(i, 1);
				var aVal = settings.charOrder.indexOf(aChar), bVal = settings.charOrder.indexOf(bChar);
				if (aVal < 0) aVal = settings.fallback(aChar);
				if (bVal < 0) bVal = settings.fallback(bChar);

				if (aVal > bVal) return 1;
				if (bVal < aVal) return -1;
				// Equal values continue looping
			}
		}
	},
};
