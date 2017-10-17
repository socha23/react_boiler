package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.model.Tag;
import pl.socha23.cyberfire.services.ITagsService;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class TagsController {

    @Autowired
    private ITagsService tagsService;

    @RequestMapping("/api/tags")
    public Map list() {
        return wrapInDataRestFormat(tagsService.getAllTags());
    }

    private Map wrapInDataRestFormat(List<Tag> tags) {
        return Collections.singletonMap("_embedded",
                Collections.singletonMap("tags",
                        tags
                )
        );
    }


}
