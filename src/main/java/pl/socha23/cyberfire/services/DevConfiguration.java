package pl.socha23.cyberfire.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("prod")
public class DevConfiguration {

    @Bean
    @Primary
    public IInsideTagsProvider tagsProvider() {
        return new IfinityInsideTagsProvider();
    }



}
