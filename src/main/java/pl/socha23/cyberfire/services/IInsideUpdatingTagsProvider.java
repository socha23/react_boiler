package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.Tag;

public interface IInsideUpdatingTagsProvider extends IInsideTagsProvider {

    Tag updateOrCreate(Tag tag);
}
