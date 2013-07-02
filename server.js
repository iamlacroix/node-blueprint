
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./lib/routes')
  , user    = require('./lib/routes/user')
  , http    = require('http')
  , path    = require('path')
  , util    = require('util')
  , moment  = require('moment')
  , _       = require('underscore')
  , rack    = require('asset-rack');

var app = module.exports = express();

// Assets
app.use(express.compress());
var assets = new rack.Rack([
  new rack.StaticAssets({
    urlPrefix: '/',
    dirname: __dirname + '/public',
    gzip: true
  })
]);
app.use(assets);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('_connect_blueprint_b2685bd0cb02e1049a903e3359c3903e3bbe'));
app.use(express.session());

// Dynamic helpers
app.use(function(req, res, next) {
  require('./lib/helpers_dynamic')(req, res);
  next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// Global helpers
require('./lib/helpers')(app);

// Routes
app.get('/', routes.index);
app.get('/users', user.list);

// Start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
