package pl.socha23.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CollectionUtils {

    public static Map<Object, Object> map(Object ... args) {
        Map<Object, Object> result = new HashMap<>();
        for (int i = 0; i < args.length; i += 2) {
            result.put(args[i], args[i + 1]);
        }
        return result;
    }

    public static List<Object> list(Object ... args) {
        List<Object> result = new ArrayList<>();
        for (Object o : args) {
            result.add(o);
        }
        return result;
    }

}
