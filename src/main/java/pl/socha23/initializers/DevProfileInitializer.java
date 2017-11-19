package pl.socha23.initializers;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.*;
import pl.socha23.cyberfire.repositories.ArtifactRepository;
import pl.socha23.cyberfire.repositories.FireteamRepository;
import pl.socha23.cyberfire.repositories.ImageRepository;
import pl.socha23.cyberfire.services.ITagsService;
import pl.socha23.cyberfire.services.ImageService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Function;

@Profile("dev")
@Component
public class DevProfileInitializer implements CommandLineRunner {

    @Autowired
    private ArtifactRepository artifactRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private FireteamRepository fireteamRepository;

    @Autowired
    private ITagsService tagsService;

    @Override
    public void run(String... args) throws Exception {

        if (noArtifacts()) {
            createSampleArtifacts();
        }

        if (noFireteams()) {
            createSampleFireteams(2);
        }
    }

    private boolean noArtifacts() {
        return artifactRepository.count() == 0;
    }
    private boolean noFireteams() {
        return fireteamRepository.count() == 0;
    }

    private void createSampleArtifacts() {
        saveArtifact(a -> a
                .name("Bitwa pod Grunwaldem")
                .priority(Artifact.Priority.P2_MEDIUM)
                .type(Artifact.Type.PAINTING)
                .dimensions(new Dimensions(426, 987, 1))
                .weight(30.0)
                .evacuationNotes("Wyciąć z ram i zwinąć")
                .identificationNotes("Dwie wyraźne postaci na pierwszym planie, jedna ubrana na biało, druga na czerwono")
                .images(createImages("grunwald1.jpg"))
        );

        saveArtifact(a -> a
                .name("Wenus z Milo")
                .priority(Artifact.Priority.P3_HIGH)
                .type(Artifact.Type.SCULPTURE)
                .dimensions(new Dimensions(202, 50, 50))
                .weight(100.0)
                .evacuationNotes("Uwaga żeby głowy nie urwać")
                .identificationNotes("Nie ma rąk")
                .images(createImages("wenus1.jpg", "wenus2.jpg", "wenus3.jpg"))
        );

        saveArtifact(a -> a
                        .name("Mona Lisa")
                        .priority(Artifact.Priority.P3_HIGH)
                        .type(Artifact.Type.PAINTING)
                        .dimensions(new Dimensions(77, 53, 1))
                        .weight(10.0)
                        .evacuationNotes("")
                        .identificationNotes("Głupi uśmiech")
                        .images(createImages("monalisa1.jpg"))
        );

        saveArtifact(a -> a
                        .name("Ostatnia Wieczerza")
                        .priority(Artifact.Priority.P2_MEDIUM)
                        .type(Artifact.Type.PAINTING)
                        .dimensions(new Dimensions(460, 880, 1))
                        .weight(20.0)
                        .evacuationNotes("uwaga na przetarcia")
                        .identificationNotes("Stół i za nim biesiadnicy")
                        .images(createImages("lastsupper1.jpg"))
        );

        saveArtifact(a -> a
                        .name("Judyta i Holofernes")
                        .priority(Artifact.Priority.P1_LOW)
                        .type(Artifact.Type.PAINTING)
                        .dimensions(new Dimensions(120, 200, 1))
                        .weight(5.0)
                        .evacuationNotes("")
                        .identificationNotes("")
                        .images(createImages("judith1.jpg"))
        );

        saveArtifact(a -> a
                        .name("Waza z dynastii Ming")
                        .priority(Artifact.Priority.P1_LOW)
                        .type(Artifact.Type.POTTERY)
                        .dimensions(new Dimensions(50, 100, 50))
                        .weight(10.0)
                        .evacuationNotes("Uwaga kruche!")
                        .identificationNotes("")
                        .images(createImages("ming1.jpg"))
        );

        saveArtifact(a -> a
                        .name("Szczerbiec")
                        .priority(Artifact.Priority.P2_MEDIUM)
                        .type(Artifact.Type.OTHER)
                        .dimensions(new Dimensions(40, 130, 5))
                        .weight(20.0)
                        .evacuationNotes("Nie łapać za ostrze")
                        .identificationNotes("Miecz")
                        .images(createImages("szczerbiec1.jpg"))
        );
    }

    private List<ImageRef> createImages(String ... filenames) {
        List<ImageRef> result = new ArrayList<ImageRef>();
        for (String filename : filenames) {
            Image image = createAndSaveImage(filename);
            result.add(image.createRef());

        }
        return result;
    }

    private Image createAndSaveImage(String filename) {
        try {
            ClassPathResource res = new ClassPathResource("examples/artifacts/" + filename);
            Image i = imageService.createImage(filename, IOUtils.toByteArray(res.getInputStream()));
            return imageRepository.save(i);

        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }

    }

    private void saveArtifact(Function<Artifact.ArtifactBuilder, Artifact.ArtifactBuilder> build) {
        Artifact a = build.apply(Artifact.builder()).build();
        artifactRepository.save(a);
    }

    private void createSampleFireteams(int howMany) {
        List<Tag> tags = new ArrayList<>(tagsService.getAllTags());
        Random r = new Random();
        for (int i = 1; i <= howMany; i++) {
            Tag tag = tags.remove(r.nextInt(tags.size()));

            Fireteam team = new Fireteam("f" + i, "Rota " + i, tag.getId(), null);
            fireteamRepository.save(team);
        }
    }

}
