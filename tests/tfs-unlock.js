/*
'use strict';

if (typeof require !== 'undefined'){
	var tfs = require('./../tfs-unlock.js');
	var expect = require('./../node_modules/expect.js/expect.js');
}
*/
var expect = require('./../node_modules/expect.js/expect.js');

describe('hello', function(){
	it('should say hello', function () {
		expect('hi').to.be('hi');
	});
	it('should say hello to person');
});