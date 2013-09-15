/*
 * sass
 */

module.exports = {

  dist: {
    options: {
      outputStyle: 'compressed'
    },
    files: {
      '<%= meta.buildPath + meta.cssPath %>application.css': '<%= meta.sourcePath + meta.cssPath %>application.scss'
    }
  }

};
