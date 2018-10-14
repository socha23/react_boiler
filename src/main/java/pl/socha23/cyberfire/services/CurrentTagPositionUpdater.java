package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Tag;

import java.util.List;

@Component
public class CurrentTagPositionUpdater {

    @Value("${snapToPin:3}")
    private double snapToPin = 3;


    @Autowired
	private IInsideTagsProvider insideTagsProvider;

    @Autowired
	private TagsService tagsService;

    @Scheduled(fixedRate = 100)
	public void updateTags() {
        List<Tag> tags = insideTagsProvider.getTagsToUpdate();
        for (Tag t : tags) {
            updateTag(t);
        }
    }

    private void updateTag(Tag t) {
        Tag prevTag = tagsService.findTagById(t.getId());
        if (prevTag != null && prevTag.getPinned() != null) {
            t.setPinned(prevTag.getPinned());
            if (t.getPosition().distanceTo(t.getPinned()) <= snapToPin) {
                t.setPosition(t.getPinned());
            }
        }
        tagsService.updateOrCreate(t);

    }

}
