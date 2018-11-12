package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.socha23.cyberfire.model.Locator;
import pl.socha23.cyberfire.services.ILocatorsService;

import java.util.Map;

@RestController
public class LocatorsController {

    public final static String RESOURCE_NAME = "locators";

    @Autowired
    private ILocatorsService locatorsService;

    @GetMapping(value = "/api/" + RESOURCE_NAME)
    public Map list() {
        return RestControllerUtils.wrapInDataRestFormat(RESOURCE_NAME,
                locatorsService.getAllLocators()
        );
    }

    @PostMapping(value = "/api/" + RESOURCE_NAME )
    public Locator post(@RequestBody Locator locator) {
        return locatorsService.updateOrCreate(locator);
    }

    @PutMapping("/api/" + RESOURCE_NAME + "/{id}")
   	public Locator update(@PathVariable("id") String id, @RequestBody Locator tag) {
   		return locatorsService.updateOrCreate(tag);
   	}

    @DeleteMapping("/api/" + RESOURCE_NAME + "/{id}")
   	public boolean delete(@PathVariable("id") String id) {
   		locatorsService.deleteById(id);
   		return true;
   	}

    @GetMapping("/api/" + RESOURCE_NAME + "/delete/{id}")
    public boolean deleteByGet(@PathVariable("id") String id) {
   		return delete(id);
   	}

}
