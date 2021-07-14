import React, {useState} from 'react';
import styled from "styled-components";
import HamburgerMenu from './HamburgerMenu';
import {
    Nav,
    Logo,
    HamburgerIcon,
} from './NavbarItems';



const NavbarSmall= (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <NavSmall>
            <NavRow>
                <Logo/>
                <HamburgerIcon
                    onClick={() => setIsMenuOpen( prevState => !prevState)}
                />
            </NavRow>
            {isMenuOpen ? <HamburgerMenu {...props}/> : null }
        </NavSmall>
    )
};

const NavRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: inherit;
    padding: inherit;
    min-height: 70px;
`;

const NavSmall = styled(Nav)`
    flex-direction: column;
    overflow:visible;
    height: auto;
`;

export default NavbarSmall;