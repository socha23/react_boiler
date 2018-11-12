package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;
import pl.socha23.cyberfire.model.MapCoords;

import java.util.Collection;
import java.util.Optional;

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

    @Override
    public Optional<Locator> updateLocation(String id, MapCoords coords) {
        return datasource.findById(id).map(loc -> {
            loc.setCoordinates(coords);
            return datasource.save(loc);
        });
    }
}
