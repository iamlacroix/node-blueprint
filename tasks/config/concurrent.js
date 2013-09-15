/*
 * concurrent
 */

module.exports = {

  development: {
    tasks: ['watch', 'server'],
    options: {
      logConcurrentOutput: true
    }
  }

};
