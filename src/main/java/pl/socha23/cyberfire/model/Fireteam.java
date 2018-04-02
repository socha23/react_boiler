package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fireteam {

    private String id;

    @NotEmpty(message = "Proszę wprowadzić nazwę roty")
    private String name = "";

    @NotEmpty(message = "Proszę wybrać znacznik identyfikujący rotę")
    private String tagId;

    private String targetTagId;

    private LocalDateTime lastActive;
}
