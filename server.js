var cluster = require('cluster'),
    cores   = process.env.CPU_CORES || 1,
    express = require('express'),
    http    = require('http');

if (cluster.isMaster && !module.parent) {
  for (var i = 0; i < cores; i++)
    cluster.fork();
} else {

  // new relic
  if (process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
  }

  // init app
  var app = module.exports = express();
  require('./config')(app);

  // start server
  if (!module.parent) {
    http.createServer(app).listen(app.get('port'), function () {
      console.log('Server listening on port ' + app.get('port'));
    });
  }

}
