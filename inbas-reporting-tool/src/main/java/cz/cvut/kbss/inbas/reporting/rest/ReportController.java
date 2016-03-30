package cz.cvut.kbss.inbas.reporting.rest;

import cz.cvut.kbss.inbas.reporting.dto.AbstractReportDto;
import cz.cvut.kbss.inbas.reporting.dto.PreliminaryReportDto;
import cz.cvut.kbss.inbas.reporting.dto.ReportRevisionInfo;
import cz.cvut.kbss.inbas.reporting.exception.NotFoundException;
import cz.cvut.kbss.inbas.reporting.model_new.OccurrenceReport;
import cz.cvut.kbss.inbas.reporting.model_new.Report;
import cz.cvut.kbss.inbas.reporting.rest.dto.mapper.ReportMapper;
import cz.cvut.kbss.inbas.reporting.rest.exception.BadRequestException;
import cz.cvut.kbss.inbas.reporting.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController extends BaseController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private ReportMapper reportMapper;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<OccurrenceReport> getAllReports() {
        try {
            return reportService.findAll();
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(e);
        }
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> createReport(@RequestBody PreliminaryReportDto reportDto) {
        return null;
    }

    @RequestMapping(value = "/{key}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public AbstractReportDto getReport(@PathVariable("key") String key) {
        final Report report = getReportInternal(key);
        return null;
    }

    private Report getReportInternal(String key) {
        final Report report = reportService.findByKey(key);
        if (report == null) {
            throw NotFoundException.create("Occurrence report", key);
        }
        return report;
    }

    @RequestMapping(value = "/{key}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateReport(@PathVariable("key") String key, @RequestBody AbstractReportDto reportUpdate) {
        if (!key.equals(reportUpdate.getKey())) {
            throw new BadRequestException("The passed report's key is different from the specified one.");
        }
        final Report report = null;
        reportService.update(report);
        if (LOG.isTraceEnabled()) {
            LOG.trace("Updated report {}", report);
        }
    }

    @RequestMapping(value = "/chain/{fileNumber}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeChain(@PathVariable("fileNumber") Long fileNumber) {
        reportService.removeReportChain(fileNumber);
    }

    @RequestMapping(value = "/chain/{fileNumber}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public AbstractReportDto findLatestRevision(@PathVariable("fileNumber") Long fileNumber) {
        final Report report = reportService.findLatestRevision(fileNumber);
        if (report == null) {
            throw NotFoundException.create("Report chain", fileNumber);
        }
        return null;
    }

    @RequestMapping(value = "/chain/{fileNumber}/revisions", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ReportRevisionInfo> getReportChainRevisions(@PathVariable("fileNumber") Long fileNumber) {
        return reportService.getReportChainRevisions(fileNumber);
    }

    /**
     * Creates new revision in the report chain (of the same type as the latest revision) or starts investigation (from
     * latest preliminary report).
     *
     * @param fileNumber  Report chain identifier
     * @param investigate Whether a new investigation should be start
     * @return Response with location header pointing to the new report
     */
    @RequestMapping(value = "/chain/{fileNumber}/revisions", method = RequestMethod.POST)
    public ResponseEntity<Void> createNewRevision(@PathVariable("fileNumber") Long fileNumber,
                                                  @RequestParam(required = false, value = "investigate") boolean investigate) {
        return null;
    }

    @RequestMapping(value = "/chain/{fileNumber}/revisions/{revision}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public AbstractReportDto getRevision(@PathVariable("fileNumber") Long fileNumber,
                                         @PathVariable("revision") Integer revision) {
        final Report report = reportService.findRevision(fileNumber, revision);
        if (report == null) {
            throw new NotFoundException(
                    "Report with revision " + revision + " not found in report chain with file number " + fileNumber +
                            " or the report chain does not exist.");
        }
        return null;
    }
}
