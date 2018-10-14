package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Position {
    private double x;
    private double y;
    private double z;

    public double distanceTo(Position other) {
        double dX = x - other.x;
        double dY = y - other.y;
        double dZ = z - other.z;
        return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
    }
}