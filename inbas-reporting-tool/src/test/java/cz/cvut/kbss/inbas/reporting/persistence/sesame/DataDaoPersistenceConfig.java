package cz.cvut.kbss.inbas.reporting.persistence.sesame;

import cz.cvut.kbss.inbas.reporting.persistence.TestEccairsReportImportPersistenceFactory;
import cz.cvut.kbss.inbas.reporting.persistence.TestFormGenPersistenceFactory;
import cz.cvut.kbss.inbas.reporting.persistence.TestPersistenceFactory;
import org.springframework.context.annotation.*;

@Configuration
@ComponentScan(basePackages = {"cz.cvut.kbss.inbas.reporting.persistence.dao"})
@Import({TestPersistenceFactory.class,
        TestFormGenPersistenceFactory.class,
        TestEccairsReportImportPersistenceFactory.class})
public class DataDaoPersistenceConfig {

    @Bean
    @Primary
    public SesamePersistenceProvider sesamePersistenceProvider() {
        return new TestSesamePersistenceProvider();
    }

    @Bean
    public DataDao dataDao() {
        return new DataDao();
    }
}
