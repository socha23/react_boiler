package pl.socha23.cyberfire.services;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;
import pl.socha23.cyberfire.model.MapCoords;

import java.util.Collection;
import java.util.Optional;

@Component
public class LocatorsService implements ILocatorsService {

    @Setter
    @Value("${locatorSnapToPin:0}")
    private double snapToPin = 0;

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
    public Locator updateButCopyPinFromPrevious(Locator locator) {
        datasource
                .findById(locator.getId())
                .ifPresent(prev -> locator.setPinned(prev.getPinned()));
        updateLocationOrSnapToPin(locator, locator.getLocation());
        return datasource.save(locator);
    }

    @Override
    public void deleteById(String id) {
        datasource.deleteById(id);
    }

    @Override
    public Optional<Locator> updateLocation(String id, MapCoords location) {
        return datasource.findById(id).map(loc -> {
            updateLocationOrSnapToPin(loc, location);
            return datasource.save(loc);
        });
    }

    private void updateLocationOrSnapToPin(Locator loc, MapCoords target) {
        MapCoords pin = loc.getPinned();
        if (pin == null || target.distanceTo(pin) > snapToPin) {
            loc.setLocation(target);
        } else {
            loc.setLocation(pin);
        }
    }
}
