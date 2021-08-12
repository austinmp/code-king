import React from 'react';
import styled from "styled-components";
import {
    MenuItems,
    SignInButton,
    SignOutButton,
    SignUpButton,
    UserAvatar
} from './NavbarItems';

const HamburgerMenu = (props) => {
    return (
        <MenuContainer>
            { (props.credentials.token) 
                ? <>
                    <UserAvatar credentials={props.credentials}/>
                    {[...MenuItems]}
                    <SignOutButton setCredentials={props.setCredentials}/>
                </>
                : <>   
                    {[...MenuItems]}
                    <SignInButton setModal={props.setModal} />
                    <SignUpButton setModal={props.setModal}/>
                </>
            }
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
    background: #6568F4;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: inherit;
    button {
        width: 100%;
        height: 60px;
        border-radius: unset;
        background-color: #16181d;
    }
`;

export default HamburgerMenu;