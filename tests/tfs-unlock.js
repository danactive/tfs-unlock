'use strict';

if (typeof require !== 'undefined'){
	var tfs = require('./../tfs-unlock.js');
	var expect = require('./../node_modules/expect.js/expect.js');
}

describe('Shell commands', function () {
	it('should no being', function () {
		expect(tfs.shell.exe()).to.be(tfs.messages.shell.noCommand);
	});
	it('should begin', function () {
		expect(tfs.shell.exe('bad_command')).to.be(tfs.messages.shell.beginCommand);
	});
});