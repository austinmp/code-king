import React from "react";
import styled from "styled-components";
import { device } from '../common/breakpoints';


const Header = ({text, className}) => {
    return (
        <StyledHeader>
            {text}
        </StyledHeader>   
    );
}

const StyledHeader = styled.header`
    font-weight: 700;
    font-size: 60px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    color: var(--title-primary);
    overflow: hidden;
    justify-content: left;
    border-bottom: 0px;

    @media ${device.sm} {
        font-size: 40px;
      } 
`;

export default Header;