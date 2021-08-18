import React, { useEffect, useState, useContext } from 'react';
import useFetch from '../../api/useFetch';
import Button from '../Button';
import styled from "styled-components";
import { AuthContext } from '../../context/AuthContext';
import StyledForm from './StyledForm';

function LoginForm({modal, setModal}){
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const fetchData = useFetch();

    const validateForm = () => {
        return (username && password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const raw = JSON.stringify({
            userId: username,
            passId: password
        });
        const options = {
            method: 'POST',
            body : raw,
        }
        const [token, loading, err] = await fetchData(`http://164.90.252.81:8080/sessions/token`, options);
        if(token && !err) handleSuccess(token);
        if(err) setError(err);
    };

    const handleSuccess = (token) => {
        setModal(prevState =>({
            ...prevState,
            isOpen : false,
        }));
        login(username, token);
    };

    // Autocompletes the input fields when signing up
    useEffect( () => {
        if(modal.data){
            setUsername(modal.data.username);
            setPassword(modal.data.password);
        }
    }, [modal.data]);

    return (
            <StyledForm onSubmit={handleSubmit} className='sign-in-form'>    
                <div className="username form-group">
                    <label> 
                        Username
                        <input 
                            type="text"
                            className="form-control" 
                            placeholder="Username" 
                            required="required"
                            value={username}
                            onChange={ (e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div className='password form-group'>
                    <label>
                        Password
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            required="required"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="sign-in-button form-group">
                    <Button
                        text='Sign In'
                        className='modal-button'
                        disabled={!validateForm()}
                    />
                </div>     
            
            <SignUpLink className="sign-up-link form-group">
                <span>Not Registered? </span>
                <a href="#"
                    onClick={() => {
                        setModal( prevState =>({
                            ...prevState,
                            header : 'Create an Account',
                            form: 'signUp'
                        }));                        
                    }}
                >
                <span>Create an Account</span>
                </a>
            </SignUpLink>
            { error 
            ?   <div className="error"> {
                    error.message} 
                </div> 
            : null 
            }  
        </StyledForm>
    );
}

const SignUpLink = styled.div`
    text-align: center;
    a {
        color: var(--secondary);
        :hover {
            color: var(--hover-color);
        }
    }
`;


export default LoginForm;