import React from 'react';
import IssueCard from "./IssueCard";
import ColumnGroup from "./ColumnGroup";
import Column from "./Column";
import Centered from "./Centered";
import Spinner from '@atlaskit/spinner';
import toposort from './topo';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            issues: [],
            issueLinks: [],
        };
    }

    render() {
        if (this.state.loading) {
            return <Centered><Spinner size='large'/></Centered>
        }

        const layers = this.sortIssues();

        return <Centered>
            <ColumnGroup>
                {layers.map(layer =>
                    <Column>
                        {layer.map(issue =>
                            <IssueCard
                                key={issue.key}
                                id={issue.key}
                                link={issue.link}
                                title={issue.title}
                                status={issue.status}
                                type={issue.type}
                                assignee={issue.assignee}
                                storyPoints={issue.storyPoints}
                            />
                        )}
                    </Column>
                )}
            </ColumnGroup>
        </Centered>;
    }

    sortIssues() {
        const graph = new Map();
        this.state.issues.map(issue => graph.set(issue.key, []));
        this.state.issueLinks.map(link => graph.set(link.outward, []));
        this.state.issueLinks.map(link => graph.get(link.outward).push(link.inward));
        const layers = toposort(Array.from(graph));
        const issueByKey = new Map(this.state.issues.map(issue => [issue.key, issue]));
        return layers.map(layer => [...layer].map(issueKey => issueByKey.get(issueKey) || {'key': issueKey, 'title': 'Issue outside of JQL'}));
    }

    async componentDidMount() {
        this.setState({...this.state, loading: true});
        const boardListResponse = await AP.request('/rest/agile/1.0/board?type=scrum&maxResults=1');
        const boardList = JSON.parse(boardListResponse.body);
        const boardId = boardList.values[0].id;

        const boardConfigurationResponse = await AP.request(`/rest/agile/1.0/board/${boardId}/configuration`);
        const boardConfiguration = JSON.parse(boardConfigurationResponse.body);
        const estimationField = boardConfiguration.estimation.field;

        const jql = this.props?.jql;
        let querystring = '';
        if (jql) {
            querystring = `jql=${encodeURIComponent(jql)}`;
        }
        if (querystring) {
            querystring = '?' + querystring;
        }
        const issuesResponse = await AP.request('/rest/api/3/search' + querystring);
        const issuesResponseBody = JSON.parse(issuesResponse.body);
        const issues = [];
        const issueLinks = {};
        for(const issue of issuesResponseBody.issues) {
            const issuetype = issue.fields.issuetype;
            const statusCategory = issue.fields.status.statusCategory;
            const assignee = issue.fields.assignee;
            const issueUrl = new URL(issue.self);
            const storyPoints = issue.fields[estimationField.fieldId];
            issues.push({
                key: issue.key,
                link: issueUrl.origin + '/browse/' + issue.key,
                title: issue.fields.summary,
                status: {text: statusCategory.name, color: statusCategory.colorName},
                type: {name: issuetype.name, iconUrl: issuetype.iconUrl},
                assignee: (issue.fields.assignee && {name: assignee.displayName, avatarUrl: assignee.avatarUrls['48x48']}),
                storyPoints: storyPoints,
            });
            for(const link of issue.fields.issuelinks) {
                if (link.outwardIssue) {
                    issueLinks[link.id] = {
                        id: link.id,
                        type: link.type,
                        inward: issue.key,
                        outward: link.outwardIssue.key,
                    };
                }
                else if (link.inwardIssue) {
                    issueLinks[link.id] = {
                        id: link.id,
                        type: link.type,
                        inward: link.inwardIssue.key,
                        outward: issue.key,
                    };
                }
            }
        }
        this.setState({issues: issues, issueLinks: Object.values(issueLinks), loading: false});

        // AP.jira.initJQLEditor();
        // var options = {
        //     jql: '',
        //     header: 'Select Issues',
        //     descriptionText: 'Selected Issues will be added to the view',
        //     submitText: 'Add',
        //     cancelText: 'Cancel'
        // };
        //
        // var callback = function(obj) {
        //     alert(obj.jql);
        // };
        //
        // AP.jira.showJQLEditor(options, callback);
    }
}

export default App;
