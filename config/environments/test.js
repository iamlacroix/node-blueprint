var dotenv  = require('dotenv'),
    dbName  = 'nodejs_blueprint';

module.exports = function (app) {
  dotenv.load();

  // email
  var transport = require('../email/test')(app);
  app.set('email-transport', transport);

  app.set('mongodb-uri', 'mongodb://localhost/' + dbName + '_test');
};
