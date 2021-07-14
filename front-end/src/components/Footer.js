import React from "react";
import styled from "styled-components";

function Footer(){
    return (
        <StyledFooter/>
    );
}

const StyledFooter = styled.footer`
    background: #20232a;
    height:70px;
    position:absolute;
    bottom:0;
    width:100%;
`;

export default Footer;