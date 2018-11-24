package pl.socha23.cyberfire.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PocStage {

    String name = "";
    String briefing = "";
    double timeTaken = 0;
    boolean correctAnswer = false;

}
