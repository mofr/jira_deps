import React from 'react';
import IssueCard from "../src/main/resources/javascript/IssueCard";
import Column from "../src/main/resources/javascript/Column";
import ColumnItem from "../src/main/resources/javascript/ColumnItem";
import ColumnGroup from "../src/main/resources/javascript/ColumnGroup";

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
        <ColumnItem><Issue1/></ColumnItem>
        <ColumnItem><Issue1/></ColumnItem>
        <ColumnItem><Issue2/></ColumnItem>
        <ColumnItem><Issue1/></ColumnItem>
    </Column>
    <Column>
        <ColumnItem><Issue1/></ColumnItem>
        <ColumnItem><Issue2/></ColumnItem>
    </Column>
</ColumnGroup>);