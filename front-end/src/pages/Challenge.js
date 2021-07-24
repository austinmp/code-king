import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';
import useAPI from '../api/useAPI';
import CodeSandbox from '../components/CodeSandbox';
import Button from '../components/Button';
import { BsPlayFill } from 'react-icons/bs';
import { IoMdArrowRoundBack } from 'react-icons/io';


// All route props (match, location and history) are available to component 
function Challenge({token, ...rest}) {
    let history = useHistory();
    const { title, _id } = rest.match.params;
    const [submission, setSubmission] = useState('def submission:');
    // const [ { error, ...challenge }, setUrl, setOptions] = useAPI();
    const [challenge, setChallenge] = useState();
    console.log(token);
    const handleSubmit = (e) => {
        e.preventDefault();  
        // // POST 127.0.0.1:8000/submitSolution?challengeId=123&programmingLanguage=python3&challengeName=test%20challenge&userName=matt
        // const url = `http://localhost:8080/submission-testing/submitSolution?challengeId=${challenge.data.id}&programmingLanguage=python3&challengeName=${challenge.data.name}&userName=${rest.username}`;
        // const options = {
        //     method: 'POST',
        //     body : JSON.stringify(submission),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization' : 'Bearer ' + token
        //     }
        // }
        // setUrl(url);  
        // setOptions(options);
    };
    
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }   
        }
        fetch(`http://localhost:8080/challenges/getChallenge?_id=${_id}`, options)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setChallenge(data);
        })
        .catch(err => console.log(err));
      }, []);

    return (
            <PageContainer className='challenge-container'>
                <Header text={title}/>
                {challenge 
                ? <>
                    <Button     
                        text='Browse Challenges'
                        icon={<BackIcon/>} 
                        onClick={ () => history.push('/challenges')}
                    />
                    <div>ID: {challenge.id}</div>
                    <div>Difficulty: {challenge.difficulty}</div>
                    <div>Description: {challenge.description}</div>
                    <CodeSandbox 
                        submission={submission} 
                        setSubmission={setSubmission} 
                    />
                    <Button 
                        text='Submit'
                        icon={<SubmitIcon/>} 
                        onClick={handleSubmit}
                    />
                    <div>TestCases:</div>
                    {challenge.testCases.map(testCase => {
                        return(
                        <div>
                            <div>Input: {testCase.input}</div>
                            <div>Expected: {testCase.expectedOutput}</div>
                        </div>
                        )
                    })}
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

const BackIcon = styled(IoMdArrowRoundBack)`
    margin-right: 5px;
    text-align: center;
    align-self: center;
    width: 20px;
    height: auto;
`;

export default Challenge;