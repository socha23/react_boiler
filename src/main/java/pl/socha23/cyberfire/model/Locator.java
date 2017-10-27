package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Locator {

    public enum Type {CRATE, CONTAINER}


    private String id;
    private Type type;
    private String name;
    private double latitude;
    private double longitude;
}
