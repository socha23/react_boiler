package pl.socha23.cyberfire.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.socha23.cyberfire.model.Fireteam;

@RepositoryRestResource
public interface FireteamRepository extends MongoRepository<Fireteam, String> {
}
