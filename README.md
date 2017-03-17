# tfs-unlock
	npm install tfs-unlock --save-dev

[![npm version](https://badge.fury.io/js/tfs-unlock.svg)](http://badge.fury.io/js/tfs-unlock)
[![Dependencies Status](https://david-dm.org/danactive/tfs-unlock.svg)](https://david-dm.org/danactive/tfs-unlock)
[![DevDependencies Status](https://david-dm.org/danactive/tfs-unlock/dev-status.svg)](https://david-dm.org/danactive/tfs-unlock#info=devDependencies)
[![MIT Licensed](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## Usage

	var tfs = require('tfs-unlock');

	tfs.init({
		"visualStudioPath": tfs.vs2013.bit64
	});

	tfs.checkout(arrayOfPaths);

	tfs.undo(arrayOfPaths);

## Changelog
* 0.6.0 2017-Mar-16
	* Add path for VS 2017 (v15)
	* Update dev dependencies
* 0.5.0 2016-Mar-15
	* Update dev dependencies
	* Lint passes
* 0.4.0 2016-Mar-15
	* Environment variables - Uses the visual studio environment variables, VS140COMNTOOLS, VS120COMNTOOLS,and VS110COMNTOOLS which are added to the system to find tf.exe before rolling back to the hardcoded paths.
* 0.3.5 2015-Aug-17
	* Restore q (v1) dependency due to missing notify method
* 0.3.4 2015-Aug-09
	* Add path for VS 2015 (v14)
	* Update q (v2) dependency and other minor bumps
* 0.3.3 2015-Mar-19
	* Allow white space in file path
* 0.3.2 2015-Feb-26
	* Update q dependency
* 0.3.1 2015-Feb-16
	* Unit tests pass
* 0.3.0 2015-Feb-02
	* Rewrote without sleep dependencies by using promises
* 0.2.0 2015-Jan-24
	* Add path for VS 2013 (v12)

## Roadmap
* Update unit tests that are currently failing