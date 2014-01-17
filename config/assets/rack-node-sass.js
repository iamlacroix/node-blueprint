var path  = require('path')
  , Asset = require('asset-rack').Asset
  , sass  = require('node-sass');

var urlRegex = /url\s*\(\s*(['"])((?:(?!\1).)+)\1\s*\)/
  , urlRegexGlobal = /url\s*\(\s*(['"])((?:(?!\1).)+)\1\s*\)/g;

var SassAsset = Asset.extend({
  mimetype: 'text/css',

  postProcess: function (css) {
    var match, quote, result, results, specificUrl, url, _i, _len;
    if (this.rack === null) {
      return css;
    }
    results = css.match(urlRegexGlobal);
    if (results === null) {
      return css;
    }
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      result = results[_i];
      match = urlRegex.exec(result);
      quote = match[1];
      url = match[2];
      specificUrl = this.rack.url(url);
      if (specificUrl && specificUrl !== null) {
        css = css.replace(result, "url(" + quote + specificUrl + quote + ")");
      }
    }
    return css;
  },

  create: function (options) {
    var _ref,
      _this = this;
    if (!((options !== null) && (options.filename !== null))) {
      throw new Error('Invalid options');
    }
    this.filename = path.resolve(options.filename);
    this.toWatch = path.dirname(this.filename);
    return sass.render({
      file: this.filename,
      includePaths: (_ref = options.paths) !== null ? _ref : [path.dirname(options.filename)],
      outputStyle: options.compress ? 'compressed' : 'nested',
      error: function(err) {
        return _this.emit('error', err);
      },
      success: function(css) {
        return _this.emit('created', {
          contents: _this.postProcess(css)
        });
      }
    });
  }

});

module.exports = SassAsset;
