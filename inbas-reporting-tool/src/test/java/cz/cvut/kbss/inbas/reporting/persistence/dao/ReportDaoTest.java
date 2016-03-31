package cz.cvut.kbss.inbas.reporting.persistence.dao;

import cz.cvut.kbss.inbas.reporting.dto.ReportRevisionInfo;
import cz.cvut.kbss.inbas.reporting.environment.util.Generator;
import cz.cvut.kbss.inbas.reporting.model_new.OccurrenceReport;
import cz.cvut.kbss.inbas.reporting.model_new.Person;
import cz.cvut.kbss.inbas.reporting.model_new.Vocabulary;
import cz.cvut.kbss.inbas.reporting.persistence.BaseDaoTestRunner;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static org.junit.Assert.*;

public class ReportDaoTest extends BaseDaoTestRunner {

    @Autowired
    private ReportDao reportDao;

    @Autowired
    private OccurrenceReportDao occurrenceReportDao;

    @Test
    public void getReportTypesReturnsClassesOfOccurrenceReport() {
        final OccurrenceReport report = persistReport();
        // At least these
        final Set<String> minExpected = new HashSet<>(Arrays.asList(Vocabulary.Report, Vocabulary.OccurrenceReport));
        final Set<String> types = reportDao.getReportTypes(report.getKey());
        assertTrue(types.containsAll(minExpected));
    }

    private OccurrenceReport persistReport() {
        final OccurrenceReport report = Generator.generateOccurrenceReport(true);
        final Person author = Generator.getPerson();
        persistPerson(author);
        report.setAuthor(author);
        occurrenceReportDao.persist(report);
        return report;
    }

    @Test
    public void getReportTypesReturnsEmptySetForUnknownReport() {
        final Set<String> types = reportDao.getReportTypes("unknownReport");
        assertNotNull(types);
        assertTrue(types.isEmpty());
    }

    @Test
    public void getChainTypesReturnsTypesOfAllReportsInChain() {
        final List<OccurrenceReport> chain = persistReportChain();
        // At least these
        final Set<String> minExpected = new HashSet<>();
        minExpected.add(Vocabulary.OccurrenceReport);
        chain.forEach(r -> minExpected.addAll(r.getTypes()));

        final Set<String> types = reportDao.getChainTypes(chain.get(0).getFileNumber());
        assertTrue(types.containsAll(minExpected));
    }

    private List<OccurrenceReport> persistReportChain() {
        final Person author = Generator.getPerson();
        persistPerson(author);
        final List<OccurrenceReport> chain = Generator.generateOccurrenceReportChain(author);
        chain.get(0).getTypes().add(Vocabulary.LogicalDocument);
        chain.get(chain.size() - 1).getTypes().add(Vocabulary.LogicalRecord);
        occurrenceReportDao.persist(chain);
        return chain;
    }

    @Test
    public void getChainTypesReturnsEmptySetForUnknownChain() {
        final Set<String> types = reportDao.getChainTypes(Long.MAX_VALUE);
        assertNotNull(types);
        assertTrue(types.isEmpty());
    }

    @Test
    public void getReportChainRevisionsReturnsAllRevisions() {
        final List<OccurrenceReport> chain = persistReportChain();
        Collections.reverse(chain); // Make it descending by revision number

        final List<ReportRevisionInfo> revisions = reportDao.getReportChainRevisions(chain.get(0).getFileNumber());
        assertEquals(chain.size(), revisions.size());
        for (int i = 0; i < chain.size(); i++) {
            assertEquals(chain.get(i).getUri(), revisions.get(i).getUri());
            assertEquals(chain.get(i).getRevision(), revisions.get(i).getRevision());
        }
    }
}