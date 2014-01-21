var http = require('http');

module.exports = function (app, port) {
  return function() {

    before(function (done) {
      global.server = http.createServer(app).listen(port, done);
    });

    after(function (done) {
      server.close(done);
    });

  };
};
