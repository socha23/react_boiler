package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.services.IFloorPlansService;

import java.util.Map;

@RestController
public class FloorPlansController {

    private final static String RESOURCE_NAME = "floorPlans";

    @Autowired
    private IFloorPlansService floorPlansService;

    @RequestMapping("/api/" + RESOURCE_NAME)
    public Map list() {
        return RestControllerUtils.wrapInDataRestFormat(RESOURCE_NAME,
                floorPlansService.getAllFloorPlans()
        );
    }

}
