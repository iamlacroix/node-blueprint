// load config objects from filename == objectName
function loadConfig(path) {
  var glob   = require('glob')
    , object = {}
    , key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}

module.exports = function(grunt) {

  // project configuration.
  var config = {

    // read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    // metadata
    meta: {
      sourcePath: 'assets/',
      buildPath:  'public/',
      tmpPath:    '.tmp/assets/',
      cssPath:    'stylesheets/',
      jsPath:     'javascripts/',
      imagePath:  'images/',
      fontPath:   'fonts/'
    }

  };

  grunt.util._.extend(config, loadConfig('./tasks/config/'));
  grunt.initConfig(config);

  // load tasks
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

  // logging task
  grunt.registerMultiTask('log', 'Logging task', function() {
    if (undefined !== this.data.message) {
      grunt.log.writeln();
      grunt.log.writeln((' ' + this.data.message + ' ').blue.inverse);
    }
  });

  // grouped tasks
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

  // common tasks
  grunt.registerTask('compile', ['stylesheets', 'javascripts', 'static_assets', 'notify:compile']);
  grunt.registerTask('assets',  ['stylesheets', 'javascripts', 'static_assets', 'jshint:node', 'notify:assets', 'watch']);
  grunt.registerTask('server',  ['jshint:node', 'jshint:test', 'nodemon:dev', 'notify:nodemon']);
  grunt.registerTask('test',    ['mochaTest:all', 'notify:test']);
  grunt.registerTask('build',   ['stylesheets', 'javascripts', 'static_assets', 'jshint:node']);
  grunt.registerTask('dev',     ['build', 'concurrent:development']);

  // default task
  grunt.registerTask('default', ['dev']);

};
