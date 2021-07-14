import React, { useEffect, useState} from 'react';
import fetch from 'node-fetch';

const useAPI = () => {
    const [url, setUrl] = useState();
    const [options, setOptions] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState();

    useEffect(() => {
        setError(null);

        if(!(url && options)) return;
        
        const fetchData = async () => {
            let message;
            let data;
            let status;
            try {
                const response = await fetch(url, options);
                status = response.status;
                try {
                    data = await response.clone().json();
                    message = data.message;
                } catch (err) {
                    data = await response.text();
                    message = response.statusText;
                }

                if(response.ok) {
                    return setFetchedData(data);
                }

                setError({
                    message: message,
                    status: status
                });

            } catch(err) { 
                console.log(err);
                setError({
                    message: message || 'An unexpected error occured',
                    status: status || 500
                })
            }
        }


        fetchData();
    }, [options]);    

    return [{ data: fetchedData, error: error}, setUrl, setOptions];
}

export default useAPI;
