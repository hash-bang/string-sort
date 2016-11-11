var expect = require('chai').expect;
var ss = require('..');

describe('stringSort.compare()', function() {

	it('should sort regular strings', function() {
		expect(ss.sort(['c', 'a', 'b'])).to.be.deep.equal(['a', 'b', 'c']);
	});
	
});
