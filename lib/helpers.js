var helpers = function(app) {

  app.helpers = {
    fullTitle: function(pageTitle, siteTitle) {
      // var _preTitle;
      // if (typeof preTitle !== 'undefined') {
      //   if (typeof preTitle === 'string') {
      //     _preTitle = preTitle;
      //   } else if (util.isArray(preTitle)) {
      //     _preTitle = _.compact(preTitle).join();
      //   }
      // }
      var newTitle = pageTitle + siteTitle;
      return newTitle;
    }
  };

  // app.dynamicHelpers = {
  //   flashMessages: function(req, res) {
  //     var html = 'test';
  //     return html;
  //   }
  // };

};

module.exports = helpers;
