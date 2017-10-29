package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class MockLocatorsService implements ILocatorsService {

    private final static double WARSAW_LAT = 52.2297;
    private final static double WARSAW_LNG = 21.0122;
    private final static double SCATTER = 0.02;

    private final static Random random = new Random();

    private List<Locator> locators = new ArrayList<>();


    @PostConstruct
    private void createSampleLocators() {
        for (int i = 1; i <= 5; i++) {

            locators.add(
                    Locator.builder()
                            .id("locator_" + i)
                            .name("Skrzynia #" + i)
                            .type(Locator.Type.CRATE)
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
        return locators;
    }
}
