'use strict';

if (typeof require !== 'undefined') {
	var expect = require('expect.js'),
		tfs = require('./../tfs-unlock.js');
}

describe('Shell commands', function () {
	it('should no execute', function () {

		return tfs.shell.exe().then(function (output) {
			expect(output).to.be(tfs.messages.shell.noCommand);
		}, function (err) {
			expect(err).to.be(tfs.messages.shell.noCommand);
		});
	});
	it('should fail', function () {
		return tfs.shell.exe('bad_command').then(function (status) {
			expect(status.message).to.be(tfs.messages.shell.exitCode + '1.');
		}, function (err) {
			expect(err).to.be(null);
		}, function (progress) {
			if (progress.stream === 'stderr') {
				expect(progress.message).to.contain(tfs.messages.shell.stderr + "\'bad_command\'");
			}
			if (!progress.stream) {
				expect(progress.message).to.be(tfs.messages.shell.beginCommand);
			}
		});
	});
	it('should succeed', function () {
		return tfs.shell.exe('time /T').then(function (status) {
			expect(status.message).to.be(tfs.messages.shell.exitCode + '0.');
		}, function (err) {
			expect(err).to.be(null);
		}, function (progress) {
			var now = new Date(),
				minutes = (now.getMinutes() <= 9) ? '0' + now.getMinutes() : now.getMinutes(),
				hours = now.getHours(),
				time = (hours <= 12) ? hours + ':' + minutes + ' AM' : (hours = hours - 12) + ':' + minutes + ' PM';
			time = (hours <= 9) ? '0' + time : time;

			if (progress.stream === 'stdout') {
				if(progress.message.indexOf('AM') > 0 || progress.message.indexOf('PM') > 0) {
					expect(progress.message).to.be(tfs.messages.shell.stdout + time + "\r\n.");
				} else {
					expect(progress.message).to.be(tfs.messages.shell.stdout + time.replace(' PM','').replace(' AM','') + "\r\n.");
				}
			}
			if (!progress.stream) {
				expect(progress.message).to.be(tfs.messages.shell.beginCommand);
			}
		});
	});
});
