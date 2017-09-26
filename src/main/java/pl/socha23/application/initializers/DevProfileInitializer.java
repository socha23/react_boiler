package pl.socha23.application.initializers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Artifact;
import pl.socha23.cyberfire.repositories.ArtifactRepository;

@Profile("dev")
@Component
public class DevProfileInitializer implements CommandLineRunner {

    // @Value(value = "classpath:configs/dev/defaultConfig.yml")
    // private Resource defaultConfigSource;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Override
    public void run(String... args) throws Exception {

        if (noArtifacts()) {
            createSampleArtifacts();
        }


    }

    private boolean noArtifacts() {
        return artifactRepository.count() == 0;
    }

    private void createSampleArtifacts() {
        createAndSaveArtifact("Włócznia Longinusa", 5);
        createAndSaveArtifact("Arka przymierza", 20);
        createAndSaveArtifact("Swięty Graal", 1);
    }

    private void createAndSaveArtifact(String name, int weight) {
        Artifact a = new Artifact();
        a.setName(name);
        a.setWeight(weight);
        artifactRepository.save(a);
    }
}
