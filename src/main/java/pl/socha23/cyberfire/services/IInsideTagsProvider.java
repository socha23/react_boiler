package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.Tag;

import java.util.List;

public interface IInsideTagsProvider {

    List<Tag> getTagsToUpdate();
}
