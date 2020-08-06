import { Server } from "miragejs"
import boards from "./boards.json"
import boardConfig from "./boardConfig.json"
import issues_jc from "./issues_jc.json"
import issues_empty from "./issues_empty.json"
import issues_sushi_page1 from "./issues_sushi_page1.json"
import issues_sushi_epic1 from "./issues_sushi_epic1.json"

const issues = {
    'project=JC': issues_jc,
    'project=SUSHI': issues_sushi_page1,
    'project=SUSHI AND "Epic Link"=SUSHI-1414': issues_sushi_epic1,
};

new Server({
    routes() {
        this.get("/rest/agile/1.0/board", () => boards);
        this.get("/rest/agile/1.0/board/2/configuration", () => boardConfig);
        this.get("/rest/api/3/search", (schema, request) => {
            const jql = request.queryParams.jql;
            return issues[jql] || issues_empty;
        });
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
