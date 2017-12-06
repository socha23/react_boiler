package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NearbyDevice {
    private String id;
    private int rssi;
}
