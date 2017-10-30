package pl.socha23.cyberfire.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.Position;

import java.util.ArrayList;
import java.util.List;

@Primary
@Component
public class IfinityFloorPlansService extends AbstractIfinityIntegrationService<List<FloorPlan>> implements IFloorPlansService {

    @Override
    protected String getServicePath() {
        return "/qpe/getProjectInfo";
    }

    @Override
    protected int getRefreshIntervalMillis() {
        return 0;
    }

    @Override
    public List<FloorPlan> getAllFloorPlans() {
        return getServiceResult();
    }

    @Override
    protected List<FloorPlan> decodeResult(JsonNode json) {
        List<FloorPlan> floorPlans = new ArrayList<>();
        ArrayNode coordinateSystemNodes = (ArrayNode)json.get("coordinateSystems");
        for (JsonNode systemNode : coordinateSystemNodes) {
            JsonNode imageNode = ((ArrayNode)systemNode.get("backgroundImages")).get(0);

            FloorPlan plan = FloorPlan.builder()
                    .id(systemNode.get("id").asText())
                    .name(nullSafeGet(systemNode, "name", "Floor plan name"))
                    .topLeft(new Position(
                            imageNode.get("origoX").asDouble(),
                            imageNode.get("origoY").asDouble(),
                            0))
                    // TODO
                    .bottomRight(new Position(400, 400, 0))
                    .base64content(bytesToImgSrc(nullSafeGet(imageNode, "base64", "")))
                    .build();
            floorPlans.add(plan);
        }
        return floorPlans;
    }

    private String bytesToImgSrc(String base64) {
        return "data:image/png;base64," + base64;
    }
}
