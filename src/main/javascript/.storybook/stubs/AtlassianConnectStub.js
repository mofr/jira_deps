import { Server } from "miragejs"
import boards from "./boards.json"
import boardConfig from "./boardConfig.json"
import issuesTest1 from "./issuesTest1.json"
import issuesEmpty from "./issuesEmpty.json"
import issuesSushiPage1 from "./issuesSushiPage1.json"
import issuesSushiEpic1 from "./issuesSushiEpic1.json"

const issues = {
    'project=JC': issuesTest1,
    'project=SUSHI': issuesSushiPage1,
    'project=SUSHI AND "Epic Link"=SUSHI-1414': issuesSushiEpic1,
};

new Server({
    routes() {
        this.get("/rest/agile/1.0/board", () => boards);
        this.get("/rest/agile/1.0/board/2/configuration", () => boardConfig);
        this.get("/rest/api/3/search", (schema, request) => {
            const jql = request.queryParams.jql;
            return issues[jql] || issuesEmpty;
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
