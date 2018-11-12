package pl.socha23.cyberfire.services

import pl.socha23.cyberfire.model.Locator

class MemLocatorDatasource implements LocatorDatasource {

    private Map<String, Locator> locators = [:]

    @Override
    Collection<Locator> list() {
        return locators.values()
    }

    @Override
    Locator save(Locator locator) {
        return locators[locator.id] = locator
    }

    @Override
    void deleteById(String id) {
        locators.remove(id)
    }

    @Override
    Optional<Locator> findById(String id) {
        return Optional.ofNullable(locators.get(id))
    }
}
