
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./lib/routes')
  , user    = require('./lib/routes/user')
  , http    = require('http')
  , path    = require('path')
  , util    = require('util')
  , log     = require('minilog')('app')
  , moment  = require('moment')
  , _       = require('underscore');

require('minilog').enable();
// log.error('test');
// log.debug(process.env);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('_connect_blueprint_b2685bd0cb02e1049a903e3359c3903e3bbe'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
