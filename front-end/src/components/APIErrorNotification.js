import React from 'react';
import useAPIError from '../common/hooks/useAPIError';

function APIErrorNotification({ toggleModal, setModalHeaderText, children }) {
    const { error, removeError } = useAPIError();

    const handleSubmit = () => {
        removeError();
    };

    
    return (
      (error) ? <div><p>WE GOT AN ERROR</p></div> : <div> {children} </div>
    )
}   

export default APIErrorNotification;

// THis should trigger if the context changes