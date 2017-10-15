package pl.socha23.cyberfire.controllers;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ImageController {

    int autoInc = 0;

    @RequestMapping("/api/images")
    public Map handleFileUpload(@RequestParam("file") MultipartFile file) {

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> item = new HashMap<>();

        file.getBytes()

        item.put("name", file.getOriginalFilename());
        item.put("id", "xxxxx" + ++autoInc); // TODO

        result.put("success", true);
        result.put("item", item);

        return result;
    }
}
