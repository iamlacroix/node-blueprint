var util   = require('util')
  , _      = require('underscore');

module.exports = function(app) {

  app.locals({

    ////
    // Page titles
    //
    pageTitle: function(page, siteTitle) {
      var _page;
      if (typeof page !== 'undefined') {
        if (typeof page === 'string') {
          _page = page;
        } else if (util.isArray(page)) {
          _page = _.compact(page).join(' - ');
        }
        return _page + ' | ' + siteTitle;
      } else {
        return siteTitle;
      }
    },

    ////
    // Current environment
    //
    isDevelopment: function() {
      return process.env.NODE_ENV === "development";
    },
    isTest: function() {
      return process.env.NODE_ENV === "test";
    },
    isProduction: function() {
      return process.env.NODE_ENV === "production";
    }

  });

};
