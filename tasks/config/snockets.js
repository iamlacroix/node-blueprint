/*
 * snockets
 */

module.exports = {

  app: {
    src: '<%= meta.sourcePath + meta.jsPath %>application.js',
    dest: '<%= meta.tmpPath + meta.jsPath %>application.js',
    minify: true
  }

};
