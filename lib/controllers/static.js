/*
 * GET /
 */

exports.index = function(req, res) {
  res.render('static/index', {
    title: 'Home'
  });
};
