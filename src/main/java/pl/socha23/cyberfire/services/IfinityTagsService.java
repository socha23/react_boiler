package pl.socha23.cyberfire.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;

import java.util.ArrayList;
import java.util.List;

@Primary
@Component
public class IfinityTagsService extends AbstractIfinityIntegrationService<List<Tag>> implements ITagsService {

    @Override
    protected String getServicePath() {
        return "/qpe/getTagPosition";
    }

    @Override
    protected int getRefreshIntervalMillis() {
        return 1000;
    }

    @Override
    public List<Tag> getAllTags() {
        return getServiceResult();
    }

    @Override
    protected List<Tag> decodeResult(JsonNode json) {
        List<Tag> tags = new ArrayList<>();
        ArrayNode tagNodes = (ArrayNode)json.get("tags");
        for (JsonNode node : tagNodes) {

            ArrayNode position = (ArrayNode)node.get("smoothedPosition");
            Tag t = Tag.builder()
                    .id(node.get("id").asText())
                    .name(node.get("name").asText())
                    .color(node.get("color").asText("red"))
                    .coordinateSystemId(node.get("coordinateSystemId").asText())
                    .coordinateSystemName(node.get("coordinateSystemName").asText())
                    .position(new Position(
                            position.get(0).asDouble(),
                            position.get(1).asDouble(),
                            position.get(2).asDouble()
                            ))
                    .build();
            tags.add(t);
        }
        return tags;
    }
}
