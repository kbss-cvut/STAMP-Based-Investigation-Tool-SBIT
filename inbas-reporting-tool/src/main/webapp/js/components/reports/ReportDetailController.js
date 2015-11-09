/**
 * @jsx
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');

var Actions = require('../../actions/Actions');
var Constants = require('../../constants/Constants');
var ReportDetail = require('./ReportDetail');
var ReportsStore = require('../../stores/ReportsStore');
var UserStore = require('../../stores/UserStore');
var Routing = require('../../utils/Routing');
var Routes = require('../../utils/Routes');
var RouterStore = require('../../stores/RouterStore');

var ReportDetailController = React.createClass({
    mixins: [
        Reflux.listenTo(ReportsStore, 'onReportsChange'),
        Reflux.listenTo(UserStore, 'onUserChange')],

    getInitialState: function () {
        var isNew = !this.props.params.reportKey;
        return {
            user: UserStore.getCurrentUser(),
            report: isNew ? this.initNewReport() : null,
            loading: !isNew
        }
    },

    initNewReport: function () {
        var report = RouterStore.getTransitionPayload(Routes.createReport.name);
        if (!report) {
            report = {};
        }
        report.occurrence = {
            // Round to seconds
            startTime: (Date.now() / 1000) * 1000,
            endTime: (Date.now() / 1000) * 1000,
            reportingPhase: Constants.PRELIMINARY_REPORT_PHASE
        };
        report.isNew = true;
        return report;
    },

    componentWillMount: function () {
        if (this.props.params.reportKey) {
            // Find the report by key
            Actions.findReport(this.props.params.reportKey);
        }
    },

    onReportsChange: function (report) {
        if (report === null) {
            this.setState({loading: false});
        } else if (report.key && report.key === this.props.params.reportKey) {
            this.setState({report: report, loading: false});
        }
    },

    onUserChange: function () {
        this.setState({user: UserStore.getCurrentUser()});
    },

    onChange: function (attribute, value) {
        this.state.report[attribute] = value;   // Using [] notation because the att name is in variable
        this.setState({report: this.state.report}); // Force update
    },

    onSuccess: function () {
        var handlers = RouterStore.getViewHandlers(this.state.report.isNew ? Routes.createReport.name : Routes.editReport.name);
        if (handlers) {
            Routing.transitionTo(handlers.onSuccess);
        }
    },

    onCancel: function () {
        var handlers = RouterStore.getViewHandlers(this.state.report.isNew ? Routes.createReport.name : Routes.editReport.name);
        if (handlers) {
            Routing.transitionTo(handlers.onCancel);
        }
    },


    render: function () {
        return (
            <ReportDetail report={this.state.report} loading={this.state.loading} user={this.state.user}
                          onCancel={this.onCancel} onSuccess={this.onSuccess} onChange={this.onChange}/>
        );
    }
});

module.exports = ReportDetailController;
