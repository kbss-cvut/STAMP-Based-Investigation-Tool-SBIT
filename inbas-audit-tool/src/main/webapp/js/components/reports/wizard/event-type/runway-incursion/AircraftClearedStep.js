/**
 * Created by ledvima1 on 17.6.15.
 */

'use strict';

var React = require('react');
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;

var AircraftRegistration = require('../../AircraftRegistration');
var FlightInfo = require('../../FlightInfo');
var FlightOperationType = require('../../FlightOperationType');

var AircraftClearedStep = React.createClass({
    getInitialState: function () {
        var statement = this.props.data.statement;
        if (!statement.cleared) {
            statement.cleared = {};
        }
        return {
            statement: statement
        };
    },
    onChange: function (e) {
        var value = e.target.value;
        var attributeName = e.target.name;
        this.state.statement.cleared[attributeName] = value;
        this.setState({statement: this.state.statement});
    },


    render: function () {
        var title = (<h3>Aircraft Cleared to Use Runway</h3>);
        var statement = this.state.statement;
        return (
            <Panel header={title}>
                <AircraftRegistration aircraftRegistration={statement.cleared.aircraftRegistration}
                                      aircraftRegistryState={statement.cleared.aircraftRegistryState}
                                      onChange={this.onChange}/>
                <Panel header='Aviation Operation'>
                    <div className='report-detail'>
                        <Input type='text' label='Flight Number' name='flightNumber' onChange={this.onChange}
                               value={statement.cleared.flightNumber}/>
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <div className='report-detail-float'>
                            <Input type='select' label='Phase' name='phase' value={statement.cleared.phase}
                                   onChange={this.onChange} title='What is the aircraft doing?'>
                                <option value='takeoff'>Take-off</option>
                                <option value='approach'>Approach</option>
                                <option value='landing'>Landing</option>
                            </Input>
                        </div>
                        <div className='report-detail-float-right'>
                            <FlightOperationType operationType={statement.cleared.operationType}
                                                 onChange={this.onChange}/>
                        </div>
                    </div>
                    <FlightInfo lastDeparturePoint={statement.cleared.lastDeparturePoint}
                                plannedDestination={statement.cleared.plannedDestination} onChange={this.onChange}/>
                </Panel>
            </Panel>
        );
    }
});

module.exports = AircraftClearedStep;
