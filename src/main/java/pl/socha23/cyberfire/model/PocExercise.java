package pl.socha23.cyberfire.model;

import lombok.Data;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
public class PocExercise {

    private String id;

    private Instant when = Instant.now();

    public enum Sex {M, F}

    private String user = "";
    private Sex sex = Sex.M;
    private List<PocStage> stages = new ArrayList<>();

    private long totalTime = 0;
    public enum App {MUZEALNIK, KDR, ROTA}
    private App app;
    private String region = "";

}
