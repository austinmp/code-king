import React from 'react';
import styled from "styled-components";
import {useMedia} from 'react-use';
import NavbarSmall  from './NavbarSmall';
import {
    Nav,
    Logo,
    MenuItems,
    SignInButton,
    SignOutButton,
    SignUpButton,
    UserAvatar
} from './NavbarItems';

const Navbar = (props) => {
    const isWide = useMedia('(min-width: 1024px)');
    
    return (
        isWide
        ? <Nav>
            <Logo/>
            <NavRight>
                {[...MenuItems]}
                { props.credentials.token 
                ? <>
                    <UserAvatar credentials={props.credentials}/>
                    <SignOutButton setCredentials={props.setCredentials}/>
                </>
                : <>
                    <SignInButton setModal={props.setModal} />
                    <SignUpButton setModal={props.setModal}/>
                </>
                }
            </NavRight>
        </Nav> 
        : <NavbarSmall {...props} />
    );
}

const NavRight = styled.div`
    display: flex;
    list-style: none;
    margin-left: auto;
    align-items: center;
    justify-content: flex-end;
    height:100%;
    overflow: hidden;
    flex-wrap: nowrap;
    button {
        text-align: center;
        margin-left: 20px;
    }
`;
export default Navbar;