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
    private double latitude;
    private double longitude;
    private List<NearbyDevice> nearbyDevices = new ArrayList<>();

    public void setCoordinates(MapCoords coords) {
        this.setLongitude(coords.getLongitude());
        this.setLatitude(coords.getLatitude());
    }

    public MapCoords getCoordinates() {
        return MapCoords.of(latitude, longitude);
    }

}
