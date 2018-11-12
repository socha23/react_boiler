package pl.socha23.cyberfire.model;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Locator {

    public enum Type {CRATE, CONTAINER}
    
    private String id;
    private Type type;
    private String name;
    
    private MapCoords location;
    private MapCoords pinned;

    private List<NearbyDevice> nearbyDevices = new ArrayList<>();
}
