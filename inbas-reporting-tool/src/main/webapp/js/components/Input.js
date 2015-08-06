/**
 * @author kidney
 */

'use strict';

var React = require('react');
var BootstrapInput = require('react-bootstrap').Input;

var Input = React.createClass({
    render: function() {
        return (
            <BootstrapInput bsSize='small' {...this.props}/>
        );
    }
});

module.exports = Input;
