package cz.cvut.kbss.inbas.reporting.service.repository;

import cz.cvut.kbss.inbas.reporting.model.util.HasOwlKey;
import cz.cvut.kbss.inbas.reporting.persistence.dao.OwlKeySupportingDao;

/**
 * Implements the {@link #findByKey(String)} method for all services which support key-based identification.
 *
 * @param <T> Entity type supporting keys
 */
abstract class KeySupportingRepositoryService<T extends HasOwlKey> extends BaseRepositoryService<T> {

    @Override
    protected abstract OwlKeySupportingDao<T> getPrimaryDao();

    public T findByKey(String key) {
        final T result = getPrimaryDao().findByKey(key);
        postLoad(result);
        return result;
    }
}
