/**
 * @jsx
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');
var Typeahead = require('react-bootstrap-typeahead');
var TypeaheadResultList = require('../../typeahead/EventTypeTypeaheadResultList');

var injectIntl = require('../../../utils/injectIntl');

var Select = require('../../Select');
var OptionsStore = require('../../../stores/OptionsStore');
var TypeaheadStore = require('../../../stores/TypeaheadStore');
var Utils = require('../../../utils/Utils');
var I18nMixin = require('../../../i18n/I18nMixin');
var Vocabulary = require('../../../constants/Vocabulary');

var OccurrenceClassification = React.createClass({
    mixins: [Reflux.ListenerMixin, I18nMixin],

    propTypes: {
        report: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            occurrenceClasses: OptionsStore.getOccurrenceClasses(),
            occurrenceCategories: TypeaheadStore.getOccurrenceCategories()
        };
    },

    componentDidMount: function () {
        this.listenTo(OptionsStore, this.onOccurrenceClassesLoaded);
        this.listenTo(TypeaheadStore, this.onOccurrenceCategoriesLoaded)
    },

    onOccurrenceClassesLoaded: function (type, data) {
        if (type !== 'occurrenceClass') {
            return;
        }
        this.setState({occurrenceClasses: data});
    },

    _transformOccurrenceClasses: function () {
        return this.state.occurrenceClasses.map((item) => {
            return {
                value: item['@id'],
                label: item[Vocabulary.RDFS_LABEL],
                title: item[Vocabulary.RDFS_COMMENT]
            };
        });
    },

    onOccurrenceCategoriesLoaded: function () {
        var options = TypeaheadStore.getOccurrenceCategories();
        this.setState({occurrenceCategories: options});
    },

    _transformOccurrenceCategories: function () {
        return this.state.occurrenceCategories.map(function (item) {
            return {
                id: item['@id'],
                name: item[Vocabulary.RDFS_LABEL],
                description: item[Vocabulary.RDFS_COMMENT]
            };
        });
    },

    onChange: function (e) {
        var value = e.target.value;
        this.props.onChange(e.target.name, value);
    },

    onCategorySelect: function (cat) {
        this.props.onChange('occurrenceCategory', cat.id);
    },

    _onShowCategories: function () {
        this.refs.occurrenceCategory.showOptions();
    },

    render: function () {
        var classes = {
                input: 'form-control'
            },
            report = this.props.report,
            categories = this._transformOccurrenceCategories();
        return (
            <div className='row'>
                <div className='col-xs-4'>
                    <Select label={this.i18n('occurrence.class') + '*'} name='severityAssessment'
                            title={this.i18n('occurrence.class-tooltip')}
                            value={report.severityAssessment} options={this._transformOccurrenceClasses()}
                            onChange={this.onChange}/>
                </div>
                <div className='col-xs-4'>
                    <label className='control-label'>
                        {this.i18n('report.occurrence.category.label') + '*'}
                    </label>
                    <Typeahead className='form-group form-group-sm' name='occurrenceCategory'
                               ref='occurrenceCategory' formInputOption='id' optionsButton={true}
                               placeholder={this.i18n('report.occurrence.category.label')}
                               onOptionSelected={this.onCategorySelect} filterOption='name'
                               value={this._resolveValue(categories)}
                               displayOption='name' options={categories}
                               customClasses={classes} customListComponent={TypeaheadResultList}/>
                </div>
            </div>
        )
    },

    _resolveValue: function (categories) {
        var catId = this.props.report.occurrenceCategory;
        if (!catId || categories.length === 0) {
            return '';
        }
        var cat = categories.find((item, ind, arr) => {
            return item.id === catId;
        });
        return cat.name;
    }
});

module.exports = injectIntl(OccurrenceClassification);
