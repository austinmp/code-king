import fetch, {Headers} from 'node-fetch';
import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';


// To Do : if unauthorized status is returned , log user out.

const useFetch = (url, options) => {
    const { credentials, logout } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    let isError = false;
    let error;
    let message;    
    let status;
    let fetchedData;

    const getFetchOptions = (options) => {
        const myHeaders = new Headers({ ...(options && {...options.headers}) });
        if(!myHeaders.has('Authorization')) myHeaders.append('Authorization', 'Bearer ' + credentials.token);
        if(!myHeaders.has('Content-Type')) myHeaders.append('Content-Type', 'application/json');         
        const fetchOptions = {
            ...(options),
            ...(options && !options.method && {method: 'GET'}),
            headers: myHeaders
        }
        return fetchOptions;
    }

    const fetchData = async (url='', options={}) => {  
        try {
            const response = await fetch(url, getFetchOptions(options));
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
            console.log(err);
        }
        if(isError){
           error = {
                status : status,
                message: message
           }
        } 
        return [fetchedData, false, error];
    }

    return  fetchData;
}

export default useFetch;


