import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({component : Component, ...rest }) => {
    const { credentials } = useContext(AuthContext);
    const isAuthenticated = credentials.token;
    return (
        <Route 
            {...rest} 
            render={(routeProps) => {
                return (
                    isAuthenticated
                    // All route props (match, location and history) are available to component 
                    ? <Component 
                        {...routeProps}
                        {...rest}
                    />
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









