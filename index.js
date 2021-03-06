var _ = require('lodash');

var ss = module.exports = {
	defaults: {
		charOrder: 'abcdefghijklmnopqrstuvwxyz0123456789:/-_', // Character orders when comparing string positions (anything not here gets run via fallback())
		fallback: c => {
			return String.fromCharCode(65000);
		},
	},

	transformTable: function(str) {
		var table = {};
		str.split('').forEach((c,i) => table[c] = String.fromCharCode(i + 65));
		return table;
	},

	transform: function(str, options) {
		var settings = _.defaults(options, this.defaults);
		var table = this.transformTable(settings.charOrder);

		return str.split('').map(c => table[c] || settings.fallback(c)).join('');
	},

	untransform: function(str, options) {
		var settings = _.defaults(options, this.defaults);
		var table = _.invert(ss.transformTable(settings));

		return str.split('').map(c => table[c]).join('');
	},

	sort: function(arr, options) {
		var settings = _.defaults(options, this.defaults);
		var table = ss.transformTable(settings.charOrder);

		return arr
			.map(i => [i.split('').map(c => table[c] || settings.fallback(c)).join(''), i])
			.sort((a,b) => a[0] == b[0] ? 0 : a[0] > b[0] ? 1 : -1)
			.map(i => i[1])
	},

	sortBy: function(col, key, options) {
		var settings = _.defaults(options, this.defaults);
		var table = ss.transformTable(settings.charOrder);

		return col
			.map(i => [i[key].split('').map(c => table[c] || settings.fallback(c)).join(''), i])
			.sort((a,b) => a[0] == b[0] ? 0 : a[0] > b[0] ? 1 : -1)
			.map(i => i[1])
	},
};
