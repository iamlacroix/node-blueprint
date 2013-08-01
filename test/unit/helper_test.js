/*jshint expr: true*/

var expect = require('chai').expect
  , helper = require('../_helper.js')
  , app    = helper.app;

describe('app.locals', function() {

  describe('#pageTitle()', function() {

    it('works with [string, string] params', function() {
      var title = app.locals.pageTitle('Page Title', 'Site Title');
      expect(title).to.equal('Page Title | Site Title');
    });

    it('works with [array, string] params', function() {
      var title = app.locals.pageTitle(['Page', 'Title'], 'Site Title');
      expect(title).to.equal('Page - Title | Site Title');
    });

  });

});
