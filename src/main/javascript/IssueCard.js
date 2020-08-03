import React from 'react';
import { Status, Color } from '@atlaskit/status/element';
import Card from "./Card";
import Tooltip from '@atlaskit/tooltip';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';

function IssueCard(props) {
    const typeElement = (props.type && <Tooltip content={props.type.name}>
        <img src={props.type.iconUrl} alt={props.type.name}/>
    </Tooltip>);
    const statusElement = (props.status && <Status text={props.status.text} color={props.status.color} />);
    const assigneeElement = (props.assignee && <Tooltip content={props.assignee.name}>
        <Avatar size='small' src={props.assignee.avatarUrl}/>
    </Tooltip>);

    return <Card>
        <div style={{display: 'flex', alignItems: 'center'}}>
            {typeElement}
            <span style={{color: 'gray', margin: '6px', fontWeight: 600}}><a href={props.link}>{props.id}</a></span>
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
