var ss = module.exports = {
	defaults: {
		charOrder: 'abcdefghijklmnopqrstuvwxyz0123456789:/-_', // Character orders when comparing string positions (anything not here gets the ascii value)
	},

	sort: function(arr, options) {
		arr.sort((a, b) => ss.compare(a, b, options));
		return arr;
	},

	compare: function(a, b, options) {
		if (a == b) return 0;
		return a > b ? 1 : -1;
	},
};
