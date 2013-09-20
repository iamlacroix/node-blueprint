/*
 * nodemon
 */

var path = require('path');

module.exports = {

  dev: {
    options: {
      file: 'server.js',
      ignoredFiles: ['/.tmp/*', '/assets/*', '/test/*', '/public/*'],
      watchedExtensions: ['js'],
      debug: true,
      cwd: path.join(__dirname, '..', '..'),
      env: {
        PORT: '7171',
        NODE_ENV: 'development',
        CPU_CORES: '2'
      }
    }
  }

};
