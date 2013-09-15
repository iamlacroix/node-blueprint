/*
 * watch
 */

module.exports = {

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

};
