package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;

import java.util.Collection;

@Component
public class LocatorsService implements ILocatorsService {

    private LocatorDatasource datasource;

    public LocatorsService(LocatorDatasource datasource) {
        this.datasource = datasource;
    }

    @Override
    public Collection<Locator> getAllLocators() {
        return datasource.list();
    }

    @Override
    public Locator updateOrCreate(Locator locator) {
        return datasource.save(locator);
    }

    @Override
    public void deleteById(String id) {
        datasource.deleteById(id);
    }


}
