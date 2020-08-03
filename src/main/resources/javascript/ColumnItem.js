import React from 'react';
import {N20} from "@atlaskit/theme/colors";

export default function ColumnItem(props) {
    return <div style={{
        margin: '6px',
    }}>
        {props.children}
    </div>
}
