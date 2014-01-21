process.env.NODE_ENV = 'test';

// import modules
var app  = require('../server')
  , http = require('http');

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

// export
module.exports = {
  app:  app,
  port: port,
  url:  url,

  serverUp: function (done) {
    global.server = http.createServer(app).listen(port, done);
  },

  serverDown: function (done) {
    server.close(done);
  },

  db: {
    close: function(done) {
      app.db.connection.close(done);
    },

    clear: function(model, done) {
      model.remove({}, function() {
        done();
      });
    }
  },

  urlFor: function (path) {
    path = path || '';
    if ('/' === path.charAt(0)) {
      return this.url + path;
    }
    return this.url + '/' + path;
  }

};
