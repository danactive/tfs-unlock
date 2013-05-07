var exec = require('child_process').exec;

exports.exe = function (cmd) {
	if( cmd ) {
		exec(cmd, function (error, interpreterOutput, interpreterError) {
			console.log('\n\nInterpreter Output:\n' + interpreterOutput);
			console.log('\n\nInterpreter Error:\n' + interpreterError);
			console.log('\n\ncmd:\n' + cmd);
		});
	} else {
		console.log('Missing cmd.exe query string variable\n');
	}
};

console.log('command.js');