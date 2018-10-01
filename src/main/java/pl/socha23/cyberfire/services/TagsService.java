package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Tag;
import pl.socha23.cyberfire.repositories.TagRepository;

import java.util.List;

@Component
public class TagsService {

	@Autowired
	private TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

	public Tag updateOrCreate(Tag tag) {
        return tagRepository.save(tag);
    }

    public Tag findTagById(String id) {
        return tagRepository.findOne(id);
    }
}
