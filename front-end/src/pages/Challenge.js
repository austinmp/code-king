import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import fetch from 'node-fetch';
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';
import useAPI from '../api/useAPI';
import CodeSandbox from '../components/CodeSandbox'

// All route props (match, location and history) are available to component 
function Challenge({token, ...rest}) {
    const [ { data, error }, setUrl, setOptions] = useAPI();
    const { title, _id } = rest.match.params;
    // const {challenge, setChallenge} = useState(
    //     {
    //         description: ''
    //         difficulty:
    //     }
    // )
    console.log(token);

    useEffect(() => {
        async function fetchMyAPI() {
            const url = `http://localhost:8080/challenges/getChallenge?_id=${_id}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }
            setUrl(url);
            setOptions(options);
        }
        fetchMyAPI();
      }, []);

    return (
        <PageContainer className='challenge-container'>
            <Header text={title}/>
            {data 
            ? <>
                <div>Difficulty: {data.difficulty}</div>
                <div>Description: {data.description}</div>
                <CodeSandbox/>
            </>       
            : null
            }
        </PageContainer>
    );
}

// Object.keys(data).map(item => (
//     <div>{data[item]}</div>
// ))


export default Challenge;