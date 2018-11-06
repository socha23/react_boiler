package pl.socha23.cyberfire.controllers;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class RestControllerUtils {

    public static  <T> Map wrapInDataRestFormat(String resource, Collection<T> items) {
        return Collections.singletonMap("_embedded",
                Collections.singletonMap(resource,
                        items
                )
        );
    }




}
