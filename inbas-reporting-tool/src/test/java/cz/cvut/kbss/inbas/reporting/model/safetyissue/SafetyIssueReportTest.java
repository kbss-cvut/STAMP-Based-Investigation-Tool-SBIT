package cz.cvut.kbss.inbas.reporting.model.safetyissue;

import cz.cvut.kbss.inbas.reporting.dto.reportlist.ReportDto;
import cz.cvut.kbss.inbas.reporting.dto.reportlist.SafetyIssueReportDto;
import cz.cvut.kbss.inbas.reporting.environment.generator.Generator;
import cz.cvut.kbss.inbas.reporting.environment.generator.SafetyIssueReportGenerator;
import cz.cvut.kbss.inbas.reporting.model.Vocabulary;
import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.*;

public class SafetyIssueReportTest {

    @Test
    public void copyConstructorCopiesBasicFields() {
        final SafetyIssueReport original = SafetyIssueReportGenerator.generateSafetyIssueReport(true, false);
        original.setLastModifiedBy(Generator.getPerson());
        original.setLastModified(new Date());
        final SafetyIssueReport copy = new SafetyIssueReport(original);
        assertNull(copy.getUri());
        assertNull(copy.getKey());
        assertNull(copy.getAuthor());
        assertNull(copy.getDateCreated());
        assertNull(copy.getLastModified());
        assertNull(copy.getLastModifiedBy());
        assertEquals(original.getFileNumber(), copy.getFileNumber());
        assertEquals(original.getSummary(), copy.getSummary());
        assertEquals(original.getTypes(), copy.getTypes());
    }

    @Test
    public void copyConstructorCopiesCorrectiveMeasures() {
        final SafetyIssueReport original = SafetyIssueReportGenerator.generateSafetyIssueReport(true, true);
        assertFalse(original.getCorrectiveMeasures().isEmpty());
        final SafetyIssueReport copy = new SafetyIssueReport(original);
        assertEquals(original.getCorrectiveMeasures().size(), copy.getCorrectiveMeasures().size());
        boolean found;
        for (CorrectiveMeasure m : original.getCorrectiveMeasures()) {
            found = false;
            for (CorrectiveMeasure mm : copy.getCorrectiveMeasures()) {
                // We can't use URI for equality, because there is none in the copy, yet
                if (m.getDescription().equals(mm.getDescription())) {
                    found = true;
                    assertNotSame(m, mm);
                    assertEquals(m.getResponsiblePersons(), mm.getResponsiblePersons());
                    assertEquals(m.getResponsibleOrganizations(), mm.getResponsibleOrganizations());
                }
            }
            assertTrue(found);
        }
    }

    @Test
    public void copyConstructorCopiesSafetyIssue() {
        final SafetyIssueReport original = SafetyIssueReportGenerator.generateSafetyIssueReport(true, true);
        final SafetyIssueReport copy = new SafetyIssueReport(original);
        assertNotNull(copy.getSafetyIssue());
        assertEquals(original.getSafetyIssue().getName(), copy.getSafetyIssue().getName());
        assertNotSame(original.getSafetyIssue(), copy.getSafetyIssue());
    }

    @Test
    public void toDtoCopiesAttributesToSafetyIssueReportDto() {
        final SafetyIssueReport original = SafetyIssueReportGenerator.generateSafetyIssueReport(true, true);
        original.setUri(Generator.generateUri());
        final ReportDto dto = original.toReportDto();
        assertTrue(dto instanceof SafetyIssueReportDto);
        final SafetyIssueReportDto result = (SafetyIssueReportDto) dto;
        assertEquals(original.getUri(), result.getUri());
        assertEquals(original.getKey(), result.getKey());
        assertEquals(original.getFileNumber(), result.getFileNumber());
        assertEquals(original.getAuthor(), result.getAuthor());
        assertEquals(original.getDateCreated(), result.getDateCreated());
        assertEquals(original.getLastModifiedBy(), result.getLastModifiedBy());
        assertEquals(original.getLastModified(), result.getLastModified());
        assertEquals(original.getSummary(), result.getSummary());
        assertEquals(original.getRevision(), result.getRevision());
        assertEquals(original.getSafetyIssue().getName(), result.getIdentification());
        assertTrue(result.getTypes().containsAll(original.getTypes()));
    }

    @Test
    public void toDtoAddsClassIriToDtoTypes() {
        final SafetyIssueReport original = SafetyIssueReportGenerator.generateSafetyIssueReport(true, true);
        final ReportDto dto = original.toReportDto();
        assertTrue(dto.getTypes().contains(Vocabulary.s_c_safety_issue_report));
    }
}