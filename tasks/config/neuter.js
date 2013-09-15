/*
 * neuter
 */

module.exports = {

  options: {
    filepathTransform: function (filepath) {
      return 'assets/javascripts/' + filepath;
    }
  },

  vendor: {
    src: '<%= meta.sourcePath + meta.jsPath %>vendor.js',
    dest: '<%= meta.tmpPath + meta.jsPath %>vendor.js',
    options: {
      template: "{%= src %}"
    }
  }

};
