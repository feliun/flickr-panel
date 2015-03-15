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
        uglify: {
            js: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/dist/js/dependencies.min.js': [ 'public/js/vendor/jquery.min.js',
                                                            'public/js/vendor/bootstrap-shop.min.js',
                                                            'public/js/vendor/lodash.min.js',
                                                            'public/js/vendor/angular.min.js' ],
                    'public/dist/js/controllers.min.js': [ 'public/js/controllers/*.js' ],
                    'public/dist/js/directives.min.js': [ 'public/js/directives/*.js' ]
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'public/dist/css/main.css': ['public/css/*.css']
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, src: ['public/components/jquery/dist/jquery.min.js'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/jquery/dist/jquery.min.map'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/lodash/lodash.min.js'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/angular/angular.min.js'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
                    { expand: true, src: ['public/components/angular/angular.min.js.map'], dest: 'public/js/vendor/', flatten: true, filter: 'isFile' },
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
        grunt.task.run([ 'bower:install', 'copy', 'uglify:js', 'cssmin', 'connect:livereload', 'open', 'watch' ]);
    })
    .registerTask('run-dev', function (target) {
        grunt.task.run([ 'concurrent' ]);
    });
};