exports.tfsCheckout = function (cmd) {
	var cmd = require('./execute-commands.js');
	cmd.exe("cd C:/Program Files (x86)/Microsoft Visual Studio 10.0/Common7/IDE/ & tf.exe checkout C:/web/RDC/Realtor/MVC.realtor.com/Maintenance/Move.Realtor.Web/App_Data/Environment/QA.Environment.config");
};