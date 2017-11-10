package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.model.Locator;
import pl.socha23.cyberfire.services.ILocatorsService;

import java.util.Map;

@RestController
public class LocatorsController {

    public final static String RESOURCE_NAME = "locators";

    @Autowired
    private ILocatorsService locatorsService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/" + RESOURCE_NAME)
    public Map list() {
        return RestControllerUtils.wrapInDataRestFormat(RESOURCE_NAME,
                locatorsService.getAllLocators()
        );
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/" + RESOURCE_NAME )
    public boolean post(@RequestBody Locator locator) {
        locatorsService.update(locator);
        return true;
    }

}
