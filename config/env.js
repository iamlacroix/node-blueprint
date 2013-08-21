var dotenv = require('dotenv')();

module.exports = function(app, express) {

  var dbName = 'nodejs_blueprint';

  // development
  if ('development' === app.get('env')) {
    dotenv.load();
    app.use(express.logger('dev'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.set('mongodb-uri', 'mongodb://localhost/' + dbName + '_development');
  }

  // test
  if ('test' === app.get('env')) {
    dotenv.load();
    app.set('mongodb-uri', 'mongodb://localhost/' + dbName + '_test');
  }

  // production only
  if ('production' === app.get('env')) {
    app.use(express.logger('short'));
    app.set('mongodb-uri', process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/' + dbName + '_production');
  }

};
