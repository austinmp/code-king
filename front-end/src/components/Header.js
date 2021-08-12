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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    color: var(--title-primary);
    overflow: hidden;
`;

const StyledH1 = styled.h1 `
    font-weight: 700;
    font-size: 60px;
    /* border-left-color: #6568F4;
    border-left-width: 9px;
    border-bottom-width: 9px;
    border-left-style: solid; */
    /* padding: 20px 45px 20px 26px; */
`;

export default Header;