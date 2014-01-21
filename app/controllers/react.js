/*
 * GET /react
 */

exports.index = function(req, res) {
  var Toggle = require('../../components/example_toggle.jsx');
  res.renderReact(Toggle(), {
    title: 'React Example'
  });
};
