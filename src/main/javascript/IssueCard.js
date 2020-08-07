import React from 'react';
import { Status } from '@atlaskit/status/element';
import Card from "./Card";
import Tooltip from '@atlaskit/tooltip';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import styled from 'styled-components';


function IssueCard(props) {
    return <Card>
        <span>{props.title}</span>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <IssueTypeIcon type={props.type}/>
                <IssueLink href={props.link}>{props.id}</IssueLink>
                <IssueStatus status={props.status}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <IssueEstimation storyPoints={props.storyPoints} />
                <IssueAssignee assignee={props.assignee}/>
            </div>
        </div>
    </Card>;
}

const IssueLink = styled.a`
  color: gray;
  margin: 6px;
  font-weight: 600;
  white-space: nowrap;
`;

const TooltipTag = styled.div`
    display: flex;
`;

function IssueTypeIcon(props) {
    if (!props.type) return null;

    return <Tooltip content={props.type.name} tag={TooltipTag}>
        <img src={props.type.iconUrl} alt={props.type.name}/>
    </Tooltip>;
}

function IssueStatus(props) {
    if (!props.status) return null;
    return <Status text={props.status.text} color={props.status.color} />;
}

function IssueAssignee(props) {
    return <Tooltip content={props.assignee ? props.assignee.name : 'Unassigned'}>
        <Avatar size='small' src={props.assignee?.avatarUrl}/>
    </Tooltip>;
}

function IssueEstimation(props) {
    return <Tooltip content={props.storyPoints ? `${props.storyPoints} Story Points` : 'No estimation'}>
        <Badge>{props.storyPoints || '-'}</Badge>
    </Tooltip>
}

export default IssueCard;
