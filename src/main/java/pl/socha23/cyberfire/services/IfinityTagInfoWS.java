package pl.socha23.cyberfire.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.NullNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class IfinityTagInfoWS extends AbstractIfinityIntegrationService<JsonNode> {

    @Value("${ifinityTagAccelerationTreshold}")
    private double accelerationTreshold;

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
        Optional<String> accelValue = getAccelerationAsString(tagNode);
        if (accelValue.isPresent()) {
            return accelerationBiggerThanTreshold(accelValue.get(), accelerationTreshold);
        } else {
            return false;
        }
    }

    static boolean accelerationBiggerThanTreshold(String value, double treshold) {
        if (value == null) {
            return true;
        }
        for (String s : value.split(",")) {
            if (stringBiggerThanOrNotComparableTo(s, treshold)) {
                return true;
            }
        }
        return false;
    }

    private static boolean stringBiggerThanOrNotComparableTo(String s, double treshold) {
        try {
            return Double.parseDouble(s) > treshold;
        } catch (NumberFormatException nfe) {
            return true;
        }
    }

    private Optional<String> getAccelerationAsString(JsonNode tagNode) {
        JsonNode accelNode = tagNode.get("acceleration");
        if (accelNode == null || accelNode instanceof NullNode) {
            return Optional.empty();
        } else {
            return Optional.ofNullable(accelNode.textValue());
        }

    }
}
