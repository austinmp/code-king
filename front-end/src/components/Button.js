import React from 'react';
import styled from "styled-components";


const Button = ({text, onClick, className, icon}) => {
    return (
        <button className={className} onClick={onClick}>
            {icon}
            {text}
        </button>
    )
}

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

    &:hover {
        padding:8px 20px;
        transition: all 0.3s, ease-out;
        background: #3acbf7;
        color: white;
        transition: 250ms;
    }
`;



export default StyledButton;