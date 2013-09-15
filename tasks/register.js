/*
 * register tasks
 */

module.exports = function(grunt) {

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
