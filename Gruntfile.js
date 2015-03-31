'use strict';
var LIVERELOAD_PORT = 35729;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            css: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'public/css/**/*.css'
                ],
                tasks: ['cssmin']
            },
            services: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'public/js/services/*.js'
                ],
                tasks: ['uglify:services']
            },
            controllers: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'public/js/controllers/*.js'
                ],
                tasks: ['uglify:controllers']
            },
            directives: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'public/js/directives/*.js'
                ],
                tasks: ['uglify:directives']
            }
        },
        nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--nolazy',  '--harmony'],
					env: {
						PORT: '5000'
					},
					cwd: __dirname,
					ignore: ['node_modules/**'],
					watch: ['server']
				}
			}
		},
        env : {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },
        preprocess : {
            prod : {
                src : './public/index.html',
                dest : './public/index-generated.html'
            }
        },
        uglify: {
            js: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/dist/js/dependencies.min.js': [ 'public/bower_components/jquery/dist/jquery.min.js',
                                                            'public/js/vendor/*.js',
                                                            'public/bower_components/lodash/lodash.min.js',
                                                            'public/bower_components/angular/angular.min.js',
                                                            'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                                                            'public/bower_components/ng-tags-input/ng-tags-input.min.js' ],
                    'public/dist/js/services.min.js': [ 'public/js/services/*.js' ],
                    'public/dist/js/controllers.min.js': [ 'public/js/controllers/*.js' ],
                    'public/dist/js/directives.min.js': [ 'public/js/directives/*.js' ]
                }
            },
            services: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/dist/js/services.min.js': [ 'public/js/services/*.js' ]
                }
            },
            controllers: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/dist/js/controllers.min.js': [ 'public/js/controllers/*.js' ]
                }
            },
            directives: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/dist/js/directives.min.js': [ 'public/js/directives/*.js' ]
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'public/dist/css/main.css': ['public/css/vendor/*.css', 'public/css/*.css']
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, src: ['public/css/fonts/*'], dest: 'public/dist/fonts', flatten: true }
                ]
            },
        },
		concurrent: {
			dev: {
				tasks: ['env:dev', 'nodemon', 'uglify:js', 'cssmin', 'preprocess:prod', 'open', 'watch' ],
				options: {
					logConcurrentOutput: true
				}
			},
            prod: {
                tasks: ['env:prod', 'nodemon', 'uglify:js', 'cssmin', 'preprocess:prod', 'open', 'watch' ],
                options: {
                    logConcurrentOutput: true
                }
            }
		},
        bower: {
			install: {
				options: {
					targetDir: './public/bower_components'
				}
			}
		},
        open: {
            server: {
                path: 'http://localhost:5000'
            }
        }
    });

    grunt.registerTask('default', function (target) {
        grunt.task.run([ 'env:prod', 'bower:install', 'copy', 'uglify:js', 'cssmin', 'preprocess:prod' ]);
    })
    .registerTask('run-dev', function (target) {
        grunt.task.run([ 'concurrent:dev' ]);
    })
    .registerTask('run', function (target) {
        grunt.task.run([ 'concurrent:prod' ]);
    });
};
