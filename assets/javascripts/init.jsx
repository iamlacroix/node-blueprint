/** @jsx React.DOM */

var domready = require('domready')
  , React    = require('react')
  , Toggle   = require('../../components/example_toggle.jsx');

module.exports = function() {
  domready(function() {
    React.renderComponent(<Toggle />, document.body);
  });
};
