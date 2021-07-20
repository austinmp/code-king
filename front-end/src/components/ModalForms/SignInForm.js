import React, { useEffect, useState } from 'react';
import useAPI from '../../api/useAPI';

function LoginForm({modal, setModal, setCredentials}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ { data, error }, setUrl, setOptions] = useAPI();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const url = 'http://localhost:8080/sessions/token';

        const raw = JSON.stringify({
            userId: username,
            passId: password
        });

        const options = {
            method: 'POST',
            body : raw,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        setUrl(url);
        setOptions(options);
    };

    const validateForm = () => {
        return (username && password);
    }

    useEffect( () => {
        if(data && !error) {
            setModal(prevState =>({
                ...prevState,
                isOpen : false,
            }));

            setCredentials({
                username: username,
                token: data  
            });
        }
        console.log(data);

    }, [data])

    useEffect( () => {
        if(modal.data){
            setUsername(modal.data.username);
            setPassword(modal.data.password);
        }
    }, [modal.data]);

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>    
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control" 
                        placeholder="Username" 
                        required="required"
                        value={username}
                        onChange={ (e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        required="required"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
            <p className="text-center">Not registered? {' '}
                <a href="#"
                    onClick={() => {
                        setModal( prevState =>({
                            ...prevState,
                            header : 'Create an Account',
                            form: 'signUp'
                        }));                        
                    }}
                >Create an Account
                </a>
            </p>
            { error ? <div> {error.message} </div> : null }  
        </div>
    );
}

export default LoginForm;