package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class MockFloorPlansService implements IFloorPlansService {

    private final static String[] FLOOR_NAMES = {"Parter", "1 piętro", "2 piętro"};

    private List<FloorPlan> floorPlans = new ArrayList<>();

    @PostConstruct
    private void createSampleFloorPlans() {
        for (int i = 0; i < 2; i++) {
            floorPlans.add(FloorPlan.builder()
                    .id("floorPlan" + i)
                    .name(FLOOR_NAMES[i])
                    .topLeft(new Position(0, 0, 0))
                    .bottomRight(new Position(100, 50, 0))
                    .base64content(getBase64content(i))
                    .build()
            );
        }
    }

    private String getBase64content(int i) {
        return "base64/" + i;
    }

    @Override
    public List<FloorPlan> getAllFloorPlans() {
        return floorPlans;
    }
}
