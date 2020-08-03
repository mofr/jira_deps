import React from 'react';
import IssueCard from "../src/main/resources/javascript/IssueCard";

export default {
  title: 'Issue Card',
};

export const WithoutStoryPoints = () => (
    <IssueCard
        id={'NET-1234'}
        title={'Just an example task description'}
        status={{text: 'In Progress', color: 'blue'}}
        type={{name: 'Task', iconUrl: '/issuetype.svg'}}
        assignee={{name: 'Alexander Egorov', avatarUrl: '/avatar.png'}}
    />);

export const WithoutStatus = () => (
    <IssueCard
        id={'JC-345'}
        title={'An example task'}
        type={{name: 'Spike', iconUrl: '/issuetype.svg'}}
        storyPoints={3}
        assignee={{name: 'Alexander Egorov', avatarUrl: '/avatar.png'}}
    />);

export const WithoutType = () => (
    <IssueCard
        id={'JC-345'}
        title={'An example task'}
        status={{text: 'To Do', color: 'blue-grey'}}
        assignee={{name: 'Alexander Egorov', avatarUrl: '/avatar.png'}}
        storyPoints={5}
    />);

export const WithoutAssignee = () => (
    <IssueCard
        id={'JC-345'}
        title={'An example task'}
        status={{text: 'To Do', color: 'blue-grey'}}
        storyPoints={13}
    />);

export const AllSet = () => (
    <IssueCard
        id={'JC-345'}
        link='http://example.org/'
        title={'An example task'}
        type={{name: 'Spike', iconUrl: '/issuetype.svg'}}
        status={{text: 'To Do', color: 'blue-grey'}}
        assignee={{name: 'Alexander Egorov', avatarUrl: '/avatar.png'}}
        storyPoints={13}
    />);

export const All = () => (<div>
    <WithoutStoryPoints/>
    <WithoutStatus/>
    <WithoutType/>
    <WithoutAssignee/>
</div>);