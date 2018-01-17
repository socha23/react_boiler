package pl.socha23.cyberfire.services;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.FloorPlanArea;
import pl.socha23.cyberfire.model.Position;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

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
                .areas(Arrays.asList(
                        new FloorPlanArea("b1", "Piwnica A"),
                        new FloorPlanArea("b2", "Piwnica B")
                        ))
                .build()
        );
        floorPlans.add(FloorPlan.builder()
                .id("ground")
                .name("Parter")
                .topLeft(TOP_LEFT)
                .bottomRight(BOTTOM_RIGHT)
                .base64content(getBase64content(GROUND_PNG))
                .areas(Arrays.asList(
                        new FloorPlanArea("g1", "Parter A"),
                        new FloorPlanArea("g2", "Parter B"),
                        new FloorPlanArea("g3", "Parter C")
                        ))
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
