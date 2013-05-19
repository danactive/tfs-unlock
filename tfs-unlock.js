var shell = {
	"exe": function (command) {
		var process = require('child_process').exec,
			child;
		if (command) {
			child = process(command, { "cwd": 'C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/' });

			child.stdout.on('data', function (data) {
				console.log('Interpreter Output: ' + data);
			});
			child.stderr.on('data', function (data) {
				console.log('Interpreter Error: ' + data);
			});
			child.on('close', function (code) {
				console.log('Child process exited with code ' + code);
			});

			return "Begin shell command";
		} else {
			return 'Missing shell command';
		}
	}
},
tfs = function (verifiedPaths, command, callback) { // verfied meaning the path and file exisit
	var log = '';
	verifiedPaths.forEach(function (filepath) {
		var commandLine = "tf.exe " + command + " " + filepath;
		log += shell.exe(commandLine);
	});
	callback();
	return log;
};

exports.checkout = function (verifiedPaths, callback) {
	return tfs(verifiedPaths, 'checkout', callback);
};

exports.undo = function (verifiedPaths, callback) {
	return tfs(verifiedPaths, 'undo /noprompt', callback);
};