package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapCoords {
    private double longitude;
    private double latitude;

    public double distanceTo(MapCoords other) {
        return 0; // TODO haversine
    }

    public static MapCoords of(double longitude, double latitude) {
        return new MapCoords(longitude, latitude);
    }
}