package pl.socha23.cyberfire.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class PocExerciseDto {

    private String playerName;
    public int sex;
    private String date = "";
    private String hour = "";
    private List<PocStageDto> progressStagesList = new ArrayList<>();
}
