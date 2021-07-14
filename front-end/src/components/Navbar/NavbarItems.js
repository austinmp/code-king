import React, {useState} from 'react';
import Button from '../Button'
import styled from "styled-components";
import { Links } from './MenuLinks'

// icons
import { CgCrown } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa';


export const Nav = styled.nav`
    background: #20232a;
    height: 70px;
    min-height:70px;
    width: 100vw;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    color: white;
    padding-right: 30px;
    padding-left: 30px;
    overflow: hidden;
`;

export const Logo = () => {    
    const CrownIcon = styled(CgCrown)`
        color: gold;
        width: 40px;
        height: auto;
        margin-right: 10px;
    `;

    const LogoText = styled.a`
        overflow: hidden;
        text-decoration: none;
        color:white;
        cursor: pointer;
        font-weight: 600;
        font-size: 1.5rem;
        &:hover {
            text-decoration: none;
            color:#3acbf7;
        };
    `;

    return (
        <LogoText href='/' className="nav-logo"><CrownIcon/>Code King</LogoText>
    );
};

export const SignInButton = ({setModal}) => {
    const StyledButton = styled(Button)`
        background: #16181d;
    `;

    return (
        <StyledButton 
            className='btn'
            text="Sign In" 
            onClick={ ()=> {
                setModal(prevState =>({
                    ...prevState,
                    isOpen : true,
                    header : 'Sign In',
                    form   : 'singIn'
                }));
            }}
        />
    );
};

export const SignOutButton = ({ setCredentials }) => {
    return (
        <Button
            className='sign-out-button btn'
            text="Sign Out"
            onClick={ ()=>{
                    setCredentials({
                        username: '',
                        token: ''  
                    });
                }
            }
        />
    )
};

export const SignUpButton = ({ setModal }) => {
    return (
        <Button
            className='sign-up-button btn' 
            text="Sign Up"
            onClick={ ()=> {
                setModal(prevState =>({
                    ...prevState,
                    isOpen : true,
                    header : 'Create an Account',
                    form   : 'singUp'
                }));
            }}
        />
    )
};

export const HamburgerIcon = styled(GiHamburgerMenu)`
    color: inherit;
    width: 40px;
    height: auto;
    margin-right: 10px;
    &:hover {
        color:#3acbf7;
    };
`;

const MenuItem = styled(Button)`
    background-color: #20232a;
    text-align: inherit;
`;

export const MenuItems = Links.map(item => {
    return (
        <MenuItem
            key={item.title}
            className={item.cName}
            text={item.title}                     
        />
    )
});

export const UserAvatar = ({ credentials }) => {
    const StyledAvatar = styled(FaUser)`
        margin-right: 20px;
        color: white;
        width: 25px;
        height:auto;
    `;

    const StyledButton = styled(Button)`
        color: gold;
        text-align: center;
        // border-bottom: 0.5px white solid;
        outline: none;
        pointer-events: none;
        background: inherit;
   `;

    return (
        <StyledButton
            text={credentials.username}
            className='btn'
            icon={<StyledAvatar/>}
        />
    );
}




