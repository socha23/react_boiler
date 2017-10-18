package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
