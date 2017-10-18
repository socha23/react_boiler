package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.services.ITagsService;

import java.util.Map;

@RestController
public class TagsController {

    public final static String RESOURCE_NAME = "tags";

    @Autowired
    private ITagsService tagsService;

    @RequestMapping("/api/" + RESOURCE_NAME)
    public Map list() {
        return RestControllerUtils.wrapInDataRestFormat(RESOURCE_NAME,
                tagsService.getAllTags()
        );
    }


}
