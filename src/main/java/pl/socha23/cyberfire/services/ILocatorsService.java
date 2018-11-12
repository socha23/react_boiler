package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.Locator;
import pl.socha23.cyberfire.model.MapCoords;

import java.util.Collection;
import java.util.Optional;

public interface ILocatorsService {

    Collection<Locator> getAllLocators();

    Locator updateOrCreate(Locator locator);

    void deleteById(String id);

    Optional<Locator> updateLocation(String id, MapCoords coords);

    Locator updateButCopyPinFromPrevious(Locator locator);

}
