process.env.NODE_ENV = 'test';

// import modules
var app  = require('../server');

// set vars
var port = 33333
  , url  = 'http://localhost:' + port;

// drop the DB after all tests are complete
// after(function(done) {
//   app.db.connection.db.dropDatabase(done);
// });

global.expect  = require('chai').expect;
global.server  = null;
global.browser = null;

var serverInit = require('./server')(app, port)
  , wdInit     = require('./wd')(serverInit);

var dbHelpers = {
  close: function(done) {
    app.db.connection.close(done);
  },

  clear: function(model, done) {
    model.remove({}, function() {
      done();
    });
  }
};

var urlHelper = function (path) {
  path = path || '';
  if ('/' === path.charAt(0)) {
    return this.url + path;
  }
  return this.url + '/' + path;
};

// export
module.exports = {
  app:  app,
  port: port,
  url:  url,
  db:   dbHelpers,

  server: serverInit,
  wd:     wdInit,

  urlFor: urlHelper
};
