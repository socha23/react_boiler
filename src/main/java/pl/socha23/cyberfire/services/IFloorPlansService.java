package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.FloorPlan;
import pl.socha23.cyberfire.model.FloorPlanArea;

import java.util.List;

public interface IFloorPlansService {

    List<FloorPlan> getAllFloorPlans();

    default FloorPlan getFloorPlanByAreaId(String id) {
        for (FloorPlan p : getAllFloorPlans()) {
            for (FloorPlanArea a : p.getAreas()) {
                if (a.getId().equals(id)) {
                    return p;
                }
            }
        }
        return null;
    }
}
