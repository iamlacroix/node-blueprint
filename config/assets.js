var rack = require('asset-rack');

module.exports = function(app) {

  var opts = {
    urlPrefix: '/',
    dirname: __dirname + '/../public',
    gzip: true
  }

  // reload assets on each request in development
  if ('development' === app.get('env')) {
    opts.hash = false;
    app.use(function () {
      assets = buildAssets();
      return assets.handle.apply(assets, arguments);
    });
  }

  function buildAssets() {
    return new rack.Rack([
      new rack.StaticAssets(opts)
    ]);
  }

  var assets = buildAssets();
  app.use(assets);

};
