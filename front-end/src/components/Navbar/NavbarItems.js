import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Button from '../Button'
import styled from "styled-components";
import { Links } from './MenuLinks';
import { device } from '../../common/breakpoints'
import { AuthContext } from '../../context/AuthContext';


// icons
// import { CgCrown } from 'react-icons/cg';
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

    const LogoText = styled.a`
        overflow: hidden;
        text-decoration: none;
        color:white;
        cursor: pointer;
        font-weight: 600;
        font-size: 25px;
        &:hover {
            text-decoration: none;
            color:white;
            transform: scale(1.05);
            color: var(--secondary);
            font-weight: 700;

        };
    `;

    const Div = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            margin-right: 10px;

        }
    `;

    return (
        <LogoText href='/' className="nav-logo">
            <Div>
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzc4LjYzMiAzNzguNjMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNzguNjMyIDM3OC42MzI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFRjhBMkU7IiBkPSJNODYuNDc1LDMyNS45MDZsLTIwLjA4LTU2LjQ4aDI0NS45MmwtMjAuMDgsNTYuNDhIODYuNDc1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0Y0RDIyQjsiIGQ9Ik02Ni4zOTUsMjY5LjQyNmwtNTguNC0xNjQuNDhsMTA3LjEyLDYyLjRsNzQuMjQtMTE0LjY0bDc0LjI0LDExNC42NGwxMDcuMTItNjIuNGwtNTguNCwxNjQuNDgNCglINjYuMzk1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzIzMTUwQjsiIGQ9Ik0zNjYuNjM1LDk4LjA2NmwtMTAwLjQ4LDU4LjU2bC03MC4wOC0xMDguMzJjLTIuMzk3LTMuNzExLTcuMzQ5LTQuNzc3LTExLjA2MS0yLjM3OQ0KCWMtMC45NTMsMC42MTUtMS43NjQsMS40MjYtMi4zNzksMi4zNzlsLTcwLjA4LDEwOC4zMmwtMTAwLjQ4LTU4LjU2Yy0zLjgwMi0yLjI1MS04LjcwOS0wLjk5My0xMC45NTksMi44MDkNCgljLTEuMjE2LDIuMDU1LTEuNDUxLDQuNTQ1LTAuNjQxLDYuNzkxbDc4LjQ4LDIyMC45NmMxLjExOCwzLjE5OSw0LjEzMSw1LjM0Niw3LjUyLDUuMzZoMjA1Ljc2YzMuMzg5LTAuMDEzLDYuNDAyLTIuMTYxLDcuNTItNS4zNg0KCWw3OC40LTIyMC45NmMxLjUtNC4xNTYtMC42NTMtOC43NDEtNC44MDktMTAuMjQxYy0yLjI0Ni0wLjgxLTQuNzM2LTAuNTc2LTYuNzkxLDAuNjQxSDM2Ni42MzV6IE0yODYuNjM1LDMxNy45ODZIOTIuMDc1DQoJbC0xNC43Mi00MC41NmgyMjRMMjg2LjYzNSwzMTcuOTg2eiBNMzA2LjYzNSwyNjEuNDI2SDcyLjA3NWwtNDkuMi0xMzguNTZsODgsNTEuNDRjMy42ODUsMi4xMzcsOC4zOTgsMS4wMTEsMTAuNzItMi41Nmw2Ny41Mi0xMDQNCglsNjcuNTIsMTA0YzIuMzIyLDMuNTcxLDcuMDM1LDQuNjk3LDEwLjcyLDIuNTZsODgtNTEuNDRMMzA2LjYzNSwyNjEuNDI2eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" height="40px" />
                Code King 
            </Div>

        </LogoText>
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

export const SignOutButton = () => {
    const { logout } = useContext(AuthContext);
    return (
        <Button
            className='sign-out-button'
            text="Sign Out"
            onClick={ () => logout() }
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

export const UserAvatar = () => {
    const { credentials } = useContext(AuthContext);
    const StyledAvatar = styled(FaUser)`
        margin-right: 20px;
        color: white;
        font-size: 25px;
    `;

    const StyledButton = styled(Button)`
        color: #f4d22b;
        text-align: center;
        outline: none;
        background: inherit;
        
   `;

    return (
        <Link to={`/submissions/${credentials.username}`}>
            <StyledButton
                text={credentials.username}
                className='btn'
                icon={<StyledAvatar/>}
            />
        </Link>
    );
}




