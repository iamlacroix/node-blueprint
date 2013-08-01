/*jshint expr: true*/

var helper = require('../_helper.js')
  , expect = require('chai').expect;

describe('Static Pages Integration', function() {

  before(function() {
    this.server  = helper.server();
    this.browser = helper.browser();
  });

  after(function(done) {
    this.server.close(done);
  });

  describe('home page', function() {

    before(function(done) {
      var browser = this.browser;
      browser.visit('/', done);
    });

    it('should have an <h1> title', function() {
      var browser = this.browser;
      var title = browser.text('h1');
      expect(title).to.equal('Home');
    });

    it('should have a message involving Node.js Blueprint', function() {
      var browser = this.browser;
      var msg = browser.text('body');
      expect(msg).to.include('Node.js Blueprint');
    });

  }); // home page

});
