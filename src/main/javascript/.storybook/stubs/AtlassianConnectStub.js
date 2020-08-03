import { Server } from "miragejs"
import boards from "./boards.json"
import boardConfig from "./boardConfig.json"
import issues from "./issues.json"

new Server({
    routes() {
        this.get("/rest/agile/1.0/board", () => boards);
        this.get("/rest/agile/1.0/board/2/configuration", () => boardConfig);
        this.get("/rest/api/3/search", () => issues);
    },
});

class AtlassianConnectStub {
    // Original API https://developer.atlassian.com/cloud/confluence/jsapi/request/
    async request(url, options) {
        const response = await fetch(url);
        const body = await response.text();
        return {
            body,
        };
    }
}

window.AP = new AtlassianConnectStub();
