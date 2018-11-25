package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PocStageDto {

    String stageName = "";
    String stageBriefing = "";
    double decisionTime = 0;
    boolean correctDecision = false;

}
