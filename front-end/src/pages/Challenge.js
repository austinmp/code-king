import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import PageContainer from '../components/PageContainer';
import ContentCard from '../components/ContentCard';
import CodeSandbox from '../components/CodeSandbox';
import Button from '../components/Button';
import { BsPlayFill } from 'react-icons/bs';
import  useFetch from '../api/useFetch';
import BackButton from '../components/BackButton'


// All route props (match, location and history) are available to component 
function Challenge({...rest}) {
    const { title, _id } = rest.match.params;
    const [submission, setSubmission] = useState('def submission(*args):');
    const [submissionStatus, setSubmissionStatus] = useState('INCOMPLETE'); // WILL NEED TO PASS IN A STATE IF WE HAVE  SUBMITTED A CHALLENGE ALREADY
    const [language, setLanguage] = useState('python3');
    const [executionResults, setExecutionResults] = useState();
    const [output, setOutput] = useState();
    const [challenge, setChallenge] = useState();
    const fetchData = useFetch();

    useEffect( async () =>{
        const [challengeData, loading, error] = await fetchData(`http://164.90.252.81:8080/challenges/getChallenge?_id=${_id}`);
        const d = new Date(challengeData.date);
        d.toLocaleDateString('en-US')
        console.log(d.toLocaleDateString('en-US'));
        // console.log(challengeData.date.toDateString());
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
        const [result, loading, error] = await fetchData(`http://164.90.252.81:8080/submission-testing/submitSolution?challengeId=${challenge.id}&programmingLanguage=${language}&challengeName=${challenge.name}&userName=${rest.username}`, options);
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
        <PageContainer className='challenge-container' header={title}>
                <BackButton />
                <ContentCard>
                    {! challenge
                    ? <div>LOADING... </div>
                    :<>  
                        <ChallengeDetailsTopRow>
                            <div> 
                                <Label>Challenge Id: {challenge.id}</Label> 
                            </div>  
                            <div>       
                                <Label >Status:      
                                    <span className={submissionStatus.toLowerCase()}>
                                        {' ' + submissionStatus}
                                    </span>
                                </Label>
                            </div>  
                            <div>  
                                <Label>Difficulty: 
                                    <span className={challenge.difficulty.toLowerCase()}>
                                        {' ' +  challenge.difficulty.toUpperCase()}
                                    </span>
                                </Label>
                            </div>  
                        </ChallengeDetailsTopRow>
                        <Label>Description: {challenge.description}</Label>
                    </>
                    }
                </ContentCard>    
                
                
                    {/* <div>TestCases:</div>
                    {challenge.testCases.map( ( testCase, index ) => {
                        return(
                        <div key={index}>
                            <div>Input: {testCase.input}</div>
                            <div>Expected: {testCase.expectedOutput}</div>
                        </div>
                        )
                    })}
                    
            </>       
} */}
        <ContentCard>
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
        </ContentCard>

        <Button 
            text='Submit'
            icon={<SubmitIcon/>} 
            onClick={handleSubmit}
        />
        <ContentCard>
            <Label>Output</Label>
            <Output>
                {! output ? null 
                : Object.keys(output).map(key => {
                        return <p>{`${key} : ${output[key]}`} </p>
                    } )
                }
            </Output>
        </ContentCard>
        </PageContainer>
    );
}

const Label = styled.label`
    width: 100%;
    margin: 0;
    padding: 0;
    align-self: flex-start;
`;


const ChallengeDetailsTopRow = styled.div`
    display: flex; 
    flex-direction: row;
    justify-content: space-between;

    width: 100%;

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



const SubmitIcon = styled(BsPlayFill)`
    margin-right: 5px;
    text-align: center;
    width: 20px;
    height: auto;
`;

export default Challenge;
