var expect = require('chai').expect;
var ss = require('..');


describe('stringSort.transform() / .untransform()', function() {

	it('should construct a translation table', function() {
		expect(ss.transformTable('abc')).to.deep.equal({a: 'A', b: 'B', c: 'C'});
		expect(ss.transformTable('cba')).to.deep.equal({a: 'C', b: 'B', c: 'A'});
	});
	
	it('should transform directly', function() {
		expect(ss.transform('abc')).to.equal('ABC');
		expect(ss.transform('ABC')).to.equal('﷨﷨﷨');
	});

	it('should transform when given a different charOrder', function() {
		expect(ss.transform('abc', {charOrder: 'cba'})).to.equal('CBA');
		expect(ss.transform('CBA', {charOrder: 'cba'})).to.equal('﷨﷨﷨');
	});

});

describe('stringSort.sort()', function() {

	it('should sort regular strings', function() {
		expect(ss.sort(['c', 'a', 'b'])).to.be.deep.equal(['a', 'b', 'c']);
	});

	it('should sort regular strings (with custom charOrder)', function() {
		expect(ss.sort(['c', 'a', 'b'], {charOrder: 'abcedf'})).to.be.deep.equal(['a', 'b', 'c']);
		expect(ss.sort(['c', 'a', 'b'], {charOrder: 'fedcba'})).to.be.deep.equal(['c', 'b', 'a']);
		expect(ss.sort(['c', 'a', 'b'], {charOrder: 'ac'})).to.be.deep.equal(['a', 'c', 'b']);
		expect(ss.sort(['a', 'b', 'c', 'd', 'e', 'f'], {charOrder: 'abdef'})).to.be.deep.equal(['a', 'b', 'd', 'e', 'f', 'c']);
		expect(ss.sort(['a', 'b', 'c', '1', '5', '9'], {charOrder: '0123456789abcdefghijklmnopqrstuvwxyz'})).to.be.deep.equal(['1', '5', '9', 'a', 'b', 'c']);
	});

	it('should sort different length strings', function() {
		var a = ['cat', 'catfish', 'caveman', 'cats', 'catsuit', 'caves', 'cave-in', 'caution'];

		expect(ss.sort(a)).to.be.deep.equal(['cat', 'catfish', 'cats', 'catsuit', 'caution', 'caveman', 'caves', 'cave-in']);
		expect(ss.sort(a, {charOrder: '-abcdefghijklmnopqrstuvwxyz0123456789'})).to.be.deep.equal(['cat', 'catfish', 'cats', 'catsuit', 'caution', 'cave-in', 'caveman', 'caves']);
	});
	
});

describe('stringSort.sortBy()', function() {

	it('should sort collections by a subkey', function() {
		var people = [
			{name: 'Joe', age: 22},
			{name: 'John', age: 23},
			{name: 'Josh', age: 34},
			{name: 'Jon', age: 43},
		];

		// Standard alpha sort
		expect(ss.sortBy(people, 'name', {charOrder: 'abcedfghijklmnopqrstuvwxyz'}).map(i => i.name)).to.be.deep.equal(['Joe', 'John', 'Jon', 'Josh']);

		// Value the letter 'N' more than anything else
		expect(ss.sortBy(people, 'name', {charOrder: 'nabcedfghijklmopqrstuvwxyz'}).map(i => i.name)).to.be.deep.equal(['Jon', 'Joe', 'John', 'Josh']);
	});

});
