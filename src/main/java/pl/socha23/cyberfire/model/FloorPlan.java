package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FloorPlan {
    private String id;
    private String name;
    private Position topLeft;
    private Position bottomRight;
    private String base64content;
    private List<FloorPlanArea> areas = new ArrayList<>();
}
