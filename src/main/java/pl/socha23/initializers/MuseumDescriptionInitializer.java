package pl.socha23.initializers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.MuseumDescription;
import pl.socha23.cyberfire.repositories.MuseumDescriptionRepository;

@Profile("dev")
@Component
public class MuseumDescriptionInitializer implements CommandLineRunner {

    @Autowired
    private MuseumDescriptionRepository repository;
    
    @Override
    public void run(String... args) throws Exception {

        if (noDescription()) {
            createEmptyDescription();
        }
    }

    private boolean noDescription() {
        return repository.count() == 0;
    }

    private void createEmptyDescription() {
        repository.save(new MuseumDescription());
    }
}
