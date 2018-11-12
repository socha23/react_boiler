package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static java.lang.Math.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MapCoords {
    private double longitude;
    private double latitude;

    /**
     * distance between two points on map, in kilometers
     */
    public double distanceTo(MapCoords other) {
        // haversine, from https://www.movable-type.co.uk/scripts/latlong.html

        double R = 6371;
        double theta1 = toRadians(latitude);
        double theta2 = toRadians(other.latitude);
        double dTheta = toRadians(other.latitude - latitude);
        double dLambda = toRadians(other.longitude - longitude);
        double a = sin(dTheta / 2) * sin(dLambda / 2)
                + cos(theta1) * cos(theta2)
                * sin(dLambda / 2) * sin(dLambda / 2);
        double c = 2 * atan2(sqrt(a), sqrt(1 - a));
        return R * c;
    }

    public static MapCoords of(double longitude, double latitude) {
        return new MapCoords(longitude, latitude);
    }
}