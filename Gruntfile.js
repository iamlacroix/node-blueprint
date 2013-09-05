module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    //Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    ////
    // Metadata.
    //
    meta: {
      sourcePath: 'assets/',
      buildPath:  'public/',
      tmpPath:    '.tmp/assets/',
      cssPath:    'stylesheets/',
      jsPath:     'javascripts/',
      imagePath:  'images/',
      fontPath:   'fonts/'
    },

    ////
    // Clear current compiled assets for a given task
    //
    clean: {
      stylesheets:   ["<%= meta.buildPath + meta.cssPath %>"],
      javascripts:   ["<%= meta.buildPath + meta.jsPath %>"],
      static_assets: ["<%= meta.buildPath + meta.fontPath %>", "<%= meta.buildPath + meta.imagePath %>"]
    },

    ////
    // Sass
    //
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= meta.buildPath + meta.cssPath %>application.css': '<%= meta.sourcePath + meta.cssPath %>application.scss'
        }
      }
    },

    ////
    // JSHint
    //
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      node: {
        files: {
          src: [
            'Gruntfile.js',
            'app/*.js',
            'app/**/*.js',
            'lib/*.js',
            'lib/**/*.js'
          ]
        }
      },
      test: {
        options: {
          jshintrc: "test/.jshintrc"
        },
        files: {
          src: [
            'test/*.js',
            'test/**/*.js'
          ]
        }
      },
      javascripts: {
        files: {
          src: ['<%= meta.sourcePath + meta.jsPath %>**/*.js']
        },
        options: {
          ignores: [
            '<%= meta.sourcePath + meta.jsPath %>vendor/**/*.js',
            '<%= meta.sourcePath + meta.jsPath %>bower/**/*.js'
          ]
        }
      }
    },

    ////
    // Snockets (JavaScripts)
    //
    snockets: {
      app: {
        src: '<%= meta.sourcePath + meta.jsPath %>application.js',
        dest: '<%= meta.tmpPath + meta.jsPath %>application.js',
        minify: true
      }
    },

    ////
    // Neuter - combine pre-minified vendor JS into tmp file
    //
    neuter: {
      options: {
        filepathTransform: function (filepath) {
          return 'assets/javascripts/' + filepath;
        }
      },
      vendor: {
        src: '<%= meta.sourcePath + meta.jsPath %>vendor.js',
        dest: '<%= meta.tmpPath + meta.jsPath %>vendor.js',
        options: {
          template: "{%= src %}"
        }
      }
    },

    ////
    // Concat - combine both vendor & app JS into production file
    //
    concat: {
      dist: {
        src: [
          '<%= meta.tmpPath + meta.jsPath %>vendor.js',
          '<%= meta.tmpPath + meta.jsPath %>application.js'
        ],
        dest: '<%= meta.buildPath + meta.jsPath %>application.js'
      }
    },

    ////
    // Copy static assets: images, fonts
    //
    copy: {
      static_assets: {
        files: [
          {
            expand: true,
            cwd:  '<%= meta.sourcePath %>',
            src:  ['<%= meta.imagePath %>**/*', '<%= meta.fontPath %>**/*'],
            dest: '<%= meta.buildPath %>'
          }
        ]
      },
      javascripts: {
        files: [
          {
            expand: true,
            cwd:  '<%= meta.sourcePath + meta.jsPath %>vendor/',
            src:  ['selectivizr.js'],
            dest: '<%= meta.buildPath + meta.jsPath %>'
          }
        ]
      }
    },

    ////
    // Files to watch for a given task
    //
    watch: {
      stylesheets: {
        files: [
          '<%= meta.sourcePath %>/**/*.scss',
          '<%= meta.sourcePath %>/**/*.css'
        ],
        tasks: ['stylesheets', 'notify:stylesheets', 'log:stylesheets'],
      },
      javascripts: {
        files: [
          '<%= meta.sourcePath %>/**/*.coffee',
          '<%= meta.sourcePath %>/**/*.js'
        ],
        tasks: ['javascripts', 'notify:javascripts', 'log:javascripts'],
      },
      jshint: {
        files: [
          'Gruntfile.js',
          'config.js',
          'models.js',
          'routes.js',
          'app/*.js',
          'app/**/*.js',
          'lib/*.js',
          'lib/**/*.js',
          'test/*.js',
          'test/**/*.js'
        ],
        tasks: ['node_jshint']
      },
      static_assets: {
        files: [
          '<%= meta.sourcePath %>fonts/**/*',
          '<%= meta.sourcePath %>images/**/*'
        ],
        tasks: ['static_assets', 'notify:static_assets', 'log:static_assets']
      },
      livereload: {
        files: [
          '<%= meta.buildPath + meta.cssPath %>*.css'
        ],
        options: {
          livereload: true
        }
      }
    },

    ////
    // Development Server
    //
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          ignoredFiles: ['/.tmp/*', '/assets/*', '/test/*', '/public/*'],
          watchedExtensions: ['js'],
          debug: true,
          cwd: __dirname,
          env: {
            PORT: '7171',
            NODE_ENV: 'development'
          }
        }
      }
    },

    ////
    // Tests
    //
    mochaTest: {
      options: {
        reporter: 'Spec',
        timeout: 7000,
        recursive: true,
        growl: true,
        bail: false
      },
      all: {
        src: ['test/**/*_test.js']
      },
      unit: {
        src: ['test/unit/**/*_test.js']
      },
      acceptance: {
        src: ['test/integration/**/*_test.js']
      }
    },

    ////
    // Notifications
    //
    notify: {
      options: {
        platform: 'notification-center'
      },
      assets: {
        options: {
          title: 'Observing Assets',
          message: 'Assets compiled, watching for changes',
        }
      },
      compile: {
        options: {
          title: 'Assets Updated',
          message: 'All assets have been compiled',
        }
      },
      stylesheets: {
        options: {
          title: 'Stylesheets Updated',
          message: 'Stylesheets have been compiled'
        }
      },
      javascripts: {
        options: {
          title: 'JavaScripts Updated',
          message: 'JavaScripts have been compiled'
        }
      },
      node_jshint: {
        options: {
          title: 'Node.js Linted',
          message: 'Node.js files have been linted'
        }
      },
      static_assets: {
        options: {
          title: 'Static Assets Updated',
          message: 'Static assets have changed'
        }
      },
      nodemon: {
        options: {
          title: 'Sever Started',
          message: 'Development server started, will restart on changes'
        }
      },
      test: {
        options: {
          title: 'Tests Complete',
          message: 'Development server started, will restart on changes'
        }
      },
      generic_tasks: {
        options: {
          title: 'Tasks Complete',
          message: 'All tasks have properly finished'
        }
      }
    },

    ////
    // Console logging
    //
    log: {
      assets: {
        message: "Assets compiled, watching for changes"
      },
      compile: {
        message: 'All assets have been compiled',
      },
      stylesheets: {
        message: 'Stylesheets have been compiled'
      },
      javascripts: {
        message: 'JavaScripts have been compiled'
      },
      jshint: {
        message: 'JavaScripts have been linted'
      },
      static_assets: {
        message: 'Static assets have changed'
      },
      test: {
        message: 'Tests have finished'
      },
      generic_tasks: {
        message: 'All tasks have properly finished'
      }
    },

    concurrent: {
      development: {
        tasks: ['watch', 'server'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-snockets');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-concurrent');

  // Logging task
  grunt.registerMultiTask('log', 'Logging task', function() {
    if (undefined !== this.data.message) {
      grunt.log.writeln();
      grunt.log.writeln((' ' + this.data.message + ' ').blue.inverse);
    }
  });

  // Grouped tasks
  grunt.registerTask('stylesheets',   ['clean:stylesheets', 'sass']);
  grunt.registerTask('javascripts',   [
    'clean:javascripts',
    'jshint:javascripts',
    'neuter:vendor',
    'snockets:app',
    'concat:dist',
    'copy:javascripts'
  ]);
  grunt.registerTask('static_assets', ['clean:static_assets', 'copy:static_assets']);
  grunt.registerTask('node_jshint',   ['jshint:node', 'jshint:test', 'notify:node_jshint', 'log:jshint']);

  // Common tasks
  grunt.registerTask('compile', ['stylesheets', 'javascripts', 'static_assets', 'notify:compile']);
  grunt.registerTask('assets',  ['stylesheets', 'javascripts', 'static_assets', 'jshint:node', 'notify:assets', 'watch']);
  grunt.registerTask('server',  ['jshint:node', 'jshint:test', 'nodemon:dev', 'notify:nodemon']);
  grunt.registerTask('test',    ['mochaTest:all', 'notify:test']);
  grunt.registerTask('build',   ['stylesheets', 'javascripts', 'static_assets', 'jshint:node']);
  grunt.registerTask('dev',     ['build', 'concurrent:development']);

  // Default task
  grunt.registerTask('default', ['dev']);

};
