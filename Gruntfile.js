'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'public/*.html',
                    'public/css/**/*.css',
                    'public/js/**/*.js'
                ]
            }
        },
        connect: {
            options: {
                port: 4000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'public'),
                            lrSnippet
                        ];
                    }
                }
            }
        },
        nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--nolazy',  '--harmony'],
					env: {
						PORT: '4000'
					},
					cwd: __dirname,
					ignore: ['node_modules/**'],
					watch: ['server']
				}
			}
		},
        copy: {
            main: {
                files: [
                    { expand: true, src: ['public/components/bootstrap/bootstrap.js'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/jquery/jquery.js'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/bootstrap/bootstrap.css'], dest: 'public/css/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/lodash/lodash.js'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/angular/angular.js'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                ]
            },
        },
		concurrent: {
			dev: {
				tasks: ['nodemon', 'connect:livereload', 'open', 'watch' ],
				options: {
					logConcurrentOutput: true
				}
			}
		},
        bower: {
			install: {
				options: {
					targetDir: './public/components'
				}
			}
		},
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });

    grunt.registerTask('default', function (target) {
        grunt.task.run([ 'bower:install', 'copy', 'connect:livereload', 'open', 'watch' ]);
    })
    .registerTask('run-dev', function (target) {
        grunt.task.run([ 'concurrent' ]);
    });
};