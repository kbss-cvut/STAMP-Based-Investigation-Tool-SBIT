package cz.cvut.kbss.inbas.reporting.model;

import cz.cvut.kbss.inbas.reporting.model.util.HasUri;
import cz.cvut.kbss.jopa.model.annotations.*;

import java.io.Serializable;
import java.net.URI;

@OWLClass(iri = Vocabulary.s_c_factor)
public class Factor implements HasUri, Serializable {

    @Id(generated = true)
    private URI uri;

    @ParticipationConstraints(nonEmpty = true)
    @OWLObjectProperty(iri = Vocabulary.s_p_has_factor, fetch = FetchType.EAGER)
    private Event event;

    @ParticipationConstraints(nonEmpty = true)
    @OWLDataProperty(iri = Vocabulary.s_p_has_factor_type)
    private FactorType type;

    @Override
    public URI getUri() {
        return uri;
    }

    public void setUri(URI uri) {
        this.uri = uri;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public FactorType getType() {
        return type;
    }

    public void setType(FactorType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return event + "(" + type + ')';
    }
}
