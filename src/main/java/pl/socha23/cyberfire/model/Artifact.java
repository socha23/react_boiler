package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artifact {

    public enum Priority {P3_HIGH, P2_MEDIUM, P1_LOW};
    public enum Type {PAINTING, SCULPTURE, POTTERY, DOCUMENT, OTHER}

    private String id;

    @NotEmpty(message = "Proszę wprowadzić nazwę")
    private String name = "";

    private Priority priority;
    private Type type;
    private Dimensions dimensions;
    private Double weight;
    private String identificationNotes = "";
    private String evacuationNotes = "";

    private List<ImageRef> images = new ArrayList<>();

    private String tagId;

    // przypisana skrzynia
    private String crateId;

    // lokator w którym znajduje się obiekt - może to być skrzynia (przypisana bądź nie), może to być kontener
    private String currentLocatorId;
}
