/**
 * @jsx
 */

'use strict';

var React = require('react');
var assign = require('object-assign');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Panel = require('react-bootstrap').Panel;
var injectIntl = require('../../utils/injectIntl');
var FormattedMessage = require('react-intl').FormattedMessage;

var Input = require('../Input');
var Select = require('../Select');

var FactorDetail = require('./FactorDetail');
var FactorRenderer = require('./FactorRenderer');
var GanttController = require('./GanttController');
var FactorJsonSerializer = require('../../utils/FactorJsonSerializer');
var Constants = require('../../constants/Constants');
var I18nMixin = require('../../i18n/I18nMixin');

var Factors = React.createClass({
    mixins: [I18nMixin],

    propTypes: {
        report: React.PropTypes.object.isRequired
    },

    ganttController: null,
    factorReferenceIdCounter: 0,

    getInitialState: function () {
        return {
            scale: 'minute',
            showLinkTypeDialog: false,
            currentLink: null,
            currentLinkSource: null,
            currentLinkTarget: null,
            showFactorDialog: false,
            currentFactor: null,
            showDeleteLinkDialog: false
        }
    },

    componentDidUpdate: function () {
        this.ganttController.updateOccurrenceEvent(this.props.report);
    },

    componentDidMount: function () {
        this.ganttController = GanttController;
        this.ganttController.init({
            onLinkAdded: this.onLinkAdded,
            onCreateFactor: this.onCreateFactor,
            onEditFactor: this.onEditFactor,
            updateOccurrence: this.onUpdateOccurrence,
            onDeleteLink: this.onDeleteLink
        });
        this.ganttController.setScale(this.state.scale);
        this.renderFactors();
        this.factorReferenceIdCounter = FactorRenderer.greatestReferenceId;
    },

    renderFactors: function () {
        FactorRenderer.renderFactors(this.props.report);
        this.ganttController.expandSubtree(this.ganttController.occurrenceEventId);
    },

    onLinkAdded: function (link) {
        this.setState({currentLink: link, showLinkTypeDialog: true});
    },

    onLinkTypeSelect: function (e) {
        var link = this.state.currentLink;
        link.factorType = e.target.value;
        this.ganttController.addLink(link);
        this.onCloseLinkTypeDialog();
    },

    onCloseLinkTypeDialog: function () {
        this.setState({currentLink: null, showLinkTypeDialog: false});
    },

    onCreateFactor: function (factor) {
        this.setState({showFactorDialog: true, currentFactor: factor});
    },

    onEditFactor: function (factor) {
        this.setState({currentFactor: factor, showFactorDialog: true});
    },

    onSaveFactor: function () {
        var factor = this.state.currentFactor;
        if (factor.isNew) {
            delete factor.isNew;
            this.addChildFactorToParent(factor);
            factor.statement.referenceId = ++this.factorReferenceIdCounter;
            this.ganttController.addFactor(factor);
        } else {
            this.ganttController.updateFactor(factor);
        }
        this.onCloseFactorDialog();
    },

    addChildFactorToParent: function (child) {
        var parent = this.ganttController.getFactor(child.parent);
        if (!parent.children) {
            parent.children = [];
        }
        parent.children.push(child.statement);
    },

    onDeleteFactor: function () {
        var factor = this.state.currentFactor,
            parentId = factor.parent;
        this.ganttController.deleteFactor(factor.id);
        this.removeChildFactorFromParent(factor, parentId);
        this.onCloseFactorDialog();
    },

    removeChildFactorFromParent: function (child, parentId) {
        var parentFactor = this.ganttController.getFactor(parentId),
            factor = child.statement;
        var childIndex = parentFactor.children.indexOf(factor);
        parentFactor.children.splice(childIndex, 1);
    },

    onCloseFactorDialog: function () {
        this.setState({currentFactor: null, showFactorDialog: false});
    },

    onDeleteLink: function (link, source, target) {
        this.setState({
            showDeleteLinkDialog: true,
            currentLink: link,
            currentLinkSource: source,
            currentLinkTarget: target
        })
    },

    onCloseDeleteLinkDialog: function () {
        this.setState({showDeleteLinkDialog: false, currentLink: null});
    },

    deleteLink: function () {
        this.ganttController.deleteLink(this.state.currentLink.id);
        this.onCloseDeleteLinkDialog();
    },

    onScaleChange: function (e) {
        var scale = e.target.value;
        this.setState({scale: scale});
        this.ganttController.setScale(scale);
    },

    onUpdateOccurrence: function (startTime, endTime) {
        var occurrence = assign({}, this.props.report.occurrence);
        occurrence.startTime = startTime;
        occurrence.endTime = endTime;
        this.props.onChange({'occurrence': occurrence});
    },

    getFactorGraph: function () {
        FactorJsonSerializer.setGanttController(this.ganttController);
        return FactorJsonSerializer.getFactorGraph(this.props.report);
    },


    render: function () {
        var scaleTooltip = this.i18n('factors.scale-tooltip');
        return (
            <Panel header={<h5>{this.i18n('factors.panel-title')}</h5>} bsStyle='info'>
                {this.renderFactorDetailDialog()}
                {this.renderLinkTypeDialog()}
                {this.renderDeleteLinkDialog()}
                <div id='factors_gantt' className='factors-gantt'/>
                <div className='gantt-zoom'>
                    <div className='col-xs-5'>
                        <div className='col-xs-2 gantt-zoom-label bold'>{this.i18n('factors.scale')}:</div>
                        <div className='col-xs-2'>
                            <Input type='radio' label={this.i18n('factors.scale.second')} value='second'
                                   title={scaleTooltip + 'seconds'} checked={this.state.scale === 'second'}
                                   onChange={this.onScaleChange}/>
                        </div>
                        <div className='col-xs-2'>
                            <Input type='radio' label={this.i18n('factors.scale.minute')} value='minute'
                                   title={scaleTooltip + 'minutes'}
                                   checked={this.state.scale === 'minute'}
                                   onChange={this.onScaleChange}/>
                        </div>
                        <div className='col-xs-2'>
                            <Input type='radio' label={this.i18n('factors.scale.hour')} value='hour'
                                   title={scaleTooltip + 'hours'}
                                   checked={this.state.scale === 'hour'} onChange={this.onScaleChange}/>
                        </div>
                        <div className='col-xs-2'>
                            <Input type='radio' label={this.i18n('factors.scale.relative')} value='relative'
                                   title={this.i18n('factors.scale.relative-tooltip')}
                                   checked={this.state.scale === 'relative'} onChange={this.onScaleChange}/>
                        </div>
                    </div>

                    <div className='col-xs-2'>&nbsp;</div>

                    <div className='col-xs-5 gantt-zoom-label'>
                        {this._renderLineColors()}
                    </div>
                </div>
            </Panel>);
    },

    renderFactorDetailDialog: function () {
        if (!this.state.showFactorDialog) {
            return null;
        }
        return (<FactorDetail show={this.state.showFactorDialog} factor={this.state.currentFactor}
                              onClose={this.onCloseFactorDialog} onSave={this.onSaveFactor}
                              onDelete={this.onDeleteFactor} scale={this.state.scale}/>);
    },

    renderLinkTypeDialog: function () {
        var options = Object.getOwnPropertyNames(Constants.LINK_TYPES).map((name) => {
            var item = Constants.LINK_TYPES[name];
            return {
                value: item.value,
                label: this.i18n(item.message)
            };
        });
        return (
            <Modal show={this.state.showLinkTypeDialog} bsSize='small' onHide={this.onCloseLinkTypeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.i18n('factors.link-type-select')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select ref='linkType' title={this.i18n('factors.link-type-select-tooltip')}
                            onChange={this.onLinkTypeSelect} options={options}/>
                </Modal.Body>
            </Modal>
        );
    },

    renderDeleteLinkDialog: function () {
        var source = this.state.currentLinkSource ? this.state.currentLinkSource.text : '',
            target = this.state.currentLinkTarget ? this.state.currentLinkTarget.text : '';
        return (
            <Modal show={this.state.showDeleteLinkDialog} bsSize='small' onHide={this.onCloseDeleteLinkDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.i18n('factors.link.delete.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormattedMessage id='factors.link.delete.text'
                                      values={{source: <span className='bold'>{source}</span>, target: <span className='bold'>{target}</span>}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle='warning' bsSize='small' onClick={this.deleteLink}>{this.i18n('delete')}</Button>
                    <Button bsSize='small' onClick={this.onCloseDeleteLinkDialog}>{this.i18n('cancel')}</Button>
                </Modal.Footer>
            </Modal>
        );
    },

    _renderLineColors: function () {
        return Object.getOwnPropertyNames(Constants.LINK_TYPES).map((name) => {
            var item = Constants.LINK_TYPES[name];
            return <div className='col-xs-3' key={item.value}>
                <div className={item.className}
                     style={{height: '4px', width: '2em', float: 'left', margin: '8px'}}/>
                <div style={{float: 'left'}}>{this.i18n(item.message)}</div>
            </div>;
        });
    }
});

module.exports = injectIntl(Factors, {withRef: true});
