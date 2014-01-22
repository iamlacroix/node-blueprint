var path = require('path')
  , rack = require('asset-rack')
  , glob = require('glob')
  , _    = require('lodash')
  , SassAsset    = require('./rack-node-sass')
  , boardingPass = require('boarding-pass');

module.exports = function (app) {

  var development = 'development' === app.get('env')
    , production  = !development
    , hash;

  if (development) {
    hash = false;
  }

  function watchFoldersFor (pattern) {
    var files = glob.sync(assetPath(pattern));
    var dirs = files.map(function (file) {
      return path.dirname(path.resolve(file));
    });
    return _.uniq(dirs);
  }

  function assetPath (pathFragment) {
    return path.join(__dirname, '..', '..', 'assets', pathFragment);
  }

  var browserifyAsset = new rack.BrowserifyAsset({
    url: '/application.js',
    filename: assetPath('javascripts/application.js'),
    // external: ['jquery', 'angular', 'lodash'],
    // transform: ['es6ify'],
    transform: ['reactify', 'envify'],
    // hash: production, // Leave this as 'undefined' so that it sends both
    hash: hash,
    compress: production,
    gzip: production,
    watch: development,
    toWatch: watchFoldersFor('javascripts/**/*')
  });

  var sassAsset = new SassAsset({
    url: '/application.css',
    filename: assetPath('stylesheets/application.scss'),
    paths: boardingPass.includePaths,
    hash: hash,
    compress: production,
    gzip: production,
    watch: development,
    toWatch: watchFoldersFor('stylesheets/**/*')
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
