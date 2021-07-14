// import React from 'react';
// import fetch from 'node-fetch';
// import useAPIError from './useAPIError';

const useMakeRequest = ({url, options}) => {
    const { addError } = useAPIError();
    const [apiData, setApiData] = React.useState();


    React.useEffect( () => {
        fetch(url, options)
        .then(response => {
            response.json()
            .then( body => {
                console.log('MAKE REQUEST GOT IT' + body)
                if(!response.ok){
                    setErrorStatusCode(response.status);
                    const errorMessage = body.message || response.statusText;
                    console.log(errorMessage);
                }
                console.log('MAKE REQUEST GOT IT' + body)
                setApiData(body);
            })            
        })

        return {data: apiData};          
    }, [url]);

}

// export { useMakeRequest };