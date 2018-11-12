package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.Locator;

import java.util.Collection;

public interface LocatorDatasource {
    Collection<Locator> list();
    Locator save(Locator locator);
    void deleteById(String id);
}
