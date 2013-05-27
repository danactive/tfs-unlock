'use strict';

if (typeof require !== 'undefined'){
	var tfs = require('./../tfs-unlock.js');
	var expect = require('./../node_modules/expect.js/expect.js');
}

describe('Shell commands', function () {
	it('should no being', function () {
		expect(tfs.shell.exe()).to.be(tfs.messages.shell.noCommand);
	});
	it('should begin', function (done) {
		var shellCallback = function (type, response) {
			if (type === 'stderr') {
				expect(response).to.contain(tfs.messages.shell.stderr + "\'bad_command\'");
			}
			if (type === 'close') {
				expect(response).to.contain(tfs.messages.shell.exitCode);
				done();
			}
		};
		expect(tfs.shell.exe('bad_command', shellCallback)).to.be(tfs.messages.shell.beginCommand);
	});
});