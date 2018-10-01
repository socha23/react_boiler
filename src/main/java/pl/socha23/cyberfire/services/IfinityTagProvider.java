package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Tag;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class IfinityTagProvider implements IInsideTagsProvider {

    @Autowired
    private IfinityTagInfoWS tagInfoWS;

    @Autowired
    private IfinityTagPositionWS tagPositionWS;

    @Override
    public List<Tag> getTagsToUpdate() {
        Set<String> tagsNotToUpdate = tagInfoWS.getWhichTagsNotToUpdate();
        return tagPositionWS.getTags().stream()
                .filter(t -> !tagsNotToUpdate.contains(t.getId()))
                .collect(Collectors.toList());
    }
}
