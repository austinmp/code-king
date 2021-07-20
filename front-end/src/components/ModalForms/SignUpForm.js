import React, {useEffect, useState} from 'react';
import './Form.css';
import base64 from 'base-64';
import useAPI from '../../api/useAPI';

/* signUp form controls the modal state by taking the user to the signIn modal after an account is created successfully. */

function SignUpForm({ modal, setModal }) {
    const [ { data, error }, setUrl, setOptions] = useAPI();
    const [isPasswordMatch, setIsPasswordMatch] = useState('');
    const [state, setState] = useState({
        username: '',
        password: '',
        passwordRetype: '',
    });

    const validateForm = () => {
        return (isPasswordMatch && state.username);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = base64.encode(state.username + ":" + state.password);
        const url = 'http://localhost:8080/account/signup';
        const options = {
            method: 'POST',
            headers: {
                'Authorization' : 'Basic ' + credentials
            }
        }
        setUrl(url);
        setOptions(options);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setState( prevState =>({
            ...prevState,
            [e.target.name] : value 
        }));
    }

    useEffect(() => {
        let currMatchState= '';
        if(state.password || state.passwordRetype){
            currMatchState = (state.password === state.passwordRetype ) ? true : false;
        }
        setIsPasswordMatch(currMatchState);

        const handleAccountCreated = () => {
            if(data && !error){
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
            }
        }
        handleAccountCreated();
    });

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>    
                <div className="form-group">
                    <input 
                        type="text" 
                        name="username"
                        className="form-control" 
                        placeholder="Username" 
                        required="required"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password"
                        className={'form-control ' + isPasswordMatch}
                        placeholder="Password" 
                        required="required"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name= "passwordRetype" 
                        className={'form-control ' + isPasswordMatch}
                        placeholder="Retype Password" 
                        required="required"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    {(isPasswordMatch === false) ? <p name="passwordStatus" className='passwordStatus'>Passwords do not match.</p> : null  }
                </div>  
                <div className="form-group">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        disabled={!validateForm()}
                    >Log in
                    </button>
                </div>
            </form>
            { error ? <div> {error.message} </div> : null }  
        </div>
    );
}

export default SignUpForm;

