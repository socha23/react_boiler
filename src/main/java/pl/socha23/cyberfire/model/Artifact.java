package pl.socha23.cyberfire.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class Artifact {

    private String id;
    private String name;
    private double weight;
    private LocalDateTime boughtOn;
    private List<String> tags = new ArrayList<>();




}
