import React from "react";

export default function Centered(props) {
    return <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        {props.children}
    </div>;
}