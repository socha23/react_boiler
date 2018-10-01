package pl.socha23.cyberfire.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class IfinityTagInfoWS extends AbstractIfinityIntegrationService<JsonNode> {

    @Override
    protected String getServicePath() {
        return "/qpe/getTagInfo";
    }

    @Override
    protected int getRefreshIntervalMillis() {
        return 100;
    }

    @Override
    protected JsonNode decodeResult(JsonNode json) {
        return json;
    }


    Set<String> getWhichTagsNotToUpdate() {
        Set<String> tags = new HashSet<>();
        for (JsonNode n : (getServiceResult().get("tags"))) {
            if (tagShouldntBeUpdated(n)) {
                tags.add(n.get("id").asText());
            }
        }
        return tags;
    }

    private boolean tagShouldntBeUpdated(JsonNode tagNode) {
        return accelerationIsZero(tagNode);
    }

    private boolean accelerationIsZero(JsonNode tagNode) {
        JsonNode accNode = tagNode.get("acceleration");
        return accNode == null ||
                (accNode.get(0).asDouble() == 0 && accNode.get(1).asDouble() == 0 && accNode.get(2).asDouble() == 0);

    }
}
