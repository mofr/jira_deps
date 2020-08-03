package mofr.ngrok;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ConditionalOnProperty(name = "ngrok.enabled", havingValue = "true")
@Component
public class NgrokUrlGetter {

    private static final String PROPERTY_NAME = "addon.base-url";
    private static final Logger log = LoggerFactory.getLogger(NgrokUrlGetter.class);
    private final NgrokApiClient ngrok;
    private ConfigurableEnvironment env;

    public NgrokUrlGetter(NgrokApiClient ngrok, ConfigurableEnvironment env) {
        this.ngrok = ngrok;
        this.env = env;
    }

    @EventListener({ApplicationReadyEvent.class})
    public void tryToGetNgrokUrl() {
        List<NgrokTunnel> tunnels = ngrok.getTunnels();
        for (NgrokTunnel tunnel : tunnels) {
            if (tunnel.getProto().equals("https")) {
                setupBaseURL(tunnel.getPublicUrl());
                return;
            }
        }
    }

    private void setupBaseURL(String baseURL) {
        log.info("Set Atlassian Connect Addon base URL to " + baseURL);
        Map<String, Object> map = new HashMap<>();
        map.put(PROPERTY_NAME, baseURL);
        MutablePropertySources propertySources = env.getPropertySources();
        propertySources.addFirst(new MapPropertySource("NgrokUrlGetter", map));
    }
}
