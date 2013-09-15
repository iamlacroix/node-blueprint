/*
 * jshint
 */

module.exports = {

  options: {
    jshintrc: ".jshintrc"
  },

  node: {
    files: {
      src: [
        'Gruntfile.js',
        'app/*.js',
        'app/**/*.js',
        'lib/*.js',
        'lib/**/*.js'
      ]
    }
  },

  test: {
    options: {
      jshintrc: "test/.jshintrc"
    },
    files: {
      src: [
        'test/*.js',
        'test/**/*.js'
      ]
    }
  },

  javascripts: {
    files: {
      src: ['<%= meta.sourcePath + meta.jsPath %>**/*.js']
    },
    options: {
      ignores: [
        '<%= meta.sourcePath + meta.jsPath %>vendor/**/*.js',
        '<%= meta.sourcePath + meta.jsPath %>bower/**/*.js'
      ]
    }
  }

};
