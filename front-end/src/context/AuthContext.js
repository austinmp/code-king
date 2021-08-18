import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials  , setCredentials] = useState({
        username  : localStorage.getItem('codeKingUsername') || '',
        token     : localStorage.getItem('APIToken') || '',
    });

    const login = (username, token) => {
        setCredentials({
            username: username,
            token: token 
        });
        localStorage.setItem('codeKingUsername', username);
        localStorage.setItem('APIToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setCredentials({
            username: '',
            token: ''  
        });
        setIsLoggedIn(false);
    };

    return ( 
        <AuthContext.Provider value={{credentials, setCredentials, isLoggedIn, login, logout}}>
            {props.children}                                                                                
        </AuthContext.Provider>
    );
}

