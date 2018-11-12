package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;
import pl.socha23.cyberfire.repositories.LocatorRepository;

import java.util.Collection;

@Component
public class MongoLocatorDatasource implements LocatorDatasource {

    private LocatorRepository repository;

    public MongoLocatorDatasource(LocatorRepository repository) {
        this.repository = repository;
    }

    @Override
    public Collection<Locator> list() {
        return repository.findAll();
    }

    @Override
    public Locator save(Locator locator) {
        return repository.save(locator);
    }

    @Override
    public void deleteById(String id) {
        repository.delete(id);
    }
}
