import React, {useEffect, useState} from 'react';
import base64 from 'base-64';
import Button from '../Button';
import StyledForm from './StyledForm';
import useFetch from '../../api/useFetch';
import { AuthContext } from '../../context/AuthContext';

/* signUp form controls the modal state by taking the user to the signIn modal after an account is created successfully. */

function SignUpForm({ modal, setModal }) {
    const fetchData = useFetch();
    const [error, setError] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState('');
    const [matchState, setMatchState] = useState('');
    const [state, setState] = useState({
        username: '',
        password: '',
        passwordRetype: '',
    });

    const validateForm = () => {
        return (isPasswordMatch && state.username);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const encodedCredentials = base64.encode(state.username + ":" + state.password);
        const options = {
            method: 'POST',
            headers: {
                'Authorization' : 'Basic ' + encodedCredentials
            }
        }
        const [credentials, loading, err] = await fetchData(`http://localhost:8080/account/signup` , options);
        if(credentials && !err) handleSuccess(credentials);
        if(err) setError(err);

    }

    const handleChange = (e) => {
        const value = e.target.value;
        setState( prevState =>({
            ...prevState,
            [e.target.name] : value 
        }));
    }

    // Redirect to the Sign In form with credentials set
    const handleSuccess = () => {
        setModal(prevState =>({
            ...prevState,
            isOpen : true,
            header: `Account created successfully!`,
            form: 'signIn',
            data: {
                username : state.username,
                password : state.password
            }
        }));
    };

    useEffect(() => {
        let isMatch = '';
        if(state.password || state.passwordRetype){
            isMatch = (state.password === state.passwordRetype ) ? true : false;
        }
        setIsPasswordMatch(isMatch);
        if (isMatch === false) {
            setMatchState('noMatch');  
        } else {
            setMatchState('');
        }
        
    }, [state.password, state.passwordRetype]);

    return (
        <StyledForm onSubmit={handleSubmit} className='sign-up-form'>
            <div className="username form-group">
                <label>
                    Username
                    <input 
                        type="text" 
                        name="username"
                        className="form-control" 
                        placeholder="Username" 
                        required="required"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="password form-group">
                <label>
                    Password
                    <input 
                        type="password" 
                        name="password"
                        className={'form-control ' + matchState}
                        placeholder="Password" 
                        required="required"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="password-retype form-group">
                <label>
                    Retype Password
                    <input 
                        type="password" 
                        name= "passwordRetype" 
                        className={'form-control ' + matchState}
                        placeholder="Retype Password" 
                        required="required"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="form-group">
                {(isPasswordMatch === false) 
                ?   <p name="passwordStatus" className='error'>
                        Passwords do not match.
                    </p> 
                : null  
                }
            </div>  
            <div className="form-group">
                <Button 
                    text='Create Account'
                    className="form-button"
                    disabled={!validateForm()}
                />
            </div>
            { error 
            ?   <div className="error"> {
                    error.message} 
                </div> 
            : null
            } 
        </StyledForm>
    );
}


export default SignUpForm;

