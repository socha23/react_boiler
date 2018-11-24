package pl.socha23.initializers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.PocExercise;
import pl.socha23.cyberfire.model.PocStage;
import pl.socha23.cyberfire.services.IPocService;
import pl.socha23.generatory.LosoweImieINazwisko;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Component
@Profile("dev")
public class SamplePocExerciseCreator implements CommandLineRunner {

    private IPocService pocService;

    private final static Random random = new Random();

    @Value("${mockPocExercisesCount:20}")
    private int mockPocExercisesCount = 20;

    public SamplePocExerciseCreator(IPocService pocService) {
        this.pocService = pocService;
    }

    @Override
    public void run(String... args) throws Exception {
        if (noExercises()) {
            prepareSampleExercises();
        }
    }

    private boolean noExercises() {
        return pocService.getAllExercises().isEmpty();
    }

    private void prepareSampleExercises() {
        for (int i = 1; i <= mockPocExercisesCount; i++) {
            pocService.createOrUpdate(createMockExercise());

        }
    }

    private PocExercise createMockExercise() {
        PocExercise exercise = new PocExercise();

        exercise.setWhen(randomInstantInLastDays(90));

        if (random.nextDouble() < 0.5) {
            exercise.setSex(PocExercise.Sex.M);
            exercise.setUser(LosoweImieINazwisko.imieINazwiskoMeskie());
        } else {
            exercise.setSex(PocExercise.Sex.F);
            exercise.setUser(LosoweImieINazwisko.imieINazwiskoKobiece());
        }

        for (int i = 0; i < random.nextInt(10) + 3; i++) {
            exercise.getStages().add(createMockStage(i + 1));
        }

        return exercise;
    }

    private PocStage createMockStage(int num) {
        return PocStage.builder()
                .name("Etap #" + num)
                .briefing("Opis etapu " + num)
                .timeTaken(6d * random.nextDouble())
                .correctAnswer(random.nextBoolean())
                .build();
    }

    private Instant randomInstantInLastDays(int maxDays) {
        int secondsToSub = random.nextInt(maxDays * 24 * 60 * 60);
        return Instant.now().minus(secondsToSub, ChronoUnit.SECONDS);
    }

}
