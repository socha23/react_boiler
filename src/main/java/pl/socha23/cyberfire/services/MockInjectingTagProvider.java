package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Tag;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Primary
@Component
public class MockInjectingTagProvider implements IInsideUpdatingTagsProvider {

    private MockInsideTagsProvider mockProvider;
    private IfinityInsideTagsProvider ifinityProvider;

    public MockInjectingTagProvider(@Autowired MockInsideTagsProvider mockProvider, @Autowired IfinityInsideTagsProvider ifinityProvider) {
        this.mockProvider = mockProvider;
        this.ifinityProvider = ifinityProvider;
    }

    @Override
	public Tag updateOrCreate(Tag tag) {
		return mockProvider.updateOrCreate(tag);
	}

	@Override
	public List<Tag> getAllTagsInside() {
        Set<String> seenIds = new HashSet<>();
        List<Tag> result = new ArrayList<>();

        for (Tag t : ifinityProvider.getAllTagsInside()) {
            result.add(t);
            seenIds.add(t.getId());
        }

        for (Tag t : mockProvider.getAllTagsInside()) {
            if (!seenIds.contains(t.getId())) {
                result.add(t);
            }
        }

        return result;
	}
}
