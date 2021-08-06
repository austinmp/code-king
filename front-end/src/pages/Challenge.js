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
import  useFetch from '../api/useFetch';

// All route props (match, location and history) are available to component 
function Challenge({...rest}) {
    let history = useHistory();
    const { title, _id } = rest.match.params;
    const [submission, setSubmission] = useState('def submission(*args):');
    const [submissionStatus, setSubmissionStatus] = useState('INCOMPLETE'); // WILL NEED TO PASS IN A STATE IF WE HAVE  SUBMITTED A CHALLENGE ALREADY
    const [language, setLanguage] = useState('python3');
    const [executionResults, setExecutionResults] = useState();
    const [output, setOutput] = useState();
    const [challenge, setChallenge] = useState();
    const fetchData = useFetch();

    useEffect( async () =>{
        const [challengeData, loading, error] = await fetchData(`http://localhost:8080/challenges/getChallenge?_id=${_id}`);
        setChallenge(challengeData);
    }, [] );

    const handleSubmit = async (e) => {
        e.preventDefault();  
        const options = {
            method: 'POST',
            body : submission,
            headers: {
                'Content-Type': 'text/plain',
            }   
        }
        const [result, loading, error] = await fetchData(`http://localhost:8080/submission-testing/submitSolution?challengeId=${challenge.id}&programmingLanguage=${language}&challengeName=${challenge.name}&userName=${rest.username}`, options);
        setSubmissionStatus(result.status);
        setExecutionResults(result.executionResults);
        // To do add error and loading handling

    };

    const renderExecutionResults = () => {
        console.log(executionResults);
        if(!executionResults || submissionStatus === 'INCOMPLETE') return null;
        
        switch(submissionStatus) {
            case 'PASSED':
                setOutput({output : `ALL TEST CASES PASSED SUCCESSFULLY! Execution time : ${executionResults.executionTime} ms`});
                break;
            case 'FAILED':
                const failedTestCase = executionResults.tests.find( ({ outcome }) => outcome === 'ERRORED' || outcome === 'FAILED');
                const isErrored = (failedTestCase.outcome === 'ERRORED');
                if (isErrored) {
                    setOutput({output : failedTestCase.output});
                } else {    
                    setOutput({...failedTestCase});
                }
        }
    }
    
    useEffect(() => {
        renderExecutionResults();
    }, [executionResults]);
   

    return (
            <PageContainer className='challenge-container'>
                <BackButton     
                        text='Browse Challenges'
                        icon={<BackIcon/>} 
                        onClick={ () => history.push('/challenges')}
                />
               
                <Header text={title}/>

                {! challenge
                ? <div>LOADING... </div>
                :                 
                
        <>
                    <Label >Status:      
                        <SubmissionStatus className={`${submissionStatus}`}>
                            {' ' + submissionStatus}
                        </SubmissionStatus>
                    </Label>
                    <Label>Difficulty: 
                        <Difficulty className={`${challenge.difficulty}`}>
                            {' ' +  challenge.difficulty.toUpperCase()}
                        </Difficulty>
                    </Label>
                
                    <Label>Challenge Id: {challenge.id}</Label>
                    
                    
                    <Label>Description: {challenge.description}</Label>
                    
                                     
                    <div>TestCases:</div>
                    {challenge.testCases.map( ( testCase, index ) => {
                        return(
                        <div key={index}>
                            <div>Input: {testCase.input}</div>
                            <div>Expected: {testCase.expectedOutput}</div>
                        </div>
                        )
                    })}
                    
            </>       
}
            
            <Label>Solution  
                <ProgrammingLanguageSelect>
                    <select name='language' onChange={(e)=> setLanguage(e.target.value)} required> 
                        <option value="python3">python3</option>
                        <option value="javascript" disabled>javascript</option>
                    </select>
                </ProgrammingLanguageSelect>
            </Label>    
            <CodeSandbox 
                submission={submission} 
                setSubmission={setSubmission} 
            />
            <Label>Output</Label>
            <Output>
                {! output ? null 
                : Object.keys(output).map(key => {
                        return <p>{`${key} : ${output[key]}`} </p>
                    } )
                }
            </Output>
            <Button 
                text='Submit'
                icon={<SubmitIcon/>} 
                onClick={handleSubmit}
            />
        </PageContainer>
    );
}

const Label = styled.label`
    width: 100%;
    margin: 0;
    padding: 0;
    align-self: flex-start;
`;

const SubmissionStatus = styled.span`
    &.PASSED {
        color : #4CAF55;
    }

    &.FAILED {
        color : #e85e6c;
    }

    &.INCOMPLETE {
        color: #ffcc00;
    }
`;

const Difficulty = styled.span`
    &.Easy {
        color : #4CAF55;
    }

    &.Medium {
        color : #e85e6c;
    }

    &.Hard {
        color: #e85e6c;
    }
`;

const ProgrammingLanguageSelect = styled.span`
    float:right;
`;

const Output = styled.div`
    margin: 0px 0px 40px 0px;
    background: #272822;
    width: 100%;
    height: 200px;
    font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    color: rgb(235, 38, 88);
`;

const BackButton = styled(Button)`
    align-self: flex-start;
    margin-top: 40px;
`

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




// const handleSubmit = (e) => {
//     e.preventDefault();  
//     const options = {
//         method: 'POST',
//         body : submission,
//         headers: {
//             'Content-Type': 'text/plain',
//         }   
//     }
//     fetch(`http://localhost:8080/submission-testing/submitSolution?challengeId=${challenge.id}&programmingLanguage=${language}&challengeName=${challenge.name}&userName=${rest.username}`, options)
//     .then(response => response.json())
//     // .then(response => response.text())
//     .then(result => {
//         console.log(result.status);
//         setSubmissionStatus(result.status);
//         setExecutionResults(result.executionResults.tests);
//         // setSubmissionStatus(result.status);
//     })
//     .catch(error => console.log('error', error))
// };