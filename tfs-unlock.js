/*
 * tfs-unlock
 * https://github.com/danactive/tfs-unlock
 *
 * Copyright (c) 2013 Dan BROOKS
 * Licensed under the MIT license.
 */

'use strict';

var _handlePaths,
	findVisualStudioPath,
	fs = require('fs'),
	messages = {
		"shell": {
			"beginCommand": 'Begin shell command',
			"noCommand": 'Missing shell command',
			"stderr": 'Interpreter Error: ',
			"stdout": 'Interpreter Output: ',
			"exitCode": 'Child process exited with code # '
		}
	},
	path = require('path'),
	paths,
	Q = require('q'),
	shellCallback,
	shell,
	tfs,
	wait = 3, // sec default delay for TFS to apply commands
	workingDirectory;
shell = {
	"exe": function (command, calleeCallback) {
		var process,
			deferred = Q.defer();

		if (command) {
			process = require('child_process').exec(command, {
				"cwd": workingDirectory
			});

			process.stdout.on('data', function (message) {
				deferred.notify({
					stream: 'stdout',
					message: messages.shell.stdout + message + '.'
				});

			});
			process.stderr.on('data', function (message) {
				deferred.notify({
					stream: 'stderr',
					message: messages.shell.stderr + message + '.'
				});
			});
			process.on('close', function (code, signal) {
				var out = '';
				out += messages.shell.exitCode + (code || '0') + '.';
				if (signal != null) {
					out += 'Child process terminated due to receipt of signal ' + signal + '.';
				}

				deferred.resolve({
					exitCode: code,
					message: out
				});
			});

			deferred.notify({
				message: messages.shell.beginCommand
			});
		} else {
			deferred.reject(messages.shell.noCommand);
		}

		return deferred.promise;
	}
};
tfs = function (paths, command) { // verfied meaning the path and file exisit
	var commandLine,
		exists,
		log = '',
		deferred = Q.defer();

	if (Object.prototype.toString.call(paths) !== '[object Array]') {
		throw new TypeError("paths parameter must be an array");
	}

	_handlePaths(paths, command).done(function (logs) {
		if (shellCallback) {
			shellCallback(logs);
		}

		deferred.resolve(logs);
	}, function (err) {
		deferred.reject(err);
	}, function (progress) {
		deferred.notify(progress);
	})

	return deferred.promise;
};
_handlePaths = function (paths, command) {
	return Q.all(paths.map(function (filepath) {
		var commandLine,
			deferred = Q.defer(),
			exists,
			log = '';
		filepath = fs.realpathSync(filepath); // resolve full path
		commandLine = "tf.exe " + command + " \"" + filepath + "\"";
		exists = fs.existsSync(filepath);

		if (exists) {
			shell.exe(commandLine).then(function (out) {
				log += out.message;

				if (out.exitCode && out.exitCode !== 0) {
					deferred.reject(out);
				} else {
					deferred.resolve(log);
				}
			}, function (err) {
				deferred.reject(err);
			}, function (progress) {
				if (log && progress && progress.message) {
					log += progress.message;
				}
				deferred.notify(progress);
			});

		} else {
			throw new ReferenceError('File path is not found: ' + filepath);
		}

		return deferred.promise;
	}));
};
findVisualStudioPath = function () {
	var wd;
	for (var ver in paths) {
		if (paths.hasOwnProperty(ver)) {
			for (var dirPath in paths[ver]) {
				if (paths[ver].hasOwnProperty(dirPath)) {
					if (fs.existsSync(paths[ver][dirPath]) && fs.existsSync(path.join(paths[ver][dirPath], 'tf.exe'))) {
						wd = paths[ver][dirPath];
					}
				}
			}
		}
	}
	return wd;
};

exports.init = function (param) {
	param = param || {
		callback: function () {}
	};

	shellCallback = param.callback;
	workingDirectory = param.visualStudioPath;
	if (!workingDirectory || !fs.existsSync(workingDirectory)) {
		workingDirectory = findVisualStudioPath();
	}
	wait = param.wait || wait;

};

// TFS `command-line http://msdn.microsoft.com/en-us/library/z51z7zy0(v=vs.100).aspx
exports.checkout = function (paths) {
	return tfs(paths, 'checkout');
};
exports.undo = function (paths) {
	return tfs(paths, 'undo /noprompt');
};

// Enumeration for visualStudioPath
paths = {
	vs2008: {
		"bit32": 'C:\\Program Files\\Microsoft Visual Studio 9.0\\Common7\\IDE\\',
		"bit64": 'C:\\Program Files (x86)\\Microsoft Visual Studio 9.0\\Common7\\IDE\\'
	},
	vs2010: {
		"bit32": 'C:\\Program Files\\Microsoft Visual Studio 10.0\\Common7\\IDE\\',
		"bit64": 'C:\\Program Files (x86)\\Microsoft Visual Studio 10.0\\Common7\\IDE\\'
	},
	vs2012: {
		"bit32": 'C:\\Program Files\\Microsoft Visual Studio 11.0\\Common7\\IDE\\',
		"bit64": 'C:\\Program Files (x86)\\Microsoft Visual Studio 11.0\\Common7\\IDE\\'
	},
	vs2013: {
		"bit32": 'C:\\Program Files\\Microsoft Visual Studio 12.0\\Common7\\IDE\\',
		"bit64": 'C:\\Program Files (x86)\\Microsoft Visual Studio 12.0\\Common7\\IDE\\'
	},
	vs2015: {
		"bit32": 'C:\\Program Files\\Microsoft Visual Studio 14.0\\Common7\\IDE\\',
		"bit64": 'C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\Common7\\IDE\\'
	}
};

exports.vs2008 = paths.vs2008;
exports.vs2010 = paths.vs2010;
exports.vs2012 = paths.vs2012;
exports.vs2013 = paths.vs2013;
exports.vs2015 = paths.vs2015;

// for test suite
exports.shell = shell;
exports.messages = messages;
