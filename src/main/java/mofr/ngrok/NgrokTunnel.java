package mofr.ngrok;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

@JsonIgnoreProperties(
        ignoreUnknown = true
)
public class NgrokTunnel implements Serializable {
    @JsonProperty("public_url")
    private String publicUrl;
    private String proto;

    public NgrokTunnel() {
    }

    public String getPublicUrl() {
        return this.publicUrl;
    }

    public void setPublicUrl(String publicUrl) {
        this.publicUrl = publicUrl;
    }

    public String getProto() {
        return this.proto;
    }

    public void setProto(String proto) {
        this.proto = proto;
    }
}
