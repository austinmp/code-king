import React from 'react';
import fetch from 'node-fetch';
import useAPIError from '../common/hooks/useAPIError';
import { APIErrorContext } from '../common/providers/APIErrorProvider';


async function useMakeRequest( {url, options} ) { 
    const { addError } = useAPIError();
    
    try {
        const response = await fetch(url, options);
        const body = await response.json();
        
        console.log(response);

        if(!response.ok){
            addError(response.statusText, response.status);
            console.log('response NOT ok');
            return;
        }
        console.log('response ok')
    } catch(err) { 
        console.log(err);
    }
}

export default MakeRequest;


    // fetch(url, options)
    // .then(response => {
    //     response.json()
    //     .then( body => {
    //         console.log('MAKE REQUEST GOT IT' + body)
    //         if(!response.ok){
    //             setErrorStatusCode(response.status);
    //             const errorMessage = body.message || response.statusText;
    //             console.log(errorMessage);
    //         }
    //         console.log('MAKE REQUEST GOT IT' + body)
    //         setApiData(body);
    //     })            
    // })