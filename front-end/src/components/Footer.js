import React from "react";
import styled from "styled-components";

const Footer = () => {
    const date = new Date;
    const year = date.getFullYear();
    return (
        <StyledFooter>
            <div>&copy; Copyright {year}, Austin Pinto. All Rights Reserved.</div>
            <div>Icons made by 
                <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware"> Good Ware</a> ,
                <a href="https://www.freepik.com" title="Freepik"> Freepik</a> and  
                <a href="https://www.flaticon.com/authors/monkik" title="monkik"> monkik</a> from 
                <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </div>
        </StyledFooter>

    );
}

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    height: 100%;
    background: #20232a;
    min-height:90px;
    height: auto;
    position:absolute;
    bottom:0;
    width:100%;
    color: white;

    div {
        margin-top: 10px;
    }

    a {
       color: var(--secondary);

    }
`;

export default Footer;