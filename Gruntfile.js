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
      cssPath:    'stylesheets/',
      jsPath:     'javascripts/'
    },

    ////
    // Clear current compiled assets for a given task
    //
    clean: {
      stylesheets:   ["<%= meta.buildPath + meta.cssPath %>"],
      javascripts:   ["<%= meta.buildPath + meta.jsPath %>"],
      static_assets: ["<%= meta.buildPath %>fonts/", "<%= meta.buildPath %>images/"]
    },

    ////
    // Sass
    //
    sass: {
      options: {
        style: 'compressed'
      },
      dist: {
        files: {
          '<%= meta.buildPath + meta.cssPath %>application.css': '<%= meta.sourcePath + meta.cssPath %>application.scss'
        }
      }
    },

    ////
    // Snockets (JavaScripts)
    //
    snockets: {
      compile: {
        src: '<%= meta.sourcePath + meta.jsPath %>application.coffee',
        dest: '<%= meta.buildPath + meta.jsPath %>application.js'
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
          src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
        }
      },
      javascripts: {
        files: {
          src: ['<%= meta.sourcePath + meta.jsPath %>**/*.js']
        },
        options: {
          ignores: ['<%= meta.sourcePath + meta.jsPath %>vendor/**/*.js']
        }
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
            src:  ['fonts/**', 'images/**'],
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
        tasks: ['stylesheets', 'notify:stylesheets'],
      },
      javascripts: {
        files: [
          '<%= meta.sourcePath %>/**/*.coffee',
          '<%= meta.sourcePath %>/**/*.js'
        ],
        tasks: ['javascripts', 'notify:javascripts'],
      },
      jshint: {
        files: ['Gruntfile.js', 'lib/*.js', 'lib/**/*.js', 'test/*.js', 'test/**/*.js'],
        tasks: ['jshint:node', 'notify:node_jshint']
      },
      static_assets: {
        files: [
          '<%= meta.sourcePath %>fonts/**/*',
          '<%= meta.sourcePath %>images/**/*'
        ],
        tasks: ['static_assets', 'notify:static_assets']
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
          args: ['development'],
          ignoredFiles: ['/assets/*', '/public/*', 'node_modules/**'],
          watchedExtensions: ['js', 'coffee'],
          debug: true,
          cwd: __dirname
        }
      }
    },

    ////
    // Tests
    //
    mocha: {
      all: {
        src: ['test/**/*.js'],
        run: true
      }
    },

    ////
    // Notifications
    //
    notify: {
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
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-snockets');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha');

  // Grouped tasks
  grunt.registerTask('stylesheets',   ['clean:stylesheets', 'sass']);
  // grunt.registerTask('javascripts',   ['clean:javascripts', 'jshint:javascripts', 'snockets']);
  grunt.registerTask('javascripts',   ['clean:javascripts', 'snockets', 'copy:javascripts']);
  grunt.registerTask('static_assets', ['clean:static_assets', 'copy:static_assets']);
  grunt.registerTask('node_jshint',   ['jshint:node', 'notify:node_jshint']);

  // Common tasks
  grunt.registerTask('compile', ['stylesheets', 'javascripts', 'static_assets', 'notify:compile']);
  grunt.registerTask('assets',  ['stylesheets', 'javascripts', 'static_assets', 'jshint:node', 'notify:assets', 'watch']);
  grunt.registerTask('server',  ['jshint:node', 'nodemon:dev', 'notify:nodemon']);
  grunt.registerTask('test',    ['mocha', 'notify:test']);

  // Default task
  // grunt.registerTask('default', ['stylesheets', 'javascripts', 'static_assets', 'jshint:node', 'notify:generic_tasks']);
  grunt.registerTask('default', ['stylesheets', 'javascripts', 'static_assets', 'jshint:node', 'notify:generic_tasks']);

};
