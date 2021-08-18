import React from 'react';
import styled from "styled-components";
import { device } from '../common/breakpoints';

const Button = ({text, onClick, className, icon, type, iconPosition}) => {
    return (
        <button 
            className={className} 
            onClick={onClick}
            type={type}
        >
            {iconPosition == "right"
            ?  <Div> 
                    {text}
                    {icon}
                </Div>
            :   <Div> 
                    {icon}
                    {text}
                </Div>
            }
        </button>
    )
}

const Div = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledButton = styled(Button)`
    background-color:#6568F4;
    color: white;
    padding:8px 20px;
    border-radius: 6px;
    outline: none;
    border: none;
    cursor: pointer;
    min-width: 100px;
    text-align:inherit;
    font-size: inherit;

    &:hover {
        transition: all 0.3s, ease-out;
        background: #3acbf7;
        color: white;
        transition: 250ms;
    }

    @media ${device.sm} {
        padding:4px 10px;
    } 
`;

export default StyledButton;