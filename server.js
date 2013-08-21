// new relic
if(process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

var express  = require('express')
  , http     = require('http')
  , path     = require('path');
  // , util     = require('util')
  // , moment   = require('moment')
  // , rack     = require('asset-rack')
  // , mongoose = require('mongoose');

var app = module.exports = express();

// assets
app.use(express.compress());
require('./config/assets')(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.cookieParser('_nodejs_blueprint_b2685bd0cb02e1049a903e3359c3903e3bbe'));
// app.use(express.session());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: '_nodejs_blueprint_b2685bd0cb02e1049a903e3359c3903e3bbe' }));
app.use(express.csrf());

// csrf
app.use(function(req, res, next){
  res.locals.token = req.session._csrf;
  next();
});

// config
require('./config/env')(app, express);

// include any custom middleware before this app.router
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// mongoose
// app.db = mongoose;
// app.db.connect(app.get('mongodb-uri'));

// models
// require('./config/models')(app, mongoose);

// services
// app.set('Service', require('./lib/services/service'));

// global helpers
require('./lib/helpers')(app);
app.locals.errors  = {};
app.locals.message = {};

// routes
require('./config/routes')(app);

// start server
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
  });
}
