var React = require('react');

var ExampleToggle = React.createClass({
  getInitialState: function() {
    return {
      ready: true
    };
  },
  handleClick: function() {
    this.setState({
      ready: !this.state.ready
    });
    return false;
  },
  render: function() {
    var attrs = {
      onClick:   this.handleClick,
      className: 'btn'
    };
    var buttonTitle = (this.state.ready) ? 'Ready!' : 'Sending...';
    return React.DOM.button(attrs, buttonTitle);
  }
});

module.exports = ExampleToggle;
