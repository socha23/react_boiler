package pl.socha23.cyberfire.services;

import org.apache.commons.io.IOUtils;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.Position;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Profile("dev")
@Component
public class MockFloorPlansService implements IFloorPlansService {

    private final static Resource BASEMENT_PNG = new ClassPathResource("examples/maps/basement.png");
    private final static Resource GROUND_PNG = new ClassPathResource("examples/maps/ground.png");

    private List<FloorPlan> floorPlans = new ArrayList<>();

    public final static Position TOP_LEFT = new Position(100, 100, 0);
    public final static Position BOTTOM_RIGHT = new Position(-100, -100, 0);

    @PostConstruct
    private void createSampleFloorPlans() {
        floorPlans.add(FloorPlan.builder()
                .id("basement")
                .name("Piwnica")
                .topLeft(TOP_LEFT)
                .bottomRight(BOTTOM_RIGHT)
                .base64content(getBase64content(BASEMENT_PNG))
                .build()
        );
        floorPlans.add(FloorPlan.builder()
                .id("ground")
                .name("Parter")
                .topLeft(TOP_LEFT)
                .bottomRight(BOTTOM_RIGHT)
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
