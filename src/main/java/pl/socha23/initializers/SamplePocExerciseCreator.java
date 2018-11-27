package pl.socha23.initializers;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.PocExercise;
import pl.socha23.cyberfire.model.PocStage;
import pl.socha23.cyberfire.services.IPocService;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Component
public class SamplePocExerciseCreator implements CommandLineRunner {

    final static String[] REGIONS = {"DOLNOŚLĄSKIE", "KUJAWSKO-POMORSKIE", "LUBELSKIE", "LUBUSKIE", "ŁÓDZKIE",
                    "MAŁOPOLSKIE", "MAZOWIECKIE", "OPOLSKIE", "PODKARPACKIE", "PODLASKIE", "POMORSKIE",
                    "ŚLĄSKIE", "ŚWIĘTOKRZYSKIE", "WARMINSKO-MAZURSKIE", "WIELKOPOLSKIE", "ZACHODNIOPOMORSKIE"};

    private IPocService pocService;

    private final static Random random = new Random();

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
        prepareMockExercise("Robert Gefiobu", PocExercise.Sex.M);
        prepareMockExercise("Marta Posokół", PocExercise.Sex.F);
        prepareMockExercise("Marek Bawe", PocExercise.Sex.M);
        prepareMockExercise("Dariusz Roprzapszelcki", PocExercise.Sex.M);
        prepareMockExercise("Marzena Codzicz", PocExercise.Sex.F);
        prepareMockExercise("Mariusz Coprzakół", PocExercise.Sex.M);
        prepareMockExercise("Jerzy Brodzicz", PocExercise.Sex.M);
        prepareMockExercise("Zofia Mitwinadzicz", PocExercise.Sex.F);
        prepareMockExercise("Waldemar Ckieczykelski", PocExercise.Sex.M);
        prepareMockExercise("Ewa Brocka", PocExercise.Sex.F);
        prepareMockExercise("Marta Ćwikefelcka", PocExercise.Sex.F);
        prepareMockExercise("Adam Niujoce", PocExercise.Sex.M);
        prepareMockExercise("Marek Liński", PocExercise.Sex.M);
        prepareMockExercise("Zofia Wecka", PocExercise.Sex.F);
        prepareMockExercise("Dawid Ciezekszęwak", PocExercise.Sex.M);
        prepareMockExercise("Ewelina Keglilcka", PocExercise.Sex.F);
        prepareMockExercise("Jakub Galski", PocExercise.Sex.M);
        prepareMockExercise("Zbigniew Siusulski", PocExercise.Sex.M);
        prepareMockExercise("Maciej Kęćwiński", PocExercise.Sex.M);
        prepareMockExercise("Krzysztof Runaciwicz", PocExercise.Sex.M);
    }

    private void prepareMockExercise(String name, PocExercise.Sex sex) {
        pocService.createOrUpdate(createMockExercise(name, sex));
    }

    private PocExercise createMockExercise(String name, PocExercise.Sex sex) {
        PocExercise exercise = new PocExercise();

        exercise.setWhen(randomInstantInLastDays(90));

        exercise.setSex(sex);
        exercise.setUser(name);

        exercise.setTotalTime(random.nextInt(140) + 10);
        exercise.setRegion(REGIONS[random.nextInt(REGIONS.length)]);
        exercise.setApp(PocExercise.App.values()[random.nextInt(PocExercise.App.values().length)]);

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
