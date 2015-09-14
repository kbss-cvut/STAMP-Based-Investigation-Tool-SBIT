'use strict';

var React = require('react');
var Button = require('react-bootstrap').Button;
var Jumbotron = require('react-bootstrap').Jumbotron;
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('../Input');

var Tile = require('./DashboardTile');

var Dashboard = React.createClass({
    propTypes: {
        userFirstName: React.PropTypes.string,
        createEmptyReport: React.PropTypes.func.isRequired,
        importInitialReport: React.PropTypes.func.isRequired,
        showAllReports: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            dashboard: 'main',
            search: false
        }
    },

    onUserLoaded: function (user) {
        this.setState({firstName: user.firstName});
    },

    goBack: function () {
        this.setState({dashboard: 'main'});
    },

    createReport: function () {
        this.setState({dashboard: 'createReport'});
    },

    toggleSearch: function () {
        this.setState({search: !this.state.search});
    },


    render: function () {
        return (
            <Jumbotron>
                {this.renderTitle()}

                {this.renderDashboardContent()}
            </Jumbotron>
        );
    },

    renderTitle: function () {
        if (this.state.dashboard === 'main') {
            return (
                <h3>Hello <span className='bold'>{this.props.userFirstName}</span>, Welcome to the INBAS Reporting Tool.
                </h3>);
        } else {
            return (<h3>Create Occurrence Report</h3>);
        }
    },

    renderDashboardContent: function () {
        if (this.state.dashboard === 'main') {
            return this.renderMainDashboard();
        } else {
            return this.renderCreateReportDashboard();
        }
    },

    renderMainDashboard: function () {
        var search = this.state.search ? (
            <Input type='text' placeholder='Occurrence summary' style={{width: '300px', margin: 'auto'}}/>) : null;
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={4} className='dashboard-sector'>
                        <Tile onClick={this.createReport}>Create Occurrence Report</Tile>
                    </Col>
                    <Col xs={4} className='dashboard-sector'>
                        <Tile onClick={this.toggleSearch}>Search for Occurrence Case</Tile>

                        {search}
                    </Col>
                    <Col xs={4} className='dashboard-sector'>
                        <Tile onClick={this.props.showAllReports}>View All Occurrences</Tile>
                    </Col>
                </Row>
            </Grid>
        );
    },

    renderCreateReportDashboard: function () {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={6} className='dashboard-sector'>
                        <Tile onClick={this.props.createEmptyReport}>Start With Empty Report</Tile>
                    </Col>
                    <Col xs={6} className='dashboard-sector'>
                        <Tile onClick={this.props.importInitialReport}>Import Initial Report</Tile>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Button bsSize='large' bsStyle='default' onClick={this.goBack}>Go Back</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = Dashboard;
