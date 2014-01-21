var React = require('react');

var renderReact = function (component, opts, layout) {
  layout = layout || 'layout/react';
  React.renderComponentToString(component, function(html) {
    opts.react = html;
    this.render(layout, opts);
  }.bind(this));
};

module.exports = function (req, res, next) {
  res.renderReact = renderReact;
  next();
};
