var callback,
shell = {
	"exe": function (command) {
		var process = require('child_process').exec,
			child;
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
					console.log('child process terminated due to receipt of signal ' + signal + '.');
				}
			});

			return "Begin shell command";
		} else {
			return 'Missing shell command';
		}
	}
},
tfs = function (verifiedPaths, command) { // verfied meaning the path and file exisit
	var log = '';
	verifiedPaths.forEach(function (filepath) {
		var commandLine = "tf.exe " + command + " " + filepath;
		log += shell.exe(commandLine);
	});
	if (callback) {
		callback();
	}
	return log;
},
workingDirectory;

exports.init = function (param) {
	callback = param.callback;
	workingDirectory = param.visualStudioPath;
};

// TFS command-line http://msdn.microsoft.com/en-us/library/z51z7zy0(v=vs.100).aspx
exports.checkout = function (verifiedPaths) {
	return tfs(verifiedPaths, 'checkout');
};
exports.undo = function (verifiedPaths) {
	return tfs(verifiedPaths, 'undo /noprompt');
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