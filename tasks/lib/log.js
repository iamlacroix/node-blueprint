/*
 * log task
 */

module.exports = function(grunt) {

  grunt.registerMultiTask('log', 'Logging task', function() {
    if (undefined !== this.data.message) {
      grunt.log.writeln();
      grunt.log.writeln((' ' + this.data.message + ' ').blue.inverse);
    }
  });

};
