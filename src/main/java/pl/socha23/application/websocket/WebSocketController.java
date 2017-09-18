package pl.socha23.application.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Component
@RestController
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @RequestMapping("/yo")
    public boolean yo() {
        Map<String, Object> headers = new HashMap<>();
        headers.put("foo", "bar");

        messagingTemplate.convertAndSend("/queue/chat", "XXX", headers);
        return true;
    }
}
