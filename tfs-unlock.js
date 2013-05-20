/*
* tfs-unlock
* https://github.com/danactive/tfs-unlock
*
* Copyright (c) 2013 Dan BROOKS
* Licensed under the MIT license.
*/

'use strict';

var callback,
fs = require('fs'),
workingDirectory,
messages = {
	"shell": {
		"beginCommand": 'Begin shell command',
		"noCommand": 'Missing shell command'
	}
},
shell = {
	"exe": function (command) {
		var child,
			process = require('child_process').exec;
		if (command) {
			child = process(command, { "cwd": workingDirectory });

			child.stdout.on('data', function (data) {
				console.log('Interpreter Output: ' + data + '.');
			});
			child.stderr.on('data', function (data) {
				console.log('Interpreter Error: ' + data + '.');
			});
			child.on('close', function (code, signal) {
				console.log('Child process exited with code # ' + code + '.');
				if (signal !== null) {
					console.log('Child process terminated due to receipt of signal ' + signal + '.');
				}
			});

			return messages.shell.beginCommand;
		} else {
			return messages.shell.noCommand;
		}
	}
},
tfs = function (paths, command) { // verfied meaning the path and file exisit
	var log = '';
	paths.forEach(function (filepath) {
		var commandLine = "tf.exe " + command + " " + filepath;
		fs.exists(filepath, function (exists) {
			if (exists) {
				log += shell.exe(commandLine);
				if (callback) {
					callback();
				}
			} else {
				console.log('File path: ' + filepath + ' is not found.');
			}
		});
	});
	return log;
};

exports.init = function (param) {
	callback = param.callback;
	workingDirectory = param.visualStudioPath;
};

// TFS command-line http://msdn.microsoft.com/en-us/library/z51z7zy0(v=vs.100).aspx
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