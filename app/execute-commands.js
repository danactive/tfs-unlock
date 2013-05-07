var exec = require('child_process').exec;

exports.exe = function (cmd) {
	if( cmd ) {
		exec(cmd, function (error, interpreterOutput, interpreterError) {
			console.log('{"interpreterOutput":' + interpreterOutput + ',"interpreterError":"' + interpreterError + '","cmd":"' + cmd + '"}\n');
		});
	} else {
		console.log('Missing cmd.exe query string variable\n');
	}
};

console.log('command.js');