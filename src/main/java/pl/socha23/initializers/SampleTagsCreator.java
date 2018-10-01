package pl.socha23.initializers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.FloorPlanArea;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;
import pl.socha23.cyberfire.services.IFloorPlansService;
import pl.socha23.cyberfire.services.TagsService;

import java.util.List;
import java.util.Random;

@Component
@Profile("dev")
public class SampleTagsCreator implements CommandLineRunner {

    @Autowired
    private TagsService tagsService;

    @Autowired
    private IFloorPlansService floorPlansService;

    private final static Random random = new Random();

    @Value("${mockTagsCount}")
    private int mockTagsCount = 0;

    @Override
    public void run(String... args) throws Exception {
        if (noTags()) {
            createSampleTags();
        }
    }

    private boolean noTags() {
        return tagsService.getAllTags().size() == 0;
    }

    private void createSampleTags() {
        for (int i = 1; i <= mockTagsCount; i++) {

            FloorPlan floor = randomFloor();
            FloorPlanArea area = randomArea(floor);

            Tag t = Tag.builder()
                    .id("tag_" + i)
                    .name("Wirtualny #" + i)
                    .color("blue")
                    .coordinateSystemId(floor.getId())
                    .coordinateSystemName(floor.getName())
                    .areaId(area.getId())
                    .areaName(area.getName())
					.position(randomPositionOnTopLeftQuadrant(floor))
                    .state(Tag.State.INSIDE)
                    .build();

            tagsService.updateOrCreate(t);
        }
    }

    private FloorPlan randomFloor() {
        List<FloorPlan> floors = floorPlansService.getAllFloorPlans();
        return floors.get(random.nextInt(floors.size()));
    }

    private FloorPlanArea randomArea(FloorPlan plan) {
        List<FloorPlanArea> areas = plan.getAreas();
        return areas.get(random.nextInt(areas.size()));
    }

    private Position randomPositionOnTopLeftQuadrant(FloorPlan floor) {

        double width = floor.getBottomRight().getX() - floor.getTopLeft().getX();
        double height = floor.getBottomRight().getY() - floor.getTopLeft().getY();

        double x = width * 0.5 + floor.getTopLeft().getX();
        double y = height * 0.5 + floor.getTopLeft().getY();

        return randomPositionInSquare(floor.getTopLeft(), new Position(x, y, floor.getTopLeft().getZ()));
    }

    private Position randomPositionInSquare(Position topLeft, Position bottomRight) {

        double width = bottomRight.getX() - topLeft.getX();
        double height = bottomRight.getY() - topLeft.getY();

        double x = width * random.nextDouble() + topLeft.getX();
        double y = height * random.nextDouble() + topLeft.getY();

        return new Position(x, y, topLeft.getZ());
    }

}
