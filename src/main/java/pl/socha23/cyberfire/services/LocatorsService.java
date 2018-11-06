package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Component
public class LocatorsService implements ILocatorsService {

    private Map<String, Locator> staticLocators = new HashMap<>();

    @Override
    public Collection<Locator> getAllLocators() {
        return staticLocators.values();
    }

    @Override
    public void update(Locator locator) {
        staticLocators.put(locator.getId(), locator);
    }


}
