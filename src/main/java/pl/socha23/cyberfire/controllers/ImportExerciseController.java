package pl.socha23.cyberfire.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.cyberfire.model.PocExercise;
import pl.socha23.cyberfire.model.PocExerciseDto;
import pl.socha23.cyberfire.model.PocStage;
import pl.socha23.cyberfire.model.PocStageDto;
import pl.socha23.cyberfire.services.IPocService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class ImportExerciseController {

    private IPocService service;
    private ObjectMapper mapper;

    public ImportExerciseController(IPocService service, ObjectMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping(value = "/api/importExercise")
    public ImportResult post(@RequestBody String json) {
        try {
            PocExerciseDto dto = parse(json);
            PocExercise exercise = convert(dto);
            exercise = service.createOrUpdate(exercise);
            return ImportResult.success(exercise);
        } catch (ImportException ie) {
            return ImportResult.fail(ie);
        }
    }

    private PocExercise convert(PocExerciseDto dto) throws ImportException {
        PocExercise result = new PocExercise();
        List<String> errors = new ArrayList<>();
        result.setUser(dto.getPlayerName());
        convertSex(dto, result, errors);
        convertWhen(dto, result, errors);
        for (PocStageDto stageDto : dto.getProgressStagesList()) {
            result.getStages().add(convertStage(stageDto));
        }
        result.setTotalTime(dto.getTotalTime());
        result.setRegion(dto.getRegion());
        try {
            result.setApp(PocExercise.App.valueOf(dto.getApp()));
        } catch (IllegalArgumentException iae) {
            errors.add("Nieprawidłowa wartość 'app': " + dto.getApp());
        }

        if (errors.isEmpty()) {
            return result;
        } else {
            throw new ImportException(errors);
        }

    }

    private void convertSex(PocExerciseDto dto, PocExercise result, List<String> errors) {
        switch (dto.getSex()) {
            case 0:
                result.setSex(PocExercise.Sex.M);
                break;
            case 1:
                result.setSex(PocExercise.Sex.M);
                break;
            default:
                errors.add("Wartość pola 'sex' powinna być równa 0 albo 1");
        }
    }

    private void convertWhen(PocExerciseDto dto, PocExercise result, List<String> errors) {
        LocalTime time = null;
        try {
            time = LocalTime.parse(dto.getHour());
        } catch (DateTimeParseException dtpe) {
            errors.add("Nieprawidłowa wartość pola 'hour': " + dto.getHour());
        }

        LocalDate date = null;
        try {
            date = LocalDate.parse(dto.getDate(), DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        } catch (DateTimeParseException dtpe) {
            errors.add("Nieprawidłowa wartość pola 'date': " + dto.getDate());
        }
        if (date != null && time != null) {
            ZonedDateTime when = ZonedDateTime.now().with(date).with(time);
            result.setWhen(when.toInstant());
        }
    }

    private PocStage convertStage(PocStageDto stageDto) {
        return PocStage.builder()
                .briefing(stageDto.getStageBriefing())
                .name(stageDto.getStageName())
                .timeTaken(stageDto.getDecisionTime())
                .correctAnswer(stageDto.isCorrectDecision())
                .build();

    }


    private PocExerciseDto parse(String json) throws ImportException {
        try {
            return mapper.readValue(json, PocExerciseDto.class);
        } catch (IOException e) {
            throw new ImportException(e.getMessage());
        }
    }

    @Data
    static class ImportResult {
        private boolean success = false;
        private List<String> errors = new ArrayList<>();
        private PocExercise item;

        static ImportResult fail(ImportException ie) {
           ImportResult res = new ImportResult();
           res.errors.addAll(ie.errors);
           return res;
        }

        static ImportResult success(PocExercise item) {
           ImportResult res = new ImportResult();
           res.item = item;
           res.success = true;
           return res;
        }
    }

    static class ImportException extends Exception {
        private List<String> errors;

        ImportException(List<String> errors) {
            this.errors = errors;
        }

        ImportException(String message) {
            this.errors = Collections.singletonList(message);
        }
    }

}
