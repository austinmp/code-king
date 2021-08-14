import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Button from '../Button'
import styled from "styled-components";
import { Links } from './MenuLinks';
import { device } from '../../common/breakpoints'

// icons
import { CgCrown } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa';


export const Nav = styled.nav`
    background: #20232a;
    height: 90px;
    min-height:70px;
    width: 100vw;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: var(--nav-font-size);
    color: white;
    padding-right: 2vw;
    padding-left: 2vw;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const Logo = () => {    
    const CrownIcon = styled(CgCrown)`
        color: gold;
        font-size: 60px;
        margin-right: 10px;
    `;

    const LogoText = styled.a`
        overflow: hidden;
        text-decoration: none;
        color:white;
        cursor: pointer;
        font-weight: 600;
        font-size: 1.8rem;
        &:hover {
            text-decoration: none;
            color:#e0e0de;
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
                    form   : 'signUp'
                }));
            }}
        />
    )
};

export const HamburgerIcon = styled(GiHamburgerMenu)`
    color: inherit;
    font-size: 50px;
    margin-right: 10px;
    &:hover {
        color:#3acbf7;
    };
`;

const MenuItem = styled(Button)`
    background-color: #20232a;
    text-align: inherit;
    font-size: inherit;
`;

export const MenuItems = Links.map(item => {
    return (
        <Link to={item.url}
            key={item.title}
        >
            <MenuItem
                className={item.cName}
                text={item.title}                 
            />
        </Link>
    )
});

export const UserAvatar = ({ credentials }) => {
    const StyledAvatar = styled(FaUser)`
        margin-right: 20px;
        color: white;
        font-size: 30px;
    `;

    const StyledButton = styled(Button)`
        color: gold;
        text-align: center;
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




