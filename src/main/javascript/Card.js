import * as React from "react";
import {N0, N800} from "@atlaskit/theme/colors";

function Card(props) {
    return <div style={{
        backgroundColor: N0,
        color: N800,
        boxShadow: '0px 1px 2px rgba(9, 30, 66, 0.25)',
        borderRadius: 3,
        maxWidth: 320,
        padding: '12px 10px',
    }}>
        {props.children}
    </div>;
}

export default Card;
