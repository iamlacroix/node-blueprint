/*jshint expr: true*/

var helper = require('../_wd.js');

describe('Static Pages Integration', function() {

  describe('home page', function() {

    beforeEach(function (done) {
      browser.get(helper.urlFor(), done);
    });

    it('should include "TODO" in the browser title', function (done) {
      browser.title()
        .then(function (title) {
          expect(title).to.contain('TODO');
        })
        .nodeify(done);
    });

    it('should have an <h1> title of "Home"', function (done) {
      browser
        .elementByCss('h1')
        .text()
        .then(function (text) {
          expect(text).to.equal('Home');
        })
        .nodeify(done);
    });

    it('should have a message involving Node.js Blueprint', function (done) {
      browser
        .elementByCss('body')
        .text()
        .then(function (text) {
          expect(text).to.contain('Node.js Blueprint');
        })
        .nodeify(done);
    });

  }); // home page

});
