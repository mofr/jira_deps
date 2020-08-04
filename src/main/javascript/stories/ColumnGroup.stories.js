import React from 'react';
import IssueCard from "../IssueCard";
import Column from "../Column";
import ColumnGroup from "../ColumnGroup";

export default {
  title: 'Column Group',
};

const Issue1 = () => (
    <IssueCard
        id={'NET-1234'}
        title={'Just an example task description'}
        status={{text: 'In Progress', color: 'blue'}}
        type={{name: 'Task', iconUrl: '/issuetype.svg'}}
        assignee={{name: 'Alexander Egorov', avatarUrl: '/avatar.png'}}
    />);

const Issue2 = () => (
    <IssueCard
        id={'JC-345'}
        title={'An example task'}
        status={{text: 'To Do', color: 'blue-grey'}}
        storyPoints={13}
    />);

export const MultipleColumns = () => (<ColumnGroup>
    <Column>
        <Issue1/>
        <Issue1/>
        <Issue2/>
        <Issue1/>
    </Column>
    <Column>
        <Issue1/>
        <Issue2/>
    </Column>
</ColumnGroup>);