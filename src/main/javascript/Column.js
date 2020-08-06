import React from 'react';
import {N20} from "@atlaskit/theme/colors";
import styled from 'styled-components';

const ColumnItem = styled.div`
    margin: 6px;
`;


export default function Column(props) {
    return <div style={{
        backgroundColor: N20,
        borderRadius: '4px',
        margin: '6px',
    }}>
        {props.children.map(child => <ColumnItem key={child.key}>{child}</ColumnItem>)}
    </div>
}
