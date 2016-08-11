'use strict';

describe('Report factory', () => {

    var Constants = require('../../js/constants/Constants'),
        Generator = require('../environment/Generator').default,
        Vocabulary = require('../../js/constants/Vocabulary'),
        ReportFactory = require('../../js/model/ReportFactory');

    it('creates occurrence report for occurrence report Java class.', () => {
        var report = ReportFactory.createReport(Constants.OCCURRENCE_REPORT_JAVA_CLASS);
        expect(report.javaClass).toEqual(Constants.OCCURRENCE_REPORT_JAVA_CLASS);
    });

    it('creates occurrence report for occurrence report OWL class.', () => {
        var report = ReportFactory.createReport(Vocabulary.OCCURRENCE_REPORT);
        expect(report.javaClass).toEqual(Constants.OCCURRENCE_REPORT_JAVA_CLASS);
    });

    it('creates safety issue report report for safety issue report Java class.', () => {
        var report = ReportFactory.createReport(Constants.SAFETY_ISSUE_REPORT_JAVA_CLASS);
        expect(report.javaClass).toEqual(Constants.SAFETY_ISSUE_REPORT_JAVA_CLASS);
    });

    it('creates safety issue report report for safety issue report OWL class.', () => {
        var report = ReportFactory.createReport(Vocabulary.SAFETY_ISSUE_REPORT);
        expect(report.javaClass).toEqual(Constants.SAFETY_ISSUE_REPORT_JAVA_CLASS);
    });

    it('creates safety issue based on report', () => {
        var basedOn = Generator.generateOccurrenceReport();
        basedOn.occurrence.referenceId = 117;

        var report = ReportFactory.createReport(Vocabulary.SAFETY_ISSUE_REPORT, {basedOn: basedOn});
        expect(report.safetyIssue.basedOn).toBeDefined();
    });

    it('creates safety issue report with copied factor graph.', () => {
        var basedOn = Generator.generateOccurrenceReport();
        basedOn.occurrence.referenceId = 117;
        basedOn.factorGraph = {
            nodes: [basedOn.occurrence.referenceId]
        };
        Array.prototype.push.apply(basedOn.factorGraph.nodes, Generator.generateFactorGraphNodes());
        basedOn.factorGraph.edges = Generator.generateFactorLinksForNodes(basedOn.factorGraph.nodes);
        var originalGraph = basedOn.factorGraph;

        var report = ReportFactory.createReport(Vocabulary.SAFETY_ISSUE_REPORT, {basedOn: basedOn});
        expect(report.factorGraph).not.toBeNull();
        expect(report.factorGraph.nodes.length).toEqual(originalGraph.nodes.length);
        for (var i = 0; i < report.factorGraph.nodes.length; i++) {
            expect(report.factorGraph.nodes[i].uri).not.toBeDefined();
        }
        expect(report.factorGraph.edges.length).toEqual(originalGraph.edges.length);
    });
});
