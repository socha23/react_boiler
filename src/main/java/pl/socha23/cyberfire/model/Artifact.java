package pl.socha23.cyberfire.model;

import lombok.*;
import org.hibernate.validator.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artifact {

    public enum Priority {P3_HIGH, P2_MEDIUM, P1_LOW};
    public enum Type {PAINTING, SCULPTURE, POTTERY, DOCUMENT, OTHER}

    private String id;

    @NotEmpty(message = "Please enter name")
    private String name = "";

    private Priority priority;
    private Type type;
    private Dimensions dimensions;
    private Double weight;
    private String identificationNotes = "";
    private String evacuationNotes = "";
}
