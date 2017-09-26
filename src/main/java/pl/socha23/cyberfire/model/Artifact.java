package pl.socha23.cyberfire.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Artifact {

    @Id
    private String id;
    private String name;

    private double weight;




}
