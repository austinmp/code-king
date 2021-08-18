import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
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
    };

    const logout = () => {
        setCredentials({
            username: '',
            token: ''  
        });
    };

    return ( 
        <AuthContext.Provider value={{credentials, setCredentials, login, logout}}>
            {props.children}                                                                                
        </AuthContext.Provider>
    );
}

