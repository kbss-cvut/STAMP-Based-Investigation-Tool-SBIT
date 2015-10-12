/**
 * @jsx
 */

'use strict';

var React = require('react');
var assign = require('object-assign');
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Panel = require('react-bootstrap').Panel;

var ReportStatementsTable = require('./ReportStatementsTable');
var WizardWindow = require('../wizard/WizardWindow');
var EventTypeDialog = require('./wizard/event-type/EventTypeDialog');
var CorrectiveMeasureWizardSteps = require('./wizard/corrective-measure/Steps');
var EventTypeWizardSelector = require('./wizard/event-type/EventTypeWizardSelector');
var EventTypeFactory = require('../../model/EventTypeFactory');

var ReportStatements = React.createClass({

    propTypes: {
        report: React.PropTypes.object,
        show: React.PropTypes.array
    },

    getInitialState: function () {
        return {
            isWizardOpen: false,
            eventTypeDialogOpen: false,
            wizardProperties: null
        }
    },

    openWizard: function (wizardProperties) {
        this.setState({
            isWizardOpen: true,
            wizardProperties: wizardProperties
        });
    },

    closeWizard: function () {
        this.setState({isWizardOpen: false});
    },

    openEventTypeDialog: function () {
        this.setState({eventTypeDialogOpen: true});
    },

    closeEventTypeDialog: function () {
        this.setState({eventTypeDialogOpen: false});
    },

    // Event Type Assessments

    onEventTypeSelect: function (eventType) {
        var wizardProperties = EventTypeWizardSelector.getWizardSettings(eventType);
        wizardProperties.onFinish = this.addEventTypeAssessment;
        this.openWizard(wizardProperties);
        // Need to hide it with delay, otherwise typeahead is throwing mount errors
        setTimeout(this.closeEventTypeDialog, 100);
    },

    addEventTypeAssessment: function (data, closeCallback) {
        var statement = data.statement;
        var eventTypes = this.props.report.typeAssessments != null ? this.props.report.typeAssessments : [];
        eventTypes.push(statement);
        this.props.onChange('typeAssessments', eventTypes);
        closeCallback();
    },

    updateEventTypeAssessment: function (data, closeCallback) {
        var statement = data.statement;
        var eventTypes = this.props.report.typeAssessments;
        eventTypes.splice(statement.index, 1, statement);
        delete statement.index;
        this.props.onChange('typeAssessments', eventTypes);
        closeCallback();
    },

    onRemoveEventTypeAssessment: function (index) {
        var types = this.props.report.typeAssessments;
        types.splice(index, 1);
        this.props.onChange('typeAssessments', types);
    },

    onEditEventTypeAssessment: function (index) {
        var assessment = assign({}, this.props.report.typeAssessments[index]);
        assessment.index = index;
        var wizardProperties = EventTypeWizardSelector.getWizardSettingsForStatement(assessment);
        wizardProperties.onFinish = this.updateEventTypeAssessment;
        this.openWizard(wizardProperties);
    },

    // Corrective Measures

    openCorrectiveMeasureWizard: function () {
        var properties = {
            steps: CorrectiveMeasureWizardSteps,
            title: 'Corrective Measure Wizard',
            statement: {},
            onFinish: this.addCorrectiveMeasure
        };
        this.openWizard(properties);
    },

    addCorrectiveMeasure: function (data, closeCallback) {
        var measure = data.statement;
        var measures = this.props.report.correctiveMeasures != null ? this.props.report.correctiveMeasures : [];
        measures.push(measure);
        this.props.onChange('correctiveMeasures', measures);
        closeCallback();
    },

    updateCorrectiveMeasure: function (data, closeCallback) {
        var measure = data.statement,
            measures = this.props.report.correctiveMeasures;
        measures.splice(measure.index, 1, measure);

        delete measure.index;
        this.props.onChange('correctiveMeasures', measures);
        closeCallback();
    },

    onRemoveCorrectiveMeasure: function (index) {
        var measures = this.props.report.correctiveMeasures;
        measures.splice(index, 1);
        this.props.onChange('correctiveMeasures', measures);
    },

    onEditCorrectiveMeasure: function (index) {
        var measure = assign({}, this.props.report.correctiveMeasures[index]),
            wizardProperties = {
                steps: CorrectiveMeasureWizardSteps,
                title: 'Corrective Measure Wizard',
                statement: measure,
                onFinish: this.updateCorrectiveMeasure
            };
        measure.index = index;
        this.openWizard(wizardProperties);
    },


    // Rendering

    render: function () {
        var components = this.renderComponentsToShow();
        return (
            <div>
                {components}
                <WizardWindow {...this.state.wizardProperties} show={this.state.isWizardOpen}
                                                               onHide={this.closeWizard} enableForwardSkip={true}/>
            </div>
        );
    },

    renderComponentsToShow: function () {
        var components = [],
            show = this.props.show;
        if (!show || show.length === 0) {
            show = ['typeAssessments', 'correctiveMeasures'];
        }
        for (var i = 0, len = show.length; i < len; i++) {
            var method = 'render' + show[i].charAt(0).toUpperCase() + show[i].substring(1);
            if (this[method]) {
                components.push(this[method].call());
            } else {
                console.warn('Cannot render statements ' + show[i]);
            }
        }
        return components;
    },

    renderTypeAssessments: function () {
        var component = this.initTypeAssessmentsTable();
        var typeWizard = (<EventTypeDialog show={this.state.eventTypeDialogOpen} onHide={this.closeEventTypeDialog}
                                           onTypeSelect={this.onEventTypeSelect}/>);
        var buttonCls = component ? 'float-right' : '';
        return (
            <Panel header={<h5>Event Type Assessments</h5>} bsStyle='info' key='typeAssessments'>
                {component}
                <div className={buttonCls}>
                    <Button bsStyle='primary' bsSize='small' title='Add new Event Type Assessment'
                            onClick={this.openEventTypeDialog}>
                        <Glyphicon glyph='plus' style={{margin: '0 5px 0 0'}}/>
                        Add
                    </Button>
                </div>
                {typeWizard}
            </Panel>
        );
    },

    initTypeAssessmentsTable: function () {
        var data = this.props.report.typeAssessments;
        if (data == null || data.length === 0) {
            return null;
        } else {
            var toShow = [];
            for (var i = 0; i < data.length; i++) {
                toShow.push({
                    eventType: data[i].eventType.name,
                    summary: EventTypeFactory.create(data[i]).toString()
                });
            }
            var header = [{
                attribute: 'eventType',
                name: 'Event Type',
                flex: 3
            }, {
                attribute: 'summary',
                name: 'Summary',
                flex: 8
            }];
            var handlers = {
                onRemove: this.onRemoveEventTypeAssessment,
                onEdit: this.onEditEventTypeAssessment
            };
            return (<ReportStatementsTable data={toShow} header={header} keyBase='eventType' handlers={handlers}/>);
        }
    },

    renderCorrectiveMeasures: function () {
        var data = this.props.report.correctiveMeasures;
        var component;
        if (data == null || data.length === 0) {
            component = null;
        } else {
            var header = [{
                flex: 11,
                attribute: 'description',
                name: 'Description'
            }];
            var handlers = {
                onRemove: this.onRemoveCorrectiveMeasure,
                onEdit: this.onEditCorrectiveMeasure
            };
            component = (<ReportStatementsTable data={data} header={header} keyBase='corrective' handlers={handlers}/>);
        }
        var buttonCls = component ? 'float-right' : '';
        return (
            <Panel header={<h5>Corrective Measures</h5>} bsStyle='info' key='correctiveMeasures'>
                {component}
                <div className={buttonCls}>
                    <Button bsStyle='primary' bsSize='small' title='Add new Corrective Measure'
                            onClick={this.openCorrectiveMeasureWizard}>
                        <Glyphicon glyph='plus' style={{margin: '0 5px 0 0'}}/>
                        Add
                    </Button>
                </div>
            </Panel>
        );
    }
});

module.exports = ReportStatements;
