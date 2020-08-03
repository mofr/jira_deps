import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import '@atlaskit/reduced-ui-pack';
import App from './App'

function startRender() {
    ReactDOM.render(
        <App/>,
        document.getElementById('react-container')
    );
}

window.onload = startRender;
