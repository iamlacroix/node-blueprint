var express   = require('express')
  , path      = require('path')
  // , util     = require('util')
  // , moment   = require('moment')
  // , rack     = require('asset-rack')
  // , mongoose = require('mongoose');
  ;

function useCsrf (app) {
  app.use(express.csrf());
  app.use(function (req, res, next) {
    res.locals.token = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
}

module.exports = function (app) {

  // env config
  switch (app.get('env')) {
    case 'production':
      require('./environments/production')(app);
      useCsrf(app);
      break;
    case 'test':
      require('./environments/test')(app);
      break;
    default:
      require('./environments/development')(app);
      useCsrf(app);
      break;
  }

  // assets
  app.use(express.compress());
  require('./assets')(app);

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', process.cwd() + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.cookieSession({ secret: '_nodejs_blueprint_b2685bd0cb02e1049a903e3359c3903e3bbe' }));

  // include any custom middleware before this app.router
  app.use(app.router);
  app.use(express.static(path.join(process.cwd(), 'public')));

  // mongoose
  // app.db = mongoose;
  // app.db.connect(app.get('mongodb-uri'));

  // models
  // require('./models')(app, mongoose);

  // services
  // app.set('Service', require('../lib/services/service'));

  // global helpers
  require('../lib/helpers')(app);
  app.locals.errors  = {};
  app.locals.message = {};

  // routes
  require('./routes')(app);

  // errors
  // app.error(function (err, req, res, next) {
  //   var stack = err.stack;
  //   console.error(stack);
  //   res.send(500, 'Something broke!');
  // });

};
