/*
 * copy
 */

module.exports = {

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
        src:  [],
        dest: '<%= meta.buildPath + meta.jsPath %>'
      }
    ]
  }

};
