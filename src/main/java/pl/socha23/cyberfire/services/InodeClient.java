package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketConnectionManager;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import pl.socha23.cyberfire.model.NearbyDevice;

import java.time.Instant;
import java.util.Comparator;
import java.util.stream.Stream;

@Component
public class InodeClient {

    @Value("${inode.reconnectIfNoMessagesForMs:10000}")
    private int reconnectIfNoMessageForMs = 10000;

    @Value("${inode.dropDeviceIfNoSignalForMs:5000}")
    private int dropDeviceIfNoSignalForMs = 5000;

    @Value("${inode.minRssi:-128}")
    private int minRssi = -128;

    @Value("${inode.address:192.168.72.101}")
    private String address = "192.168.72.101";

    private ForgettingStore<NearbyDevice> devicesSeen = new ForgettingStore<>(dropDeviceIfNoSignalForMs);
    private WebSocketConnectionManager ws;
    private Instant lastMessage;

    public Stream<NearbyDevice> getDevicesSeen() {
        return devicesSeen.list().stream()
                .sorted(Comparator.comparing(NearbyDevice::getId));
    }

    private void connect() {
        ws = new WebSocketConnectionManager(
                new StandardWebSocketClient(),
                new InodeWebSocketHandler(),
                "ws://" + address + "/websocket.cgi"
                );
        ws.start();
    }

    private void disconnect() {
        if (ws != null) {
            ws.stop();
            ws = null;
        }
    }

    @Scheduled(fixedRate = 5000)
    public void reconnectIfNeeded() {
        if (!isOnline()) {
            disconnect();
            connect();
        }
    }

    public boolean isOnline() {
        return lastMessage != null &&
                lastMessage.plusMillis(reconnectIfNoMessageForMs).isAfter(Instant.now());
    }



    private void processMessage(InodeMessage message) {
        lastMessage = Instant.now();
        if (message.isDeviceInfo() && message.getRssi() > minRssi) {
            devicesSeen.put(message.getDeviceId(), new NearbyDevice(message.getDeviceId(), message.getRssi()));
        }
    }

    private static class InodeMessage {
        private final String message;

        int getRssi() {
            int rssiByte = Integer.parseInt(message.substring(message.length() - 2), 16);
            return -256 + rssiByte;
        }

        InodeMessage(String message) {
            this.message = message;
        }

        public String toString() {
            return message;
        }

        boolean isDeviceInfo() {
            return message.substring(6, 8).equals("02");
        }

        String getDeviceId() {
            return (message.substring(24, 26)
                    + message.substring(22, 24)
                    + message.substring(20, 22)
                    + message.substring(18, 20)
                    + message.substring(16, 18)
                    + message.substring(14, 16)).toLowerCase();
        }
    }

    private class InodeWebSocketHandler extends TextWebSocketHandler {
        protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
            processMessage(new InodeMessage(message.getPayload().trim()));
        }
    }
}
