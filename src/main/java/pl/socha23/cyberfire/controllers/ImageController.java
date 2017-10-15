package pl.socha23.cyberfire.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.socha23.cyberfire.model.Image;
import pl.socha23.cyberfire.repositories.ImageRepository;
import pl.socha23.cyberfire.services.ImageService;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@RestController
public class ImageController {

    @Autowired
    private ImageRepository repository;

    @Autowired
    private ImageService imageService;

    @RequestMapping("/api/images")
    public Map handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {

        Image img = imageService.createImage(file.getOriginalFilename(), file.getBytes());
        img = repository.save(img);

        Map<String, Object> result = new HashMap<>();
        Map<String, Object> item = new HashMap<>();

        item.put("name", img.getFilename());
        item.put("id", img.getId());

        result.put("success", true);
        result.put("item", item);

        return result;
    }

    @RequestMapping("/api/images/{id}/thumbnail")
    public ResponseEntity<byte[]> thumbnail(@PathVariable("id") String id, HttpServletResponse response) {
        return getImageBytes(id, Image::getThumbnail);
    }

    @RequestMapping("/api/images/{id}")
    public ResponseEntity<byte[]> fullSized(@PathVariable("id") String id, HttpServletResponse response) {
        return getImageBytes(id, Image::getFullSized);
    }

    private ResponseEntity<byte[]> getImageBytes(String id, Function<Image, byte[]> func) {
        Image image = repository.findOne(id);
        if (image == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        } else {
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.parseMediaType("image/" + image.getFormat()))
                    .body(func.apply(image));
        }

    }

}
