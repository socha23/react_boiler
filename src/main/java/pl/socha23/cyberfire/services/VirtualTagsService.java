package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Artifact;
import pl.socha23.cyberfire.model.Fireteam;
import pl.socha23.cyberfire.model.Tag;
import pl.socha23.cyberfire.repositories.ArtifactRepository;
import pl.socha23.cyberfire.repositories.FireteamRepository;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Something that creates virtual tags for missing tagIds
 */
@Component
public class VirtualTagsService {

	private ArtifactRepository artifactRepository;
	private FireteamRepository fireteamRepository;

	public VirtualTagsService(@Autowired ArtifactRepository artifactRepository, @Autowired FireteamRepository fireteamRepository) {
		this.artifactRepository = artifactRepository;
		this.fireteamRepository = fireteamRepository;
	}

	public Collection<Tag> createVirtualTags(Collection<Tag> realTags) {
		return getUnknownTagIds(realTags)
				.map(VirtualTagsService::createVirtualTag)
				.collect(Collectors.toList());
	}

	private Stream<String> getUnknownTagIds(Collection<Tag> realTags) {
		Set<String> ids = new HashSet<>();

		ids.addAll(getArtifactTagIds());
		ids.addAll(getFireteamTagIds());
		ids.addAll(getFireteamTargetTagIds());

		ids.removeAll(getTagIds(realTags));

		return ids.stream();
	}

	private Collection<String> getArtifactTagIds() {
		return getIds(getArtifacts(), Artifact::getTagId);
	}

	private Collection<String> getFireteamTagIds() {
		return getIds(getFireteams(), Fireteam::getTagId);
	}

	private Collection<String> getFireteamTargetTagIds() {
		return getIds(getFireteams(), Fireteam::getTargetTagId);
	}

	private Collection<String> getTagIds(Collection<Tag> tags) {
		return getIds(tags, Tag::getId);
	}

	private <T> Collection<String> getIds(Collection<T> items, Function<T, String> getId) {
		return items.stream()
				.map(getId)
				.filter(a -> a != null)
				.collect(Collectors.toSet());
	}

	private Collection<Artifact> getArtifacts() {
		return artifactRepository.findAll();
	}

	private Collection<Fireteam> getFireteams() {
		return fireteamRepository.findAll();
	}

	private static Tag createVirtualTag(String id) {
		return Tag.builder()
				.id(id)
				.name("Nie znaleziono znacznika")
				.virtual(true)
				.inside(false)
				.build();
	}


}
