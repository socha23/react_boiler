package pl.socha23.cyberfire.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Artifact;

@RepositoryRestResource
public interface ArtifactRepository extends MongoRepository<Artifact, String> {
}
