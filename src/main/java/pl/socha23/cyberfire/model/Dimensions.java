package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dimensions in centimeters
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dimensions {

    private Integer height;
    private Integer width;
    private Integer depth;

    static public Dimensions cube(int edgeLength) {
        return new Dimensions(edgeLength, edgeLength, edgeLength);
    }
}
