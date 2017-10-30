package pl.socha23.cyberfire.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Calendar;
import java.util.Date;

public abstract class AbstractIfinityIntegrationService<T> implements ApplicationListener<ContextRefreshedEvent> {

    private final static Log LOG = LogFactory.getLog(AbstractIfinityIntegrationService.class);
    @Autowired
    private TaskScheduler scheduler;

    @Value("${ifinityWS}")
    private String ifinityWS;

    private final static long RESPONSE_OK = 0L;

    private T serviceResult;
    private Instant serviceResponseTimestamp;
    private Long serviceResponseCode;
    private String serviceResponseStatus;
    private String serviceResponseMessage;

    private RestTemplate restTemplate = new RestTemplate();

    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (getRefreshIntervalMillis() > 0) {
            scheduler.scheduleAtFixedRate(
                    this::callService,
                    secondsInTheFuture(5),
                    getRefreshIntervalMillis());
        } else {
            scheduler.schedule(
                    this::callService,
                    secondsInTheFuture(5)
            );
        }
    }

    private Date secondsInTheFuture(int howManySeconds) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.SECOND, howManySeconds);
        return c.getTime();
    }

    protected T getServiceResult() {
        if (needsToCallService()) {
            callService();
        }
        if (isResponseOk()) {
            return serviceResult;
        } else {
            throw new RuntimeException(
                    "Error when calling " + getServiceUrl() + ": "
                            + serviceResponseStatus + " - "
                            + serviceResponseMessage
            );
        }
    }

    protected boolean needsToCallService() {
        return serviceResult == null || !isResponseOk();
    }

    protected boolean isResponseOk() {
        return serviceResponseCode == RESPONSE_OK;
    }

    protected void callService() {
        try {
            JsonNode result = restTemplate.getForObject(getServiceUrl(), JsonNode.class);
            serviceResponseCode = result.get("code").asLong();
            serviceResponseStatus = nullSafeGet(result, "status", "no status");
            serviceResponseMessage = nullSafeGet(result, "message", "no details");

            if (isResponseOk()) {
                serviceResponseTimestamp = Instant.now();
                serviceResult = decodeResult(result);
            }
        } catch (Exception e) {
            LOG.error("Error invoking integration service", e);
            serviceResponseCode = -1L;
            serviceResponseStatus = "Call service error";
            serviceResponseMessage = e.getMessage();
        }
    }

    protected String nullSafeGet(JsonNode json, String field, String def) {
        if (json.get(field) != null) {
            return json.get(field).asText();
        } else {
            return def;
        }
    }

    private String getServiceUrl() {
        return ifinityWS + getServicePath();
    }

    public Instant getLastOkResponseTimestamp() {
        return serviceResponseTimestamp;
    }

    protected abstract T decodeResult(JsonNode result);

    protected abstract String getServicePath();

    /**
     * @return interval between service calls, 0 or negative to call the service only once
     */
    protected abstract int getRefreshIntervalMillis();


}
