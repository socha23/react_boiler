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
public class MockTagsService implements ITagsService {

    private final static String[] COLORS = {"red", "blue", "yellow", "green"};

    private List<Tag> tags = new ArrayList<>();

    @PostConstruct
    private void createSampleTags() {
        Random r = new Random();
        for (int i = 1; i <= 20; i++) {
            int floor = r.nextInt(3);
            tags.add(
                    Tag.builder()
                            .id("tag_" + i)
                            .name("Znacznik #" + i)
                    .color(COLORS[r.nextInt(COLORS.length)])
                    .coordinateSystemId("map" + floor)
                    .coordinateSystemName(floor == 0 ? "Parter" : floor + " piętro")
                    .position(new Position(r.nextDouble() * 100, r.nextDouble() * 50, r.nextDouble() * 30))
                    .build()
            );
        }
    }

    @Override
    public List<Tag> getAllTags() {
        return tags;
    }
}
