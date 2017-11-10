package pl.socha23.cyberfire.model;

import lombok.*;

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
}
