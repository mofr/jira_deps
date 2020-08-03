import React from 'react';
import {N20} from "@atlaskit/theme/colors";

export default function Column(props) {
    return <div style={{
        backgroundColor: N20,
        borderRadius: '4px',
        margin: '6px',
    }}>
        {props.children}
    </div>
}
