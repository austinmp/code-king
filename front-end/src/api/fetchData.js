import fetch from 'node-fetch';
import React, {useContext, useEffect} from 'react';
import { AuthContext } from '../context/AuthContext';


// To Do : if unauthorized status is returned , log user out.

const fetchData = async(url, options) => {
    const [credentials, setCredentials] = useContext(AuthContext);
    let isError = false;
    let message;
    let data;
    let status;
    try {
        const response = await fetch(url, options);
        status = response.status;

        try {
            data = await response.clone().json();  // .json() will consume response object, so we make a copy 
            message = data.message;
        } catch (err) {
            data = await response.text();
            message = response.statusText;
        }

        if(!response.ok){
           isError = true;
        }

    } catch(err) { 
        isError = true;
        message = message || 'An unexpected error occured';   
        status = status || 500;
    }

    if(isError){
        const fetchedData = {
            data: data,
            error: {
                status : status,
                message: message
            }
        }
        return fetchedData;
    }  

    return {data: data}
}

export default fetchData;



