var expect = require('chai').expect;
var ss = require('..');

describe('stringSort.compare()', function() {

	it('should sort regular numbers', function() {
		expect(ss.sort([7, 14, 4, 5, 2])).to.be.deep.equal([2, 4, 5, 7, 14]);
	});

	it('should sort regular strings', function() {
		expect(ss.sort(['c', 'a', 'b'])).to.be.deep.equal(['a', 'b', 'c']);
	});

	it('should sort regular strings (with custom charOrder)', function() {
		expect(ss.sort(['c', 'a', 'b'], {charOrder: 'abcedf'})).to.be.deep.equal(['a', 'b', 'c']);
		expect(ss.sort(['c', 'a', 'b'], {charOrder: 'fedcba'})).to.be.deep.equal(['c', 'b', 'a']);
		expect(ss.sort(['c', 'a', 'b'], {charOrder: 'ac'})).to.be.deep.equal(['a', 'c', 'b']);
		expect(ss.sort(['a', 'b', 'c', 'd', 'e', 'f'], {charOrder: 'abdef'})).to.be.deep.equal(['a', 'b', 'd', 'e', 'f', 'c']);
	});
	
});
