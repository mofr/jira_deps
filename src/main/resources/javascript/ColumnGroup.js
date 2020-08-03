import React from 'react';

export default function ColumnGroup(props) {
    return <div style={{display: 'flex'}}>
        {props.children}
    </div>
}
