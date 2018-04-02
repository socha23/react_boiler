package pl.socha23.cyberfire;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Fireteam;
import pl.socha23.cyberfire.repositories.FireteamRepository;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class FireteamHeartbeatFilter implements Filter {

    private final static String HEADER = "OZAB-Fireteam";

    private FireteamRepository fireteamRepository;

    public FireteamHeartbeatFilter(@Autowired FireteamRepository fireteamRepository) {
        this.fireteamRepository = fireteamRepository;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String fireteamId = ((HttpServletRequest)request).getHeader(HEADER);
        if (fireteamId != null) {
            heartbeat(fireteamId);
        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }

    private void heartbeat(String fireteamId) {
        Fireteam ft = fireteamRepository.findOne(fireteamId);
        if (ft != null) {
            ft.setLastActive(LocalDateTime.now());
            fireteamRepository.save(ft);
        }
    }

}
