import React from "react";
import styled from "styled-components";

const Footer = () => {
    const date = new Date;
    const year = date.getFullYear();
    return (
        <StyledFooter>
            <div>&copy; Copyright {year}, Austin Pinto. All Rights Reserved.</div>
            <div>Icons made by 
                <a href="https://www.freepik.com" title="Freepik">Freepik</a> and 
                <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from 
                <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
        </StyledFooter>

    );
}

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #20232a;
    height:90px;
    position:absolute;
    bottom:0;
    width:100%;
    color: white;

    a {
       color: var(--secondary);

    }
`;

export default Footer;