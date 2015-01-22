/*
* tfs-unlock
* https://github.com/danactive/tfs-unlock
*
* Copyright (c) 2013 Dan BROOKS
* Licensed under the MIT license.
*/

'use strict';

var fs = require('fs'),
shellCallback,
wait = 3, // sec default delay for TFS to apply commands
workingDirectory,
messages = {
	"shell": {
		"beginCommand": 'Begin shell command',
		"noCommand": 'Missing shell command',
		"stderr": 'Interpreter Error: ',
		"stdout": 'Interpreter Output: ',
		"exitCode": 'Child process exited with code # '
	}
},
shell = {
	"exe": function (command, calleeCallback) {
		var process;
		if (command) {
			process = require('child_process').exec(command, { "cwd": workingDirectory });

			process.stdout.on('data', function (message) {
				if (calleeCallback) {
					calleeCallback('stdout', messages.shell.stdout + message + '.');
				}
			});
			process.stderr.on('data', function (message) {
				if (calleeCallback) {
					calleeCallback('stderr', messages.shell.stderr + message + '.');
				}
			});
			process.on('close', function (code, signal) {
				var out = '';
				out += messages.shell.exitCode + (code || '') + '.';
				if (signal != null) {
					out += 'Child process terminated due to receipt of signal ' + signal + '.';
				}
				if (calleeCallback) {
					calleeCallback('close', out);
				}
			});

			return messages.shell.beginCommand;
		} else {
			return messages.shell.noCommand;
		}
	}
},
tfs = function (paths, command) { // verfied meaning the path and file exisit
	var sleeper = require('sleep'),
		commandLine,
		exists,
		log = '';
	if( Object.prototype.toString.call( paths ) !== '[object Array]' ) {
		throw new TypeError("paths parameter must be an array");
	}
	paths.forEach(function (filepath) {
		filepath = fs.realpathSync(filepath); // resolve full path
		commandLine = "tf.exe " + command + " " + filepath;
		exists = fs.existsSync(filepath);
		if (exists) {
			shell.exe(commandLine);
			log += "\n" + filepath;
			if (shellCallback) {
				shellCallback();
			}
		} else {
			throw new ReferenceError('File path is not found: ' + filepath);
		}
	});

	if (wait && wait > 0) {
		sleeper.sleep(wait);
	}

	return log;
},
findVisualStudioPath = function () {
	var wd;
	for (var ver in paths) {
		if (paths.hasOwnProperty(ver)) {
			for (var path in paths[ver]) {
				if (paths[ver].hasOwnProperty(path)) {
					if (fs.existsSync(paths[ver][path])) {
						wd = paths[ver][path];
					}
				}
			}
		}
	}
	return wd;
};

exports.init = function (param) {
	param = param || {
		callback: function () { }
	};
	
	shellCallback = param.callback;
	workingDirectory = param.visualStudioPath;
	if (!workingDirectory || !fs.existsSync(workingDirectory)) {
		workingDirectory = findVisualStudioPath();
	}
	wait = param.wait || wait;
	
};

// TFS `mmand-line http://msdn.microsoft.com/en-us/library/z51z7zy0(v=vs.100).aspx
exports.checkout = function (paths) {
	return tfs(paths, 'checkout');
};
exports.undo = function (paths) {
	return tfs(paths, 'undo /noprompt');
};

// Enumeration for visualStudioPath
var paths = {
	vs2008: {
		"bit32": 'C:/Program Files/Microsoft Visual Studio 9.0/Common7/IDE/',
		"bit64": 'C:/Program Files (x86)/Microsoft Visual Studio 9.0/Common7/IDE/'
	},
	vs2010: {
		"bit32": 'C:/Program Files/Microsoft Visual Studio 10.0/Common7/IDE/',
		"bit64": 'C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/'
	},
	vs2012: {
		"bit32": 'C:/Program Files/Microsoft Visual Studio 11.0/Common7/IDE/',
		"bit64": 'C:/Program Files (x86)/Microsoft Visual Studio 11.0/Common7/IDE/'
	},
	vs2013: {
		"bit32": 'C:/Program Files/Microsoft Visual Studio 12.0/Common7/IDE/',
		"bit64": 'C:/Program Files (x86)/Microsoft Visual Studio 12.0/Common7/IDE/'
	}
};

exports.vs2008 = paths.vs2008;
exports.vs2010 = paths.vs2010;
exports.vs2012 = paths.vs2012;
exports.vs2013 = paths.vs2013;

// for test suite
exports.shell = shell;
exports.messages = messages;