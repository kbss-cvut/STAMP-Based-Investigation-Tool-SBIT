/**
 * @jsx
 */

'use strict';

var React = require('react');
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;

var ReportsTable = React.createClass({

    propTypes: {
        reports: React.PropTypes.array.isRequired,
        rowComponent: React.PropTypes.func.isRequired     // A react component
    },

    render: function () {
        var title = <h3>{this.props.title ? this.props.title : 'Occurrence reports'}</h3>;
        var reports = this.prepareReports();
        return (<div>
            <Panel header={title} bsStyle='primary' {...this.props}>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th className='col-xs-2'>Occurrence name</th>
                        <th className='col-xs-2'>Occurrence date</th>
                        <th className='col-xs-5'>Description</th>
                        <th className='col-xs-1'>Type</th>
                        <th className='col-xs-2'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports}
                    </tbody>
                </Table>
            </Panel>
        </div>);
    },

    prepareReports: function () {
        var result = [];
        var len = this.props.reports.length;
        for (var i = 0; i < len; i++) {
            result.push(React.createElement(this.props.rowComponent, {
                report: this.props.reports[i],
                key: this.props.reports[i].uri,
                onEdit: this.props.onEdit
            }));
        }
        return result;
    }
});

module.exports = ReportsTable;
