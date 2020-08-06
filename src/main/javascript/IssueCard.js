import React from 'react';
import { Status } from '@atlaskit/status/element';
import Card from "./Card";
import Tooltip from '@atlaskit/tooltip';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import styled from 'styled-components';

const IssueLink = styled.a`
  color: gray;
  margin: 6px;
  font-weight: 600;
  white-space: nowrap;
`;

const TooltipTag = styled.div`
    display: flex;
`;

function IssueCard(props) {
    const typeElement = (props.type && <Tooltip content={props.type.name} tag={TooltipTag}>
        <img src={props.type.iconUrl} alt={props.type.name}/>
    </Tooltip>);
    const statusElement = (props.status && <Status text={props.status.text} color={props.status.color} />);
    const assigneeElement = (props.assignee && <Tooltip content={props.assignee.name}>
        <Avatar size='small' src={props.assignee.avatarUrl}/>
    </Tooltip>);

    return <Card>
        <div style={{display: 'flex', alignItems: 'center'}}>
            {typeElement}
            <IssueLink href={props.link}>{props.id}</IssueLink>
            <span>{props.title}</span>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            {statusElement || <div/>}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Tooltip content={props.storyPoints ? `${props.storyPoints} Story Points` : 'No estimation'}>
                    <Badge>{props.storyPoints || '-'}</Badge>
                </Tooltip>
                {assigneeElement}
            </div>
        </div>
    </Card>;
}

export default IssueCard;
