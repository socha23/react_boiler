package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Artifact;
import pl.socha23.cyberfire.model.Locator;
import pl.socha23.cyberfire.model.NearbyDevice;
import pl.socha23.cyberfire.repositories.ArtifactRepository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

//@Profile("dev")
@Component
public class MockLocatorsService implements ILocatorsService {

    private final static double WARSAW_LAT = 52.2297;
    private final static double WARSAW_LNG = 21.0122;
    private final static double SCATTER = 0.02;

    private final static Random random = new Random();

    private List<Locator> staticLocators = new ArrayList<>();
    private ForgettingStore<Locator> dynamicLocators = new ForgettingStore<>(60 * 1000);

    @Autowired
    private ArtifactRepository artifactRepository;


    @PostConstruct
    private void createSampleLocators() {
        List<Artifact> artifacts = artifactRepository.findAll();

        for (int i = 1; i <= 5; i++) {
            staticLocators.add(
                    Locator.builder()
                            .id("crate_" + i)
                            .name("Skrzynia #" + i)
                            .type(Locator.Type.CRATE)
                            .latitude(WARSAW_LAT + gaussianScatter())
                            .longitude(WARSAW_LNG + gaussianScatter())
                            .build()
            );
        }
        for (int i = 1; i <= 5; i++) {
            Locator container = Locator.builder()
                    .id("container_" + i)
                    .name("Kontener #" + i)
                    .type(Locator.Type.CONTAINER)
                    .latitude(WARSAW_LAT + gaussianScatter())
                    .longitude(WARSAW_LNG + gaussianScatter())
                    .nearbyDevices(new ArrayList<>())
                    .build();

            if (random.nextInt(3) == 0) {
                int numOfArtifactsInContainer = random.nextInt(Math.min(4, artifacts.size()));
                for (int j = 0; j < numOfArtifactsInContainer; j++) {
                    Artifact a = artifacts.remove(random.nextInt(artifacts.size()));
                    container.getNearbyDevices().add(new NearbyDevice(a.getId(), (int)(-60 + random.nextGaussian() * 30)));
                }
            }

            staticLocators.add(container);
        }
    }

    private double gaussianScatter() {
        return random.nextGaussian() * SCATTER;
    }

    @Override
    public List<Locator> getAllLocators() {
        List<Locator> result = new ArrayList<>();
        result.addAll(staticLocators);
        result.addAll(dynamicLocators.list());
        return result;
    }

    @Override
    public void update(Locator locator) {
        dynamicLocators.put(locator.getId(), locator);
    }


}
