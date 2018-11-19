package pl.socha23.cyberfire.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

@Component
public class IfinityTagPositionWS extends AbstractIfinityIntegrationService<List<Tag>> {

    @Autowired
    private IFloorPlansService floorPlansService;

    private Set<String> beaconsToIgnore = new HashSet<>();

    public IfinityTagPositionWS() {
        beaconsToIgnore.add("OZAB13");        
        beaconsToIgnore.add("OZAB14");        
        beaconsToIgnore.add("OZAB15");        
    }

    @Override
    protected String getServicePath() {
        return "/qpe/getTagPosition";
    }

    @Override
    protected int getRefreshIntervalMillis() {
        return 20;
    }

    public List<Tag> getTags() {
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
                    .name(node.get("name") == null ? node.get("id").asText() : node.get("name").asText())
                    .color(node.get("color").asText("red"))
                    .areaId(node.get("areaId").asText())
                    .areaName(floor.getName())
                    .coordinateSystemId(floor.getId())
                    .coordinateSystemName(floor.getName())
                    .position(new Position(
                            node.get("positionX").asDouble(),
                            node.get("positionY").asDouble(),
                            node.get("positionZ").asDouble()
                            ))
                    .state(Tag.State.INSIDE)
                    .build();
            if (t.getName().equals("OZAB12")) {
                t.setName("Wyjście 1");
            }
            if (t.getName().equals("OZAB03")) {
                t.setName("Wyjście 2");
            }

            if (!beaconsToIgnore.contains(t.getName())) {
                tags.add(t);
            }

        }
        return tags;
    }


}
