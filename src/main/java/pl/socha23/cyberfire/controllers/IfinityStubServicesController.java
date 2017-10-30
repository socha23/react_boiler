package pl.socha23.cyberfire.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.Tag;
import pl.socha23.cyberfire.services.IFloorPlansService;
import pl.socha23.cyberfire.services.ITagsService;

import java.util.Map;
import java.util.stream.Collectors;

import static pl.socha23.utils.CollectionUtils.list;
import static pl.socha23.utils.CollectionUtils.map;

@RestController
public class IfinityStubServicesController {

    @Qualifier("mock")
    @Autowired
    private ITagsService tagsService;

    @Qualifier("mock")
    @Autowired
    private IFloorPlansService floorPlansService;

    @RequestMapping("/api/ifinityStub/qpe/getTagPosition")
    public Map getTagLocations() {
        return map(
                "code", 0,
                "status", "Ok",
                "tags", tagsService
                        .getAllTags()
                        .stream()
                        .map(IfinityStubServicesController::tagToJSON)
                        .collect(Collectors.toList())
        );
    }

    private static Map tagToJSON(Tag tag) {
        return map(
                "id", tag.getId(),
                "name", tag.getName(),
                "color", tag.getColor(),
                "coordinateSystemId", tag.getCoordinateSystemId(),
                "coordinateSystemName", tag.getCoordinateSystemName(),
                "smoothedPosition", list(
                        tag.getPosition().getX(),
                        tag.getPosition().getY(),
                        tag.getPosition().getZ()
                )
        );
    }

    @RequestMapping("/api/ifinityStub/qpe/getProjectInfo")
    public Map getProjectInfo() {
        return map(
                "code", 0,
                "status", "Ok",
                "coordinateSystems", floorPlansService
                        .getAllFloorPlans()
                        .stream()
                        .map(IfinityStubServicesController::floorPlanToJSON)
                        .collect(Collectors.toList())
        );
    }

    private static Map floorPlanToJSON(FloorPlan floorPlan) {
        return map(
                "id", floorPlan.getId(),
                "name", floorPlan.getId(),
                "backgroundImages", list(
                        map(
                                "id", floorPlan.getId() + "_img",
                                "metersPerPixelX", 0.1,
                                "metersPerPixelY", 0.1,
                                "origoX", 0,
                                "origoY", 0,
                                "rotation", 0,
                                "base64", getBase64Bytes(floorPlan.getBase64content())
                        )
                )
        );
    }

    private static String getBase64Bytes(String base64content) {
        return base64content.substring(base64content.indexOf(",") + 1);
    }

}
