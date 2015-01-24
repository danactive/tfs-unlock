# tfs-unlock
	npm install tfs-unlock --save-dev

## API methods

	var tfs = require('./../node_modules/tfs-unlock/tfs-unlock.js');

	tfs.init({
		"visualStudioPath": tfs.vs2013.bit64
	});

	tfs.checkout(arrayOfPaths);

	tfs.undo(arrayOfPaths);

## Changelog
	* 0.2.0 2015-Jan-24
		* Add path for VSS 2013 (v12)

## Dependencies
	* Test framework
		* `npm install -g grunt-cli testem@0.2.83`