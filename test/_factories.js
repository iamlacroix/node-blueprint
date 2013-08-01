var _ = require('underscore');

module.exports = function(app) {

  var Model = app.db.model('Model');

  function model (params) {
    var opts = typeof params === 'object' ? params : {};
    var attrs = _.defaults(opts, { title: 'Example Title', active: true });
    return new Model(attrs);
  }

  return {
    model: model
  };

};
