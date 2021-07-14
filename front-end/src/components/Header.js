import React from "react";
import styled from "styled-components";

function Header({text}) {
    return (
        <StyledHeader>
            <StyledH1>{text}</StyledH1>
        </StyledHeader>   
    );
}

const StyledHeader = styled.header`
    min-width: 800px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 50%;
    margin-top: 40px;
    margin-bottom: 20px;
    color: white;
    overflow: hidden;
    
`;

const StyledH1 = styled.h1 `
    font-size: 40px;
    border-left-color: #6568F4;
    border-left-width: 9px;
    border-bottom-width: 9px;
    border-left-style: solid;
    padding: 20px 45px 20px 26px;
`;

export default Header;