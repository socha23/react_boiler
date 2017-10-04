package pl.socha23.application.initializers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Artifact;
import pl.socha23.cyberfire.repositories.ArtifactRepository;

import java.time.LocalDateTime;
import java.util.Arrays;

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
        createAndSaveArtifact("Włócznia Longinusa", 5,
                LocalDateTime.now().minusDays(4),
                "ancient", "weapon");
        createAndSaveArtifact("Arka przymierza", 20,
                LocalDateTime.now().minusDays(15),
                "religious", "communication");
        createAndSaveArtifact("Swięty Graal", 1,
                LocalDateTime.now().minusDays(20),
                "religious", "pottery");

    }

    private void createAndSaveArtifact(String name, int weight, LocalDateTime bought, String ... tags) {
        Artifact a = new Artifact();
        a.setName(name);
        a.setWeight(weight);
        a.setBoughtOn(bought);
        a.setTags(Arrays.asList(tags));
        artifactRepository.save(a);
    }
}
