package pl.socha23.cyberfire.services;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import pl.socha23.cyberfire.model.MapCoords;

import java.net.URI;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TrackimoLocatorProvider {

    private final static String TRACKIMO_URL = "https://app.trackimo.com/api";
    private final static String LOGIN = "trackimozab@gmail.com";
    private final static String PASSWORD = "OZAB2018";
    private final static String ACCOUNT_ID = "96513";
    private final static String CLIENT_ID = "9480494b-81b9-4f2d-9aed-acdca2667a9d";
    private final static String CLIENT_SECRET = "bd3a89fec64f2d916b17145c24c1fc6e";
    private final static String JSESSIONID = "JSESSIONID=";

    private RestTemplate restTemplate = new RestTemplate();

    public Collection<TrackimoLocator> listLocators() {
        String authToken = oauth2login();
        Collection<TrackimoLocator> result = fetchLocators(authToken);
        return result;
    }

    private String oauth2login() {
        String jSessionId = fetchJSessionId();
        String authCode = fetchOAuth2AuthCode(jSessionId);
        String authToken = fetchOAuth2Token(authCode);
        return authToken;
    }

    private String fetchJSessionId() {
        Map<String, Object> params = new MapBuilder()
                .put("username", LOGIN)
                .put("password", PASSWORD)
                .put("remember_me", true)
                .build();
        ResponseEntity<?> response = restTemplate.postForEntity(TRACKIMO_URL + "/internal/v1/user/login", params, Map.class);
        return extractJSessionId(response);
    }

    private String fetchOAuth2AuthCode(String jSessionId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Cookie", JSESSIONID + jSessionId);

        ResponseEntity<?> response = restTemplate.exchange(TRACKIMO_URL + "/v3/oauth2/auth"
                        + "?client_id=" + CLIENT_ID
                        + "&redirect_uri=http://localhost"
                        + "&scope=locations,devices"
                        + "&response_type=code"
                        + "&state=test",
                HttpMethod.GET,
                new HttpEntity<>("", headers),
                Map.class
        );
        URI uri = response.getHeaders().getLocation();
        return UriComponentsBuilder.fromUri(uri).build().getQueryParams().getFirst("code");
    }

    private String fetchOAuth2Token(String authCode) {
        Map<String, Object> params = new MapBuilder()
                .put("client_id", CLIENT_ID)
                .put("client_secret", CLIENT_SECRET)
                .put("code", authCode)
                .build();
        Map<?, ?> response = restTemplate.postForObject(TRACKIMO_URL + "/v3/oauth2/token", params, Map.class);
        return response.get("access_token").toString();
    }


    private String extractJSessionId(ResponseEntity<?> response) {
        String setCookieHeader = response.getHeaders().getFirst(HttpHeaders.SET_COOKIE);
        int jSessionIdIdx = setCookieHeader.indexOf(JSESSIONID);
        return setCookieHeader.substring(jSessionIdIdx + JSESSIONID.length(), setCookieHeader.indexOf(";", jSessionIdIdx));
    }


    @SuppressWarnings("unchecked")
    private Collection<TrackimoLocator> fetchLocators(String authToken) {
        List<Map<String, Object>> locationsResult = jsonCall(TRACKIMO_URL + "/v3/accounts/" + ACCOUNT_ID + "/locations", authToken, List.class);
        Map<String, MapCoords> locations = locationsResult.stream()
                .collect(Collectors.toMap(
                        loc -> loc.get("device_id").toString(),
                        loc -> MapCoords.of((Double) loc.get("lng"), (Double) loc.get("lat"))
                ));
        List<Map<String, Object>> devicesResult = jsonCall(TRACKIMO_URL + "/v3/accounts/" + ACCOUNT_ID + "/devices", authToken, List.class);
        Collection<TrackimoLocator> result = devicesResult.stream()
                .filter(m -> locations.containsKey(m.get("deviceId").toString()))
                .map(m -> new TrackimoLocator(m.get("deviceId").toString(), m.get("deviceName").toString(), locations.get(m.get("deviceId").toString())))
                .collect(Collectors.toList());
        return result;
    }

    private <T> T jsonCall(String url, String authToken, Class<T> resultClass) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + authToken);
        ResponseEntity<T> response = restTemplate.exchange(url,
                HttpMethod.GET,
                new HttpEntity<>("", headers),
                resultClass
        );
        return response.getBody();

    }

    static class MapBuilder {
        private Map<String, Object> map = new HashMap<>();

        MapBuilder put(String key, Object value) {
            map.put(key, value);
            return this;
        }

        Map<String, Object> build() {
            return map;
        }

    }

    @Data
    @AllArgsConstructor
    static class TrackimoLocator {
        private String id;
        private String name;
        private MapCoords location;
    }
}
