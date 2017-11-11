package pl.socha23;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @Autowired
    private Environment environment;

    @Value("${spring.application.name}")
    private String title;

    @Value("#{servletContext.contextPath}")
    private String contextPath;

    @RequestMapping(value = {"/", "artifacts/**", "tags/**", "maps/**", "locators/**", "rescue/**"})
    public String index() {
        return "index";
    }

    @ModelAttribute("applicationName")
    public String getApplicationName() {
        return title;
    }


    @ModelAttribute("profile")
    public String getProfile() {
        return String.join(", ", environment.getActiveProfiles());
    }

    @ModelAttribute("contextPath")
    public String getContextPath() {
        return contextPath;
    }

}

