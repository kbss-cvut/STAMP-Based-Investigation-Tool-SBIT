'use strict';

import React from "react";
import {Panel} from "react-bootstrap";
import assign from "object-assign";
import JsonLdUtils from "jsonld-utils";
import Typeahead from "react-bootstrap-typeahead";
import Actions from "../../../actions/Actions";
import Constants from "../../../constants/Constants";
import I18nWrapper from "../../../i18n/I18nWrapper";
import injectIntl from "../../../utils/injectIntl";
import Input from "../../Input";
import OptionsStore from "../../../stores/OptionsStore";
import TypeaheadResultList from "../../typeahead/TypeaheadResultList";

class Aircraft extends React.Component {
    static propTypes = {
        aircraft: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        aircraft: {}
    };

    constructor(props) {
        super(props);
        this.i18n = props.i18n;
        this.state = {
            aircraftPresent: props.aircraft.operator !== undefined || props.aircraft.types !== undefined,
            aircraftType: JsonLdUtils.processTypeaheadOptions(OptionsStore.getOptions(Constants.OPTIONS.AIRCRAFT_TYPE)),
            operator: JsonLdUtils.processTypeaheadOptions(OptionsStore.getOptions(Constants.OPTIONS.AIRCRAFT_OPERATOR))
        };
    }

    componentDidMount() {
        this.unsubscribe = OptionsStore.listen(this._onOptionsLoaded);
        Actions.loadOptions(Constants.OPTIONS.AIRCRAFT_OPERATOR);
        Actions.loadOptions(Constants.OPTIONS.AIRCRAFT_TYPE);
    }

    _onOptionsLoaded = (type) => {
        const update = {};
        if (type === Constants.OPTIONS.AIRCRAFT_OPERATOR) {
            update.operator = JsonLdUtils.processTypeaheadOptions(OptionsStore.getOptions(Constants.OPTIONS.AIRCRAFT_OPERATOR));
            this.setState(update);
        } else if (type === Constants.OPTIONS.AIRCRAFT_TYPE) {
            update.aircraftType = JsonLdUtils.processTypeaheadOptions(OptionsStore.getOptions(Constants.OPTIONS.AIRCRAFT_TYPE));
            this.setState(update);
        }
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    _toggleAircraft = () => {
        this.setState({aircraftPresent: !this.state.aircraftPresent});
    };

    _onAircraftTypeSelected = (opt) => {
        const aircraft = assign({}, this.props.aircraft);
        aircraft.types = [opt.id];
        this.props.onChange({aircraft: aircraft});
    };

    _onOperatorSelected = (opt) => {
        const aircraft = assign({}, this.props.aircraft);
        aircraft.operator = {
            uri: opt.id,
            name: opt.name
        };
        this.props.onChange({aircraft: aircraft});
    };

    _resolveAircraftTypeValue() {
        if (!this.props.aircraft.types || this.props.aircraft.types.length === 0) {
            return null;
        }
        const type = this.props.aircraft.types[0],
            resolvedType = this.state.aircraftType.find(item => item.id === type);
        return resolvedType ? resolvedType.name : '';
    }

    render() {
        const aircraft = this.props.aircraft;
        return <Panel bsStyle='info' header={this._renderHeader()} collapsible expanded={this.state.aircraftPresent}>
            <div className='row'>
                <div className='col-xs-4'>
                    {this._renderAircraftTypeInput()}
                </div>
                <div className='col-xs-4'>
                    <Typeahead label={this.i18n('occurrence.aircraft.operator')}
                               formInputOption='id' placeholder={this.i18n('occurrence.aircraft.operator')}
                               onOptionSelected={this._onOperatorSelected} filterOption='name'
                               value={aircraft.operator ? aircraft.operator.name : null} size='small'
                               displayOption='name' options={this.state.operator}
                               customListComponent={TypeaheadResultList}/>
                </div>
            </div>
        </Panel>;
    }

    _renderHeader() {
        return <Input type='checkbox' onChange={this._toggleAircraft} value='aircraftPresent'
                      checked={this.state.aircraftPresent}
                      label={<h5 className='panel-title'
                                 style={{padding: '2px 0 0 0'}}>{this.i18n('occurrence.aircraft')}</h5>}
                      title={this.i18n('occurrence.aircraft.presence-tooltip')} className='panel-toggle'/>;
    }

    _renderAircraftTypeInput() {
        if (this.state.aircraftType.length !== 0) {
            return <Typeahead ref={c => this.aircraftType = c} label={this.i18n('occurrence.aircraft.type')}
                              formInputOption='id' placeholder={this.i18n('occurrence.aircraft.type')}
                              onOptionSelected={this._onAircraftTypeSelected} filterOption='name' size='small'
                              displayOption='name' options={this.state.aircraftType}
                              value={this._resolveAircraftTypeValue()} customListComponent={TypeaheadResultList}/>;
        } else {
            return <Input label={this.i18n('occurrence.aircraft.type')} placeholder={this.i18n('please-wait')}/>;
        }

    }
}

export default injectIntl(I18nWrapper(Aircraft));
