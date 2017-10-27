package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.services.ILocatorsService;
import pl.socha23.cyberfire.services.ITagsService;

import java.util.Map;

@RestController
public class LocatorsController {

    public final static String RESOURCE_NAME = "locators";

    @Autowired
    private ILocatorsService locatorsService;

    @RequestMapping("/api/" + RESOURCE_NAME)
    public Map list() {
        return RestControllerUtils.wrapInDataRestFormat(RESOURCE_NAME,
                locatorsService.getAllLocators()
        );
    }


}
