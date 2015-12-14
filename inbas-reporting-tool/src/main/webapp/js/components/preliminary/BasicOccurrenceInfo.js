/**
 * @jsx
 */
'use strict';

var React = require('react');

var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;

var Input = require('../Input');
var Utils = require('../../utils/Utils');
var OccurrenceSeverity = require('../occurrence/OccurrenceSeverity');
var OccurrenceDetail = require('../occurrence/OccurrenceDetail');
var I18nMixin = require('../../i18n/I18nMixin');

var BasicOccurrenceInfo = React.createClass({
    mixins: [I18nMixin],

    propTypes: {
        report: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onAttributeChange: React.PropTypes.func.isRequired
    },

    getFullName: function (data) {
        if (!data) {
            return '';
        }
        return data.firstName + ' ' + data.lastName;
    },

    render: function () {
        var report = this.props.report;
        return (
            <div>
                <OccurrenceDetail occurrence={this.props.report.occurrence}
                                  onAttributeChange={this.props.onAttributeChange}/>

                <div className='row'>
                    <div className='col-xs-4'>
                        <OccurrenceSeverity onChange={this.props.onAttributeChange}
                                            severityAssessment={report.severityAssessment}/>
                    </div>
                </div>

                {this.renderAuthor()}

                {this.renderLastEdited()}
            </div>
        );
    },

    renderAuthor: function () {
        var report = this.props.report;
        return report.isNew ? null : (
            <div className='row'>
                <div className='col-xs-4'>
                    <Input type='text' value={this.getFullName(report.author)} label={this.i18n('author')}
                           title={this.i18n('author-title')}
                           disabled/>
                </div>
            </div>);
    },

    renderLastEdited: function () {
        var report = this.props.report;
        if (report.isNew || !report.lastEdited) {
            return null;
        }
        var formattedDate = Utils.formatDate(new Date(report.lastEdited));
        return (
            <div className='form-group notice-small'>
                <FormattedMessage id='preliminary.detail.last-edited-msg'
                                  values={{date: formattedDate, name: this.getFullName(report.lastEditedBy)}}/>
            </div>
        );
    }
});

module.exports = injectIntl(BasicOccurrenceInfo);
