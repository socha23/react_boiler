package pl.socha23.application.initializers;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("dev")
@Component
public class DevProfileInitializer implements CommandLineRunner {

    // @Value(value = "classpath:configs/dev/defaultConfig.yml")
    // private Resource defaultConfigSource;

    @Override
    public void run(String... args) throws Exception {
        // tutaj można zainicjalizować profil
    }
}
