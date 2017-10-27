package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class MockLocatorsService implements ILocatorsService {
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
                            .latitude(52 + Math.random())
                            .longitude(20.5 + Math.random())
                    .build()
            );
        }
    }
    @Override
    public List<Locator> getAllLocators() {
        return locators;
    }
}
