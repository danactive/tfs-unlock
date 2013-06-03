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
wait = 3, // 4sec default delay for TFS to apply commands
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
				calleeCallback('stdout', messages.shell.stdout + message + '.');
			});
			process.stderr.on('data', function (message) {
				calleeCallback('stderr', messages.shell.stderr + message + '.');
			});
			process.on('close', function (code, signal) {
				var out = '';
				out += messages.shell.exitCode + code + '.';
				if (signal != null) {
					out += 'Child process terminated due to receipt of signal ' + signal + '.';
				}
				calleeCallback('close', out);
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

	sleeper.sleep(wait);

	return log;
};

exports.init = function (param) {
	shellCallback = param.callback;
	workingDirectory = param.visualStudioPath;
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
exports.vs2008 = {
	"bit32": 'C:/Program Files/Microsoft Visual Studio 9.0/Common7/IDE/',
	"bit64": 'C:/Program Files (x86)/Microsoft Visual Studio 9.0/Common7/IDE/'
};
exports.vs2010 = {
	"bit32": 'C:/Program Files/Microsoft Visual Studio 10.0/Common7/IDE/',
	"bit64": 'C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/'
};
exports.vs2012 = {
	"bit32": 'C:/Program Files/Microsoft Visual Studio 11.0/Common7/IDE/',
	"bit64": 'C:/Program Files (x86)/Microsoft Visual Studio 11.0/Common7/IDE/'
};

// for test suite
exports.shell = shell;
exports.messages = messages;