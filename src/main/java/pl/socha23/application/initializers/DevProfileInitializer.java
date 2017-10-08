package pl.socha23.application.initializers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Artifact;
import pl.socha23.cyberfire.model.Dimensions;
import pl.socha23.cyberfire.repositories.ArtifactRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.function.Function;

@Profile("dev")
@Component
public class DevProfileInitializer implements CommandLineRunner {

    // @Value(value = "classpath:configs/dev/defaultConfig.yml")
    // private Resource defaultConfigSource;

    @Autowired
    private ArtifactRepository artifactRepository;

    @Override
    public void run(String... args) throws Exception {

        if (noArtifacts()) {
            createSampleArtifacts();
        }
    }

    private boolean noArtifacts() {
        return artifactRepository.count() == 0;
    }

    private void createSampleArtifacts() {
        saveArtifact(a -> a
                .name("Bitwa pod Grunwaldem")
                .priority(Artifact.Priority.P3_HIGH)
                .type(Artifact.Type.PAINTING)
                .dimensions(new Dimensions(426, 987, 1))
                .weight(30.0)
                .evacuationNotes("Wyciąć z ram i zwinąć")
                .identificationNotes("Dwie wyraźne postaci na pierwszym planie, jedna ubrana na biało, druga na czerwono")
        );

        saveArtifact(a -> a
                .name("Wenus z Milo")
                .priority(Artifact.Priority.P3_HIGH)
                .type(Artifact.Type.SCULPTURE)
                .dimensions(new Dimensions(202, 50, 50))
                .weight(100.0)
                .evacuationNotes("Uwaga żeby głowy nie urwać")
                .identificationNotes("Nie ma rąk")
        );

    }

    private void saveArtifact(Function<Artifact.ArtifactBuilder, Artifact.ArtifactBuilder> build) {
        Artifact a = build.apply(Artifact.builder()).build();
        artifactRepository.save(a);
    }
}
