var util = require('util')
  , _    = require('underscore');

module.exports = function(app) {

  app.locals({

    ////
    // Page titles
    //
    fullTitle: function(pageTitle, siteTitle) {
      var _pageTitle;
      if (typeof pageTitle !== 'undefined') {
        if (typeof pageTitle === 'string') {
          _pageTitle = pageTitle;
        } else if (util.isArray(pageTitle)) {
          _pageTitle = _.compact(pageTitle).join(' - ');
        }
        return _pageTitle + ' | ' + siteTitle;
      } else {
        return siteTitle;
      }
    }

  });

  // app.dynamicHelpers = {
  //   flashMessages: function(req, res) {
  //     var html = 'test';
  //     return html;
  //   }
  // };

};
