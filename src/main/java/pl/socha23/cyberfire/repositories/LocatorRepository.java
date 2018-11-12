package pl.socha23.cyberfire.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;

@Component
public interface LocatorRepository extends MongoRepository<Locator, String> {
}
