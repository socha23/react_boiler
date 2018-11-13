package pl.socha23.cyberfire.services;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import pl.socha23.cyberfire.model.Locator;

import java.net.URI;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class TrackimoLocatorProvider {

    private final static String TRACKIMO_URL = "https://app.trackimo.com/api";
    private final static String LOGIN = "trackimozab@gmail.com";
    private final static String PASSWORD = "OZAB2018";
    private final static String ACCOUNT_ID = "96513";
    private final static String CLIENT_ID = "47bc7d1f-3af9-4884-8dce-3dc44d8ba708";
    private final static String CLIENT_SECRET = "29ac14a77e120570aa200085aac6ce9b";
    private final static String JSESSIONID = "JSESSIONID=";

    private RestTemplate restTemplate = new RestTemplate();

    public Collection<Locator> listLocators() {
        String authToken = oauth2login();
        Collection<Locator> result = fetchLocators(authToken);
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
                        + "&scope=locations"
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

    private Collection<Locator> fetchLocators(String authToken) {
        List<Map<String, Object>> locations = jsonCall(TRACKIMO_URL + "/v3/accounts/" + ACCOUNT_ID + "/locations", authToken, List.class);
        return null;
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



    public static void main(String[] args) {
        System.out.println(new TrackimoLocatorProvider().listLocators());
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
}
