var assert  = require('assert');
var helpers = require('../lib/helpers');
// var app     = require('../server');

describe('View Helpers', function(){
  describe('#fullTitle(pageTitle, siteTitle)', function(){
    it('should return a title when passed a string', function(){
      var title = helpers.fullTitle;
      assert.equal(title, "abc");
      // assert.equal(-1, [1,2,3].indexOf(5));
      // assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
