package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Position;
import pl.socha23.cyberfire.model.Tag;

import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class IfinityTagProvider implements IInsideTagsProvider {

    @Value("${tagPositionNoiseAmount:0}")
    private double tagPositionNoiseAmount = 0;

    @Autowired
    private IfinityTagPositionWS tagPositionWS;

    @Override
    public List<Tag> getTagsToUpdate() {
        List<Tag> tags = tagPositionWS.getTags();
        addNoiseToPositions(tags);
        return tags;
    }

    private void addNoiseToPositions(List<Tag> tags) {
        for (Tag tag : tags) {
            addNoiseToPosition(tag.getPosition());
        }
    }

    private void addNoiseToPosition(Position pos) {
        Random r = new Random();
        pos.setX(pos.getX() + r.nextGaussian() * tagPositionNoiseAmount);
        pos.setY(pos.getY() + r.nextGaussian() * tagPositionNoiseAmount);
        pos.setZ(pos.getZ() + r.nextGaussian() * tagPositionNoiseAmount);
    }
}
