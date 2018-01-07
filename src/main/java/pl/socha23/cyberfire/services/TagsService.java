package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Tag;

import java.util.ArrayList;
import java.util.List;

@Component
public class TagsService {

    @Autowired
    private IInsideTagsProvider tagsProvider;

	@Autowired
	private MissingTagsService missingTagsService;

    public List<Tag> getAllTags() {
        List<Tag> result = new ArrayList<>();
        List<Tag> realTags = tagsProvider.getAllTagsInside();
        result.addAll(realTags);
        result.addAll(missingTagsService.createVirtualTags(realTags));
        return result;
    }

	public Tag updateOrCreate(Tag tag) {
        if (tagsProvider instanceof MockInsideTagsProvider) {
            return ((MockInsideTagsProvider)tagsProvider).updateOrCreate(tag);
        } else
            throw new RuntimeException("updateOrCreate can be called only when used TagsService is used with MockTagsProvider");
	}
}