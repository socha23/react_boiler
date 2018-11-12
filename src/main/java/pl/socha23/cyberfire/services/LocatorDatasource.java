package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.Locator;

import java.util.Collection;
import java.util.Optional;

public interface LocatorDatasource {
    Collection<Locator> list();
    Locator save(Locator locator);
    void deleteById(String id);
    Optional<Locator> findById(String id);
}
