'use strict';

if (typeof require !== 'undefined'){
	var tfs = require('./../tfs-unlock.js');
	var expect = require('./../node_modules/expect.js/expect.js');
}

describe('Shell commands', function () {
	it('should no execute', function () {
		expect(tfs.shell.exe()).to.be(tfs.messages.shell.noCommand);
	});
	it('should fail', function (done) {
		var shellCallback = function (type, response) {
			if (type === 'stderr') {
				expect(response).to.contain(tfs.messages.shell.stderr + "\'bad_command\'");
			}
			if (type === 'close') {
				expect(response).to.be(tfs.messages.shell.exitCode + '1.');
				done();
			}
		};
		expect(tfs.shell.exe('bad_command', shellCallback)).to.be(tfs.messages.shell.beginCommand);
	});
	it('should succeed', function (done) {
		var shellCallback = function (type, response) {
			var now = new Date(),
				minutes = (now.getMinutes() <= 9) ? '0' + now.getMinutes() : now.getMinutes(),
				hours = now.getHours(),
				time = (hours <= 12) ? hours + ':' + minutes + ' AM' : (hours = hours - 12) + ':' + minutes + ' PM';
			time = (hours <= 9) ? '0' + time : time;
			if (type === 'stdout') {
				expect(response).to.be(tfs.messages.shell.stdout + time + "\r\n.");
			}
			if (type === 'close') {
				expect(response).to.be(tfs.messages.shell.exitCode + '0.');
				done();
			}
		};
		expect(tfs.shell.exe('time /T', shellCallback)).to.be(tfs.messages.shell.beginCommand);
	});
});