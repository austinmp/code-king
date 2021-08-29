import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState((sessionStorage.getItem('APIToken') ? true : false));
    const [credentials  , setCredentials] = useState({
        username  : sessionStorage.getItem('codeKingUsername') || '',
        token     : sessionStorage.getItem('APIToken') || '',
    });

    const login = (username, token) => {
        setCredentials({
            username: username,
            token: token 
        });
        sessionStorage.setItem('codeKingUsername', username);
        sessionStorage.setItem('APIToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setCredentials({
            username: '',
            token: ''  
        });
        setIsLoggedIn(false);
        sessionStorage.clear();
    };

    return ( 
        <AuthContext.Provider value={{credentials, isLoggedIn, setCredentials, login, logout}}>
            {props.children}                                                                                
        </AuthContext.Provider>
    );
}

