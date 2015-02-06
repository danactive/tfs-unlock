# tfs-unlock
	npm install tfs-unlock --save-dev

## Usage

	var tfs = require('tfs-unlock');

	tfs.init({
		"visualStudioPath": tfs.vs2013.bit64
	});

	tfs.checkout(arrayOfPaths);

	tfs.undo(arrayOfPaths);

## Changelog
* 0.3.0 2015-Feb-02
	* Rewrote without sleep dependencies by using promises
* 0.2.0 2015-Jan-24
	* Add path for VSS 2013 (v12)

## Roadmap
* Update unit tests that are currently failing