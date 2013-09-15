/*
 * mochaTest
 */

module.exports = {

  options: {
    reporter: 'Spec',
    timeout: 7000,
    recursive: true,
    growl: true,
    bail: false
  },

  all: {
    src: ['test/**/*_test.js']
  },

  unit: {
    src: ['test/unit/**/*_test.js']
  },

  acceptance: {
    src: ['test/integration/**/*_test.js']
  }

};
