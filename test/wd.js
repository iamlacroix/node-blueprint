var wd = require('wd');
var webdriverUrl = process.env.WD_URL || 'http://localhost:4444';

module.exports = function (serverSetup) {
  return function() {

    before(function (done) {
      global.browser = wd.promiseChainRemote(webdriverUrl);
      browser
        .init({browserName:'chrome'})
        .deleteAllCookies()
        .nodeify(done);
    });

    beforeEach(function (done) {
      browser
        .deleteAllCookies()
        .nodeify(done);
    });

    after(function (done) {
      browser
        .quit()
        .nodeify(done);
    });

    serverSetup();

  };
};
