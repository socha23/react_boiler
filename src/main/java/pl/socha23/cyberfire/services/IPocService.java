package pl.socha23.cyberfire.services;

import pl.socha23.cyberfire.model.PocExercise;

import java.util.Collection;

public interface IPocService {

    PocExercise createOrUpdate(PocExercise exercise);

    Collection<? extends PocExercise> getAllExercises();
}
