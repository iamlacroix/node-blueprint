/*
 * concat
 */

module.exports = {

  dist: {
    src: [
      '<%= meta.tmpPath + meta.jsPath %>vendor.js',
      '<%= meta.tmpPath + meta.jsPath %>application.js'
    ],
    dest: '<%= meta.buildPath + meta.jsPath %>application.js'
  }

};
