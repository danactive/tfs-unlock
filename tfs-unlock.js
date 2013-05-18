var shell = {
	"exe": function (command) {
		var process = require('child_process').exec;
		if (command) {
			process(command, { "cwd": 'C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/' }, function (error, interpreterOutput, interpreterError) {
				console.log('\n\nInterpreter Output:\n' + interpreterOutput);
				console.log('\n\nInterpreter Error:\n' + interpreterError);
				console.log('\n\nCommand:\n' + command);
			});
		} else {
			console.log('Missing shell command\n');
		}
	}
};

exports.checkout = function (verifiedPaths) { // verfied meaning the path and file exisit
	verifiedPaths.forEach(function (filepath) {
		var command = "tf.exe checkout " + filepath;
		shell.exe(command);
	});
};