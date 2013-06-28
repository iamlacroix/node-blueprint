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
      node: {
        options: {
          jshintrc: ".jshintrc"
        },
        files: {
          src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
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
      jshint: {
        files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
        tasks: ['jshint:node', 'notify:jshint']
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
    // Notifications
    //
    notify: {
      assets: {
        options: {
          title: 'Assets Updated',
          message: 'All assets have been recompiled',
        }
      },
      stylesheets: {
        options: {
          title: 'Stylesheets Updated',
          message: 'Stylesheets have been recompiled',
        }
      },
      jshint: {
        options: {
          title: 'JavaScripts Linted',
          message: 'JavaScripts have passed linting',
        }
      },
      static_assets: {
        options: {
          title: 'Static Assets Updated',
          message: 'Static assets have changed',
        }
      },
      default_tasks: {
        options: {
          title: 'Tasks Complete',
          message: 'All tasks have properly finished',
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

  // Custom tasks
  grunt.registerTask('lint',          ['jshint', 'notify:jshint']);
  grunt.registerTask('stylesheets',   ['clean:stylesheets', 'sass']);
  grunt.registerTask('static_assets', ['clean:static_assets', 'copy:static_assets']);
  grunt.registerTask('assets',        ['stylesheets', 'static_assets', 'notify:assets']);

  // Default task
  grunt.registerTask('default', ['stylesheets', 'static_assets', 'jshint', 'notify:default_tasks']);

};
