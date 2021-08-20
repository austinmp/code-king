import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import styled from "styled-components";
import PageContainer from '../components/PageContainer';
import ContentCard from '../components/ContentCard';
import CodeSandbox from '../components/CodeSandbox';
import Button from '../components/Button';
import  useFetch from '../api/useFetch';
import BackButton from '../components/BackButton';

//icons
import { BsPlayFill } from 'react-icons/bs';
import { IoMdArrowRoundForward } from 'react-icons/io';

// All route props (match, location and history) are available to component 
function Challenge({ location, match }) {
    let history = useHistory();
    const { title, challengeId } = match.params;
    const [challenge, setChallenge] = useState();
    const { credentials } = useContext(AuthContext);
    const [submission, setSubmission] = useState('def submission(*args):');
    const [submissionStatus, setSubmissionStatus] = useState('INCOMPLETE'); 
    const [language, setLanguage] = useState('python3');
    const [executionResults, setExecutionResults] = useState();
    const [output, setOutput] = useState();
    const [error, setError] = useState();
    const fetchData = useFetch();

   // ChallengeSet page will pass in a submission, if it exists, through state prop
    useEffect( async () => {
        if(location.state.submission) {
            const status = location.state.submission.didAllTestsPass ? 'COMPLETED' : 'INCOMPLETE'
            setSubmissionStatus(status);
            setSubmission(location.state.submission.code); 
        }
        if(location.state.challenge){
            setChallenge(location.state.challenge);
        } else {
            const [challengeData, loading, error] = await fetchData(`http://${process.env.REACT_APP_HOST}:8080/challenges/getChallenge?challengeId=${challengeId}`);
            setChallenge(challengeData); 
        }
    }, [] );

    const handleSubmit = async (e) => {
        console.log(submission);
        e.preventDefault();  
        const options = {
            method: 'POST',
            body : submission,
            headers: {
                'Content-Type': 'text/plain',
            }   
        }
        const [result, loading, err] = await fetchData(`http://${process.env.REACT_APP_HOST}:8080/submission-testing/submitSolution?challengeId=${challenge.id}&programmingLanguage=${language}&challengeName=${challenge.name}&userName=${credentials.username}`, options);
        if(result && !err) {
            setSubmissionStatus(result.status);
            setExecutionResults(result.executionResults);
        }
        if(err){
            console.log(err);
        }
        
        // To do add error and loading handling
    };

    const renderExecutionResults = () => {
        if(!executionResults || submissionStatus === 'INCOMPLETE') return null;
        
        switch(submissionStatus) {
            case 'PASSED':
                setOutput({
                    status : 'passed',
                    output : `Challenge completed successfully! All test cases passed! Execution time : ${executionResults.executionTime} ms `,
                });
                break;
            case 'FAILED':
                const failedTestCase = executionResults.tests.find( ({ outcome }) => outcome === 'ERRORED' || outcome === 'FAILED');
                const isErrored = (failedTestCase.outcome === 'ERRORED');
                if (isErrored) {
                    setOutput({
                        status: 'error',
                        output : failedTestCase.output,
                    });
                } else {    
                    setOutput({
                        status: 'failed',
                        ...failedTestCase                       
                    });
                }
        }
    }
    
    useEffect(() => {
        renderExecutionResults();
    }, [executionResults]);
   

    return (
        <PageContainer className='challenge-container' header={title}>
            <ButtonDiv>
                <BackButton/>
                <Button 
                    text={'Edit Challenge'} 
                    icon={<ForwardIcon/>}
                    iconPosition={'right'}
                    onClick={ () => 
                        history.push({
                            pathname: `/editChallenge/${challenge.id}`, 
                            state: { challenge: challenge }
                        })
                    }
                />
            </ButtonDiv>
            <ContentCard>
                {! challenge
                ? error
                    ?  <div>{error}</div>
                    : <div>Loading... </div>
                :   <>  
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
                        <Description>
                            <Label>Description:</Label> <span>{challenge.description}</span>
                        </Description>
                    </>
                }
            </ContentCard>    
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
            <SubmitButton 
                text='Run Code'
                icon={<SubmitIcon/>} 
                onClick={handleSubmit}
            />
            <ContentCard>
                <Label>Output</Label>
                <Output>
                    {! output 
                    ? null 
                    : Object.keys(output).map(key => {
                            return <p className={output.status}>{`${key} : ${output[key]}`} </p>
                        })
                    }
                </Output>
            </ContentCard>
        </PageContainer>
    );
}

const Description = styled.div`
    width: 100%;
`

const SubmitButton = styled(Button)`
    width: 200px;
    align-self: center;
`;

const ButtonDiv = styled.div`
    display flex;
    width: 100%;
    justify-content: space-between;
`;

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
    min-height: 200px;
    overflow: auto;
    height: auto;
    font-size: 20px;
    // font: 20px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    color: rgb(235, 38, 88);
`;

const SubmitIcon = styled(BsPlayFill)`
    margin-right: 5px;
    text-align: center;
    width: 20px;
    height: auto;
`;



const ForwardIcon = styled(IoMdArrowRoundForward)`
    margin-left: 10px;
    text-align: center;
    align-self: center;
    width: 20px;
    height: auto;
`;




export default Challenge;
