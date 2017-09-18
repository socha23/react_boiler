package pl.socha23.application;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
public class RestConfiguration extends RepositoryRestConfigurerAdapter {

    // żeby mieć IDki w obiektach
    @Override
     public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
         //config.exposeIdsFor(Project.class, ProjectConfig.class, Responder.class, MobileConnection.class, Activity.class);
     }


    // żeby JSR-303 działało
    @Bean
    @Primary
    Validator validator() {
        return new LocalValidatorFactoryBean();
    }

    // żeby mieć ładną walidację z porządnym obiektem prezentującym błędy
    @Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
        Validator validator = validator();
        validatingListener.addValidator("beforeCreate", validator);
        validatingListener.addValidator("beforeSave", validator);
    }

}
