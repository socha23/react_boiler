package pl.socha23.cyberfire.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ForgettingStore<T> {
    private Map<String, T> items = new HashMap<>();
    private Map<String, Instant> timestamps = new HashMap<>();

    private int memoryTimeMillis = 1000;

    public ForgettingStore(int memoryTimeMillis) {
        this.memoryTimeMillis = memoryTimeMillis;
    }

    public List<T> list() {
        return timestamps.keySet().stream()
                .filter(id -> timestamps.get(id).plus(memoryTimeMillis, ChronoUnit.MILLIS).isAfter(Instant.now()))
                .sorted()
                .map(items::get)
                .collect(Collectors.toList());
    }

    public void put(String id, T item, Instant when) {
        items.put(id, item);
        timestamps.put(id, when);

    }

    public void put(String id, T item) {
        put(id, item, Instant.now());
    }

}
