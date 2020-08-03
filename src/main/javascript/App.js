import React from 'react';
import IssueCard from "./IssueCard";
import ColumnGroup from "./ColumnGroup";
import Column from "./Column";
import ColumnItem from "./ColumnItem";
import Centered from "./Centered";
import Spinner from '@atlaskit/spinner';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            issues: [],
        };
    }

    render() {
        if (this.state.loading) {
            return <Centered><Spinner size='xlarge'/></Centered>
        }
        return <Centered>
            <ColumnGroup>
                <Column>
                    {this.state.issues.map((issue, index) =>
                        <ColumnItem><IssueCard
                            id={issue.key}
                            link={issue.link}
                            title={issue.title}
                            status={issue.status}
                            type={issue.type}
                            assignee={issue.assignee}
                            storyPoints={issue.storyPoints}
                        /></ColumnItem>
                    )}
                </Column>
            </ColumnGroup>
        </Centered>;
    }

    async componentDidMount() {
        this.setState({...this.state, loading: true});
        const boardListResponse = await AP.request('/rest/agile/1.0/board?type=scrum&maxResults=1');
        const boardList = JSON.parse(boardListResponse.body);
        const boardId = boardList.values[0].id;

        const boardConfigurationResponse = await AP.request(`/rest/agile/1.0/board/${boardId}/configuration`);
        const boardConfiguration = JSON.parse(boardConfigurationResponse.body);
        const estimationField = boardConfiguration.estimation.field;

        const issuesResponse = await AP.request('/rest/api/3/search');
        const issuesResponseBody = JSON.parse(issuesResponse.body);
        const issues = [];
        for(var i = 0; i < issuesResponseBody.issues.length; i++) {
            const issue = issuesResponseBody.issues[i];
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
            })
        }
        this.setState({issues: issues, loading: false});

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
