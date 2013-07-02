var assert  = require('assert');
// var helpers = require('../lib/helpers');
var app = require('../server.js');

describe('app.locals', function(){

  describe('#pageTitle()', function(){

    it('should work when passed [string, string]', function(){
      var title = app.locals.pageTitle('Page Title', 'Site Title');
      assert.equal(title, 'Page Title | Site Title');
    });

    it('should work when passed [array, string]', function(){
      var title = app.locals.pageTitle(['Page', 'Title'], 'Site Title');
      assert.equal(title, 'Page - Title | Site Title');
    });

  });

});
