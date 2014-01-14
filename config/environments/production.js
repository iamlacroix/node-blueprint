var express   = require('express')
  , errmailer = require('errormailer')
  , dbName    = 'nodejs_blueprint'
  ;

module.exports = function (app) {

  // email
  var transport = require('../email/mandrill');
  app.set('email-transport', transport);

  // send email on exceptions
  var errorHandler = errmailer(transport, {
    subject: '[ERROR] Node.js Blueprint',
    to: 'michael@lacroixdesign.net'
  });
  app.use(errorHandler);

  app.use(express.logger('short'));
  app.set('mongodb-uri', process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/' + dbName + '_production');
};
