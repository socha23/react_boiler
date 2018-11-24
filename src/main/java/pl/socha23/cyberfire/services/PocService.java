package pl.socha23.cyberfire.services;

import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.PocExercise;
import pl.socha23.cyberfire.repositories.PocExerciseRepository;

import java.util.Collection;

@Component
public class PocService implements IPocService {

    private PocExerciseRepository repository;

    public PocService(PocExerciseRepository repository) {
        this.repository = repository;
    }

    @Override
    public PocExercise createOrUpdate(PocExercise exercise) {
        return repository.save(exercise);
    }

    @Override
    public Collection<? extends PocExercise> getAllExercises() {
        return repository.findAll();
    }
}
