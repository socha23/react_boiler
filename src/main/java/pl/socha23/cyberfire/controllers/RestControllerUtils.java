package pl.socha23.cyberfire.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Map;

public class RestControllerUtils {

    public static  <T> Map wrapInDataRestFormat(String resource, List<T> tags) {
        return Collections.singletonMap("_embedded",
                Collections.singletonMap(resource,
                        tags
                )
        );
    }




}
