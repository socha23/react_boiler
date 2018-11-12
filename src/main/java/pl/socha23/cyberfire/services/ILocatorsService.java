package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.Locator;

import java.util.Collection;

public interface ILocatorsService {

    Collection<Locator> getAllLocators();

    Locator updateOrCreate(Locator locator);

    void deleteById(String id);
}
