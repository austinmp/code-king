import React from 'react';
import {
    Route,
    Redirect, 
  } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route {...rest} render={() => {
                return (
                    isAuthenticated 
                    ? <Component token={ isAuthenticated }/>
                    : <Redirect to={{
                            pathname: "/",
                            search: "?showLogIn=true",

                        }}
                    />                  
                );
            }}
        />
    );
} 

export default ProtectedRoute;
