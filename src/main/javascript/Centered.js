import React from "react";
import styled from "styled-components";

const Centered = styled.div`
    position: absolute;
    ${props => props.horizontal ? 'left: 50%;' : ''}
    ${props => props.vertical ? 'top: 50%;' : ''}
    transform: translate(${props => props.horizontal ? '-50%' : '0'}, ${props => props.vertical ? '-50%' : '0'});
`;

export default Centered;
