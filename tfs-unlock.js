var shell = {
	"exe": function (command) {
		var process = require('child_process').exec;
		if (command) {
			process(command, function (error, interpreterOutput, interpreterError) {
				console.log('\n\nInterpreter Output:\n' + interpreterOutput);
				console.log('\n\nInterpreter Error:\n' + interpreterError);
				console.log('\n\nCommand:\n' + command);
			});
		} else {
			console.log('Missing shell command\n');
		}
	}
};

exports.tfs = {
	"checkout": function (paths) {
		paths.forEach(function (path) {
			shell.exe("cd C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/ & tf.exe checkout " + path);
		});
	}
};