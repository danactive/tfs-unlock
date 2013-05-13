exports.exe = function (cmd) {
	var shell = require('child_process').exec;
	if (cmd) {
		shell(cmd, function (error, interpreterOutput, interpreterError) {
			console.log('\n\nInterpreter Output:\n' + interpreterOutput);
			console.log('\n\nInterpreter Error:\n' + interpreterError);
			console.log('\n\ncmd:\n' + cmd);
		});
	} else {
		console.log('Missing shell command\n');
	}
};