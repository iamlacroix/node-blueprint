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

  // initial configuration.
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

  // merge config object with config files
  grunt.util._.extend(config, loadConfig('./tasks/config/'));
  // load config
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

  // custom tasks
  require('./tasks/lib/log')(grunt);

  // register tasks
  require('./tasks/register')(grunt);

};
