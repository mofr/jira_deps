package mofr;

import com.atlassian.connect.spring.AtlassianHostUser;
import com.atlassian.connect.spring.IgnoreJwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AddonViewsController {

    @GetMapping(value = "/hello-world")
    @ResponseBody
    public String helloWorld(@AuthenticationPrincipal AtlassianHostUser hostUser) {
        return "hello-world";
    }

    @GetMapping(value = "/deps")
    @IgnoreJwt
    public String getDependencyView() {
        return "deps_page";
    }
}
