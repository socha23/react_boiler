package pl.socha23.cyberfire.controllers;


import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IfinityStubServicesController {

    private final static Log LOG = LogFactory.getLog(IfinityStubServicesController.class);

    private Resource tagPositionResource = new ClassPathResource("ifinityStub/getTagPosition.json");
    private Resource projectInfoResource = new ClassPathResource("ifinityStub/getProjectInfo.json");

    @RequestMapping(value="/api/ifinityStub/qpe/getTagPosition",  produces={"application/json"})
    @ResponseBody
    public String getTagPosition() throws Exception {
        return IOUtils.toString(tagPositionResource.getInputStream());
    }

    @RequestMapping(value="/api/ifinityStub/qpe/getProjectInfo",  produces={"application/json"})
    @ResponseBody
    public String getProjectInfo() throws Exception {
        return IOUtils.toString(projectInfoResource.getInputStream());
    }
}
