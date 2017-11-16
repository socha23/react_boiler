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

            double bottomLeftX = imageNode.get("xMeter").asDouble();
            double bottomLeftY = imageNode.get("yMeter").asDouble();
            double imageWidth = imageNode.get("widthMeter").asDouble();
            double imageHeight = imageNode.get("heightMeter").asDouble();

            FloorPlan plan = FloorPlan.builder()
                    .id(systemNode.get("id").asText())
                    .name(nullSafeGet(systemNode, "name", "Floor plan name"))
                    .topLeft(new Position(
                            bottomLeftX,
                            bottomLeftY + imageHeight,
                            0))
                    .bottomRight(new Position(
                            bottomLeftX + imageWidth,
                            bottomLeftY,
                            0))
                    .base64content(bytesToImgSrc(nullSafeGet(imageNode, "base64", "")))
                    .build();
            floorPlans.add(plan);
        }
        return floorPlans;
    }

    private String bytesToImgSrc(String base64) {
        return base64;
    }
}
