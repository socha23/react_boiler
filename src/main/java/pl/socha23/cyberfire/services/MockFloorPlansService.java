package pl.socha23.cyberfire.services;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Random;

@Component
public class MockFloorPlansService implements IFloorPlansService {

    private final static Resource BASEMENT_PNG = new ClassPathResource("maps/basement.png");
    private final static Resource GROUND_PNG = new ClassPathResource("maps/ground.png");

    private List<FloorPlan> floorPlans = new ArrayList<>();

    @PostConstruct
    private void createSampleFloorPlans() {
        floorPlans.add(FloorPlan.builder()
                .id("basement")
                .name("Piwnica")
                .topLeft(new Position(0, 0, 0))
                .bottomRight(new Position(1678, 1533, 0))
                .base64content(getBase64content(BASEMENT_PNG))
                .build()
        );
        floorPlans.add(FloorPlan.builder()
                .id("ground")
                .name("Parter")
                .topLeft(new Position(0, 0, 0))
                .bottomRight(new Position(1678, 1533, 0))
                .base64content(getBase64content(GROUND_PNG))
                .build()
        );
    }

    private String getBase64content(Resource imageFile) {
        try {
            byte[] bytes = IOUtils.toByteArray(imageFile.getInputStream());
            String base64 = Base64.getEncoder().encodeToString(bytes);
            return "data:image/png;base64," + base64;

        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }

    @Override
    public List<FloorPlan> getAllFloorPlans() {
        return floorPlans;
    }
}
