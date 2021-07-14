import base64 from 'base-64';
import fetch from 'node-fetch';
import MakeRequest from './MakeRequest';

async function signUp(username, password) {
    const credentials = base64.encode(username + ":" + password);
    const options = {
        method: 'POST',
        headers: {
            'Authorization' : 'Basic ' + credentials
        },
    }
    try {
        const response = MakeRequest({
            url: 'http://localhost:8080/signup',
            options: options
        })
        // const response = await MakeRequest('http://localhost:8080/signup', options);
        // console.log(response);
        // const body = await response.json();
        // if(!response.ok){
        //     const msg = body.message || response.statusText;
        //     console.log(response.status);
        // }


        // console.log(bod.status);
    
        // console.log(JSON.parse(response.body.body));

        // const data = await response.json();
        // console.log(response.status);
        // console.log(response.statusText);
        // if(!response.ok){
        //     const body = await response.json();
        //     throw new Error(body.message);
        // }
        // return data;
    } catch(err) {
        console.log(err);
    }
}

function test(){
    console.log('yes');
}

export {signUp, test}