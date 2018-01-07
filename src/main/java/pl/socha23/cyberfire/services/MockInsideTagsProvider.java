package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.FloorPlanArea;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Profile("dev")
@Component
public class MockInsideTagsProvider implements IInsideTagsProvider {
    private final static Random random = new Random();

    private final static String[] COLORS = {"red", "blue", "yellow", "green"};

    @Autowired
    private IFloorPlansService floorPlansService;

    private List<Tag> tags = new ArrayList<>();

    @PostConstruct
    protected void createSampleTags() {
        for (int i = 1; i <= 20; i++) {

            FloorPlan floor = randomFloor();
            FloorPlanArea area = randomArea(floor);

            tags.add(Tag.builder().id("tag_" + i).name("Znacznik #" + i).color(randomColor()).coordinateSystemId(floor.getId())
							.coordinateSystemName(floor.getName()).areaId(area.getId()).areaName(area.getName())
							.position(randomPositionOnTopLeftQuadrant(floor)).state(Tag.State.INSIDE).build());
        }
    }

    private Position randomPositionOnTopLeftQuadrant(FloorPlan floor) {

        double width = floor.getBottomRight().getX() - floor.getTopLeft().getX();
        double height = floor.getBottomRight().getY() - floor.getTopLeft().getY();

        double x = width * 0.5 + floor.getTopLeft().getX();
        double y = height * 0.5 + floor.getTopLeft().getY();

        return randomPositionInSquare(floor.getTopLeft(), new Position(x, y, floor.getTopLeft().getZ()));
    }


    private Position randomPositionOn(FloorPlan floor) {
        return randomPositionInSquare(floor.getTopLeft(), floor.getBottomRight());
    }

    private Position randomPositionInSquare(Position topLeft, Position bottomRight) {

        double width = bottomRight.getX() - topLeft.getX();
        double height = bottomRight.getY() - topLeft.getY();

        double x = width * random.nextDouble() + topLeft.getX();
        double y = height * random.nextDouble() + topLeft.getY();

        return new Position(x, y, topLeft.getZ());
    }


    private String randomColor() {
        return COLORS[random.nextInt(COLORS.length)];
    }

    private FloorPlan randomFloor() {
        List<FloorPlan> floors = floorPlansService.getAllFloorPlans();
        return floors.get(random.nextInt(floors.size()));
    }

    private FloorPlanArea randomArea(FloorPlan plan) {
        List<FloorPlanArea> areas = plan.getAreas();
        return areas.get(random.nextInt(areas.size()));
    }

    @Override
    public List<Tag> getAllTagsInside() {
	    return tags;
    }

	public Tag updateOrCreate(Tag tag) {
		for (int i = 0; i < tags.size(); i++) {
			if (tag.getId().equals(tags.get(i).getId())) {
				tags.set(i, tag);
                return tag;
			}
		}
        tags.add(tag);
		return tag;
	}
}