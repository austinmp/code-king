import fetch, {Headers} from 'node-fetch';
import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';


// To Do : if unauthorized status is returned , log user out.

const useFetch = (url = '', options) => {
    const { credentials, logout } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    let isError = false;
    let message;    
    let status;
    let fetchedData;

    const fetchData = async () => {
        const myHeaders = new Headers({
            ...options.headers,
            'Authorization': 'Bearer ' + credentials.token,
        });
        const fetchOptions = {
            ...options,
            headers: myHeaders
        }

        try {
            const response = await fetch(url, fetchOptions);
            status = response.status;
            if(status === 401) logout();
            try {
                fetchedData = await response.clone().json();  // .json() will consume response object, so we make a copy 
                message = fetchedData.message;
                
            } catch (err) {
                fetchedData = await response.text();
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
            setError({
                status : status,
                message: message
            });
        } 
        setData(fetchedData); 
        setLoading(false);
    }

    useEffect( () => {
        fetchData();
    }, [url]);

    return [data, loading, error, ];
}

export default useFetch;


