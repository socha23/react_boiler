package pl.socha23.cyberfire.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import pl.socha23.cyberfire.model.Artifact;
import pl.socha23.cyberfire.model.Image;

@Repository
public interface ImageRepository extends MongoRepository<Image, String> {
}
