var express = require('express'),
    dbName  = 'nodejs_blueprint';

module.exports = function (app) {
  require('dotenv')().load();

  // email
  var transport = require('../email/preview');
  app.set('email-transport', transport);

  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  app.set('mongodb-uri', 'mongodb://localhost/' + dbName + '_development');
};
