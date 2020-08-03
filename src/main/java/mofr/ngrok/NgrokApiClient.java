package mofr.ngrok;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Component
public class NgrokApiClient {
    public static final String NGROK_URL_API_TUNNELS = "/api/tunnels";
    public static final String NGROK_URL_HTML_STATUS = "/status";
    private static final Logger log = LoggerFactory.getLogger(NgrokApiClient.class);
    private final String ngrokApiUrl;
    private RestTemplate restTemplate = new RestTemplate();

    public NgrokApiClient(@Value("${ngrok.api.url:http://localhost:4040}") String ngrokApiUrl) {
        this.ngrokApiUrl = ngrokApiUrl;
    }

    public List<NgrokTunnel> getTunnels() {
        try {
            NgrokTunnelList tunnels = this.restTemplate.getForObject(this.ngrokApiUrl + "/api/tunnels", NgrokTunnelList.class, new Object[0]);

            assert tunnels != null;

            return tunnels.getTunnels();
        } catch (Exception var2) {
            return Collections.emptyList();
        }
    }

    public boolean isResponding() {
        String ngrokStatusUrl = this.ngrokApiUrl + "/status";

        try {
            ResponseEntity<Void> response = this.restTemplate.getForEntity(ngrokStatusUrl, Void.class, new Object[0]);
            return response.getStatusCode().is2xxSuccessful();
        } catch (RestClientException var3) {
            return false;
        }
    }

    public String getNgrokApiUrl() {
        return this.ngrokApiUrl;
    }
}
