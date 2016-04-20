package cz.cvut.kbss.inbas.reporting.model;

import cz.cvut.kbss.jopa.model.annotations.*;

import java.io.Serializable;
import java.net.URI;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@OWLClass(iri = Vocabulary.Report)
public class Report implements LogicalDocument, Serializable {

    @Id(generated = true)
    private URI uri;

    @ParticipationConstraints(nonEmpty = true)
    @OWLDataProperty(iri = Vocabulary.p_hasKey, readOnly = true)
    private String key;

    @ParticipationConstraints(nonEmpty = true)
    @OWLDataProperty(iri = Vocabulary.p_fileNumber, readOnly = true)
    private Long fileNumber;

    @ParticipationConstraints(nonEmpty = true)
    @OWLObjectProperty(iri = Vocabulary.p_hasAuthor, fetch = FetchType.EAGER, readOnly = true)
    private Person author;

    @OWLDataProperty(iri = Vocabulary.p_dateCreated, readOnly = true)
    private Date dateCreated;

    @OWLDataProperty(iri = Vocabulary.p_lastModified, readOnly = true)
    private Date lastModified;

    @OWLObjectProperty(iri = Vocabulary.p_lastModifiedBy, fetch = FetchType.EAGER, readOnly = true)
    private Person lastModifiedBy;

    @ParticipationConstraints(nonEmpty = true)
    @OWLDataProperty(iri = Vocabulary.p_revision, readOnly = true)
    private Integer revision;

    @Types(readOnly = true)
    private Set<String> types;

    public Report() {
    }

    public Report(OccurrenceReport report) {
        assert report != null;
        this.uri = report.getUri();
        this.key = report.getKey();
        this.fileNumber = report.getFileNumber();
        this.author = report.getAuthor();
        this.dateCreated = report.getDateCreated();
        this.lastModified = report.getLastModified();
        this.lastModifiedBy = report.getLastModifiedBy();
        this.revision = report.getRevision();
        this.types = new HashSet<>();
        types.add(Vocabulary.OccurrenceReport);
    }

    @Override
    public URI getUri() {
        return uri;
    }

    public void setUri(URI uri) {
        this.uri = uri;
    }

    @Override
    public String getKey() {
        return key;
    }

    @Override
    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public Long getFileNumber() {
        return fileNumber;
    }

    public void setFileNumber(Long fileNumber) {
        this.fileNumber = fileNumber;
    }

    @Override
    public Person getAuthor() {
        return author;
    }

    public void setAuthor(Person author) {
        this.author = author;
    }

    @Override
    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    @Override
    public Person getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(Person lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    @Override
    public Integer getRevision() {
        return revision;
    }

    public void setRevision(Integer revision) {
        this.revision = revision;
    }

    public Set<String> getTypes() {
        return types;
    }

    public void setTypes(Set<String> types) {
        this.types = types;
    }

    @Override
    public String toString() {
        return "Report{" +
                "uri=" + uri +
                ", key='" + key + '\'' +
                ", fileNumber=" + fileNumber +
                ", revision=" + revision +
                ", author=" + author +
                '}';
    }
}
