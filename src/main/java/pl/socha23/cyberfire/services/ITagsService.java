package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.Tag;

import java.util.List;

public interface ITagsService {

    List<Tag> getAllTags();

	Tag updateOrCreate(Tag tag);
}
