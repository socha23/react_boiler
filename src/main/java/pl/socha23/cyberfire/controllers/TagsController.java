package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.socha23.cyberfire.model.Tag;
import pl.socha23.cyberfire.services.ITagsProvider;

import java.util.Map;

@RestController
public class TagsController {

	public final static String RESOURCE_NAME = "tags";

	@Autowired private ITagsProvider tagsService;


	@GetMapping("/api/" + RESOURCE_NAME)
	public Map list() {
		return RestControllerUtils.wrapInDataRestFormat(RESOURCE_NAME, tagsService.getAllTags());
	}


	@PutMapping("/api/" + RESOURCE_NAME + "/{id}")
	public Tag update(@PathVariable("id") String id, @RequestBody Tag tag) {
		return tagsService.updateOrCreate(tag);
	}

}
