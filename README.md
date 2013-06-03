tfs-unlock
===============================

	npm install tfs-unlock

Install global dev dependencies

	npm install -g grunt-cli testem@0.2.83

API methods

	var tfs = require('./../node_modules/tfs-unlock/tfs-unlock.js');

	tfs.init({
		"visualStudioPath": tfs.vs2012.bit64
	});

	tfs.checkout(arrayOfPaths);

	tfs.undo(arrayOfPaths);