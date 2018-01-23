package pl.socha23.cyberfire.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;

import java.util.ArrayList;
import java.util.List;

@Profile("prod")
@Component
public class IfinityInsideTagsProvider extends AbstractIfinityIntegrationService<List<Tag>> implements IInsideTagsProvider {

    @Autowired
    private IFloorPlansService floorPlansService;

    @Override
    protected String getServicePath() {
        return "/qpe/getTagPosition";
    }

    @Override
    protected int getRefreshIntervalMillis() {
        return 500;
    }

    @Override
    public List<Tag> getAllTagsInside() {
		return getServiceResult();
    }

	@Override
    protected List<Tag> decodeResult(JsonNode json) {
        List<Tag> tags = new ArrayList<>();
        ArrayNode tagNodes = (ArrayNode)json;
        for (JsonNode node : tagNodes) {

            FloorPlan floor = floorPlansService.getFloorPlanByAreaId(node.get("areaId").asText());

            Tag t = Tag.builder()
                    .id(node.get("id").asText())
                    .name(node.get("id").asText())
                    .color(node.get("color").asText("red"))
                    .areaId(node.get("areaId").asText())
                    .areaName(node.get("areaName").asText())
                    .coordinateSystemId(floor.getId())
                    .coordinateSystemName(floor.getName())
                    .position(new Position(
                            node.get("smoothedPositionX").asDouble(),
                            node.get("smoothedPositionY").asDouble(),
                            node.get("smoothedPositionZ").asDouble()
                            ))
                    .state(Tag.State.INSIDE)
					.build();
            tags.add(t);
        }
        return tags;
    }
}
