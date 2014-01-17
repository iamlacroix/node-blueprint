var express = require('express'),
    dotenv  = require('dotenv'),
    dbName  = 'nodejs_blueprint';

module.exports = function (app) {
  dotenv.load();

  // email
  var transport = require('../email/preview');
  app.set('email-transport', transport);

  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  app.set('mongodb-uri', 'mongodb://localhost/' + dbName + '_development');
};
