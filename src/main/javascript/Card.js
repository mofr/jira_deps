import * as React from "react";
import {N0, N10, N800} from "@atlaskit/theme/colors";
import styled from 'styled-components';

const Card = styled.div`
    background-color: ${N0};
    color: ${N800};
    box-shadow: 0px 1px 2px rgba(9, 30, 66, 0.25);
    border-radius: 3px;
    width: 320px;
    padding: 12px 10px;
    
    &:hover {
        background-color: ${N10};
    }
`;

export default Card;
