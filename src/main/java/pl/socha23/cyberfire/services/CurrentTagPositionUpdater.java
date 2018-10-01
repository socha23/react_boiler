package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Tag;

import java.util.List;

@Component
public class CurrentTagPositionUpdater {

	@Autowired
	private IInsideTagsProvider insideTagsProvider;

    @Autowired
	private TagsService tagsService;

    @Scheduled(fixedRate = 100)
	public void updateTags() {
        List<Tag> tags = insideTagsProvider.getTagsToUpdate();
        for (Tag t : tags) {
            if (tagsService.findTagById(t.getId()) == null) {
                tagsService.updateOrCreate(t);
            }
        }
    }
}
