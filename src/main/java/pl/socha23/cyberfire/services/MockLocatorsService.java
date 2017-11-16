package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;

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


    @PostConstruct
    private void createSampleLocators() {
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
            staticLocators.add(
                    Locator.builder()
                            .id("container_" + i)
                            .name("Kontener #" + i)
                            .type(Locator.Type.CONTAINER)
                            .latitude(WARSAW_LAT + gaussianScatter())
                            .longitude(WARSAW_LNG + gaussianScatter())
                    .build()
            );
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
