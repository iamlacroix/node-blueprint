var path = require('path')
  , rack = require('asset-rack')
  , SassAsset    = require('./rack-node-sass')
  , boardingPass = require('boarding-pass');

module.exports = function (app) {

  var development = 'development' === app.get('env')
    , production  = development;

  function assetPath (pathFragment) {
    return path.join(__dirname, '..', '..', 'assets', pathFragment);
  }

  var browserifyAsset = new rack.BrowserifyAsset({
    url: '/application.js',
    filename: assetPath('javascripts/application.js'),
    // external: ['jquery', 'angular', 'lodash'],
    // transform: ['es6ify'],
    transform: ['envify'],
    // hash: production, // Leave this as 'undefined' so that it sends both
    compress: production,
    gzip: production,
    watch: development
  });

  var sassAsset = new SassAsset({
    url: '/application.css',
    filename: assetPath('stylesheets/application.scss'),
    paths: boardingPass.includePaths,
    compress: production,
    gzip: production,
    watch: development
  });

  var imageAssets = new rack.StaticAssets({
    dirname: assetPath('images'),
    urlPrefix: '/images',
    gzip: production
  });
  var fontAssets = new rack.StaticAssets({
    dirname: assetPath('fonts'),
    urlPrefix: '/fonts',
    gzip: production
  });
  var vendorAssets = new rack.StaticAssets({
    dirname: assetPath('vendor'),
    urlPrefix: '/vendor',
    gzip: production
  });

  var assets = new rack.Rack([
    imageAssets,
    fontAssets,
    vendorAssets,
    browserifyAsset,
    sassAsset
  ]);

  app.use(assets);

};
