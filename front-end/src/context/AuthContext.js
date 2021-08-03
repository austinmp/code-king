import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [credentials  , setCredentials] = useState({
        username  : localStorage.getItem('codeKingUsername') || '',
        token     : localStorage.getItem('APIToken') || '',
      });

    return ( 
        <AuthContext.Provider value={[credentials, setCredentials]}>
            {props.children}                                                                                
        </AuthContext.Provider>
    );
}

