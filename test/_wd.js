var helper = require('./_helper.js')
  , wd     = require('wd');

var webdriverUrl = process.env.WD_URL || 'http://localhost:4444';

before(function (done) {
  global.browser = wd.promiseChainRemote(webdriverUrl);
  browser
    .init({browserName:'chrome'})
    .deleteAllCookies()
    .then(function() {
      helper.serverUp(done);
    });
});

beforeEach(function (done) {
  browser
    .deleteAllCookies()
    .nodeify(done);
});

after(function (done) {
  browser
    .quit()
    .then(function() {
      helper.serverDown(done);
    });
});

module.exports = helper;
