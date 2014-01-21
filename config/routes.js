var controllers = require('../app/controllers');

module.exports = function(app) {
  app.get('/', controllers.static.index);
  app.get('/react', controllers.react.index);
  // app.get('/model', require('../app/controllers/model').index);
  // app.get('/model/new', require('../app/controllers/model').new);
  // app.post('/model/new', require('../app/controllers/model').create);
  // app.get('/model/:id', require('../app/controllers/model').show);
  // app.get('/model/:id/edit', require('../app/controllers/model').edit);
  // app.post('/model/:id', require('../app/controllers/model').update);
};
