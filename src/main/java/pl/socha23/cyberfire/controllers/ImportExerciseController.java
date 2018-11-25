package pl.socha23.cyberfire.controllers;

import lombok.Data;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.model.PocExercise;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class ImportExerciseController {

    @PostMapping(value = "/api/importExercise")
    public ImportResult post(@RequestBody String json) {
        return ImportResult.fail("Your JSON sucks: " + json);
    }

    @Data
    static class ImportResult {
        private boolean success = false;
        private List<String> errors = new ArrayList<>();
        private PocExercise item;

        static ImportResult fail(String ... errors) {
           ImportResult res = new ImportResult();
           res.errors.addAll(Arrays.asList(errors));
           return res;
        }
    }
}
