/**
 * @jsx
 */

'use strict';

var React = require('react');
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Panel = require('react-bootstrap').Panel;
var assign = require('object-assign');

var injectIntl = require('react-intl').injectIntl;

var Actions = require('../../actions/Actions');
var InitialReports = require('./../initialreport/InitialReports');
var ReportStatements = require('./ReportStatements');
var BasicOccurrenceInfo = require('./BasicOccurrenceInfo');
var ReportSummary = require('./ReportSummary');
var Mask = require('../Mask');
var Routing = require('../../utils/Routing');
var Routes = require('../../utils/Routes');
var MessageMixin = require('../mixin/MessageMixin');
var ResourceNotFound = require('../ResourceNotFound');
var ReportValidator = require('../../validation/ReportValidator');
var I18nMixin = require('../../i18n/I18nMixin');

var ReportDetail = React.createClass({
    mixins: [MessageMixin, I18nMixin],

    getInitialState: function () {
        return {
            submitting: false
        };
    },

    onChange: function (e) {
        var value = e.target.value;
        var attributeName = e.target.name;
        this.props.onChange(attributeName, value);
    },

    onAttributeChange: function (attribute, value) {
        this.props.onChange(attribute, value);
    },

    onDateChange: function (value) {
        this.props.onChange('occurrenceTime', new Date(Number(value)));
    },

    onSubmit: function (e) {
        var report = this.props.report;
        e.preventDefault();
        this.setState(assign(this.state, {submitting: true}));
        if (report.isNew) {
            Actions.createPreliminary(report, this.onSuccess, this.onSubmitError);
        }
        else {
            Actions.updatePreliminary(report, this.onSuccess, this.onSubmitError);
        }
    },

    onSuccess: function () {
        this.setState({submitting: false});
        this.props.onSuccess();
        this.showSuccessMessage(this.i18n('save-success-message'));
    },

    onSubmitError: function (error) {
        this.setState({submitting: false});
        this.showErrorMessage(this.i18n('save-failed-message') + error.message);
    },

    investigate: function () {
        Actions.createInvestigation(this.props.report.key);
        Routing.transitionTo(Routes.editInvestigation, {
            params: {reportKey: this.props.report.key},
            handlers: {onCancel: Routes.investigations}
        });
    },


    render: function () {
        if (this.props.loading) {
            return (
                <Mask text={this.i18n('preliminary.detail.loading-mask')}/>
            );
        }
        if (!this.props.report) {
            return (<ResourceNotFound resource={this.i18n('preliminary.detail.panel-title')}/>);
        }
        return this.renderDetail();
    },

    renderDetail: function () {
        var report = this.props.report,
            loading = this.state.submitting,
            submitDisabled = !ReportValidator.isValid(report) || loading,
            submitTitle = this.i18n('preliminary.detail.save-tooltip'),
            submitLabel = this.i18n(loading ? 'preliminary.detail.saving' : 'save');
        if (loading) {
            submitTitle = this.i18n('preliminary.detail.saving');
        } else if (submitDisabled) {
            submitTitle = this.i18n('preliminary.detail.invalid-tooltip');
        }

        return (
            <div>
                <Panel header={<h2>{this.i18n('preliminary.detail.panel-title')}</h2>} bsStyle='primary'>
                    <form>
                        <BasicOccurrenceInfo report={report} onChange={this.onChange}
                                             onAttributeChange={this.onAttributeChange}/>

                        <div className='row'>
                            <div className='col-xs-12'>
                                <InitialReports report={report} onAttributeChange={this.onAttributeChange}/>
                            </div>
                        </div>

                        <div className='form-group'>
                            <ReportStatements report={report} onChange={this.props.onChange}/>
                        </div>

                        <div className='row'>
                            <div className='col-xs-12'>
                                <ReportSummary report={report} onChange={this.onChange}/>
                            </div>
                        </div>

                        <ButtonToolbar className='float-right' style={{margin: '1em 0 0.5em 0'}}>
                            <Button bsStyle='success' bsSize='small' disabled={submitDisabled}
                                    ref='submit' title={submitTitle}
                                    onClick={this.onSubmit}>{submitLabel}</Button>
                            <Button bsStyle='link' bsSize='small' title={this.i18n('cancel-tooltip')}
                                    onClick={this.props.onCancel}>{this.i18n('cancel')}</Button>
                        </ButtonToolbar>
                    </form>
                </Panel>
                {this.renderMessage()}
            </div>
        );
    }
});

module.exports = injectIntl(ReportDetail);
