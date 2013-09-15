/*
 * sass
 */

module.exports = {

  dist: {
    options: {
      outputStyle: 'compressed',
      includePaths: require('boarding-pass').includePaths
    },
    files: {
      '<%= meta.buildPath + meta.cssPath %>application.css': '<%= meta.sourcePath + meta.cssPath %>application.scss'
    }
  }

};
