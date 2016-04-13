package cz.cvut.kbss.inbas.reporting.persistence.dao;

import cz.cvut.kbss.inbas.reporting.model.Occurrence;
import org.springframework.stereotype.Repository;

@Repository
public class OccurrenceDao extends OwlKeySupportingDao<Occurrence> {

    public OccurrenceDao() {
        super(Occurrence.class);
    }
}
