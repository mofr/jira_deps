package mofr.ngrok;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class NgrokTunnelList implements Serializable {
    private List<NgrokTunnel> tunnels = new ArrayList();

    public NgrokTunnelList() {
    }

    public List<NgrokTunnel> getTunnels() {
        return this.tunnels;
    }

    public void setTunnels(List<NgrokTunnel> tunnels) {
        this.tunnels = tunnels;
    }
}
