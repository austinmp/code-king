import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';
import useAPI from '../api/useAPI';
import CodeSandbox from '../components/CodeSandbox';
import Button from '../components/Button';
import { BsPlayFill } from 'react-icons/bs';

// All route props (match, location and history) are available to component 
function Challenge({token, ...rest}) {
    const { title, _id } = rest.match.params;
    const [submission, setSubmission] = useState('def submission:');
    const [ { error, ...challenge }, setUrl, setOptions] = useAPI();
    console.log(rest.username);
    console.log(rest);
    console.log(challenge);
    console.log(token);
    const handleSubmit = (e) => {
        e.preventDefault();  
        // POST 127.0.0.1:8000/submitSolution?challengeId=123&programmingLanguage=python3&challengeName=test%20challenge&userName=matt
        const url = `http://localhost:8080/submission-testing/submitSolution?challengeId=${challenge.data.id}&programmingLanguage=python3&challengeName=${challenge.data.name}&userName=${rest.username}`;
        const options = {
            method: 'POST',
            body : JSON.stringify(submission),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        }
        setUrl(url);  
        setOptions(options);
    };
    
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
                {challenge.data 
                ? <>
                    <div>Difficulty: {challenge.data.difficulty}</div>
                    <div>Description: {challenge.data.description}</div>
                    <CodeSandbox 
                        submission={submission} 
                        setSubmission={setSubmission} 
                    />
                    <Button 
                        text='Submit'
                        icon={<SubmitIcon/>} 
                        onClick={handleSubmit}
                    />

            </>       
            : null
            }
        </PageContainer>
    );
}

const SubmitIcon = styled(BsPlayFill)`
    margin-right: 5px;
    text-align: center;
    width: 20px;
    height: auto;
`;



export default Challenge;