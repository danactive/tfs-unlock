/*
* grunt-tfs-unlock
* https://github.com/danactive/grunt-tfs-unlock
*
* Copyright (c) 2013 Dan BROOKS
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'*.js',
				'*.json',
				'tests/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);

};
