import React, {useState, useEffect, useContext} from 'react';
import styled from "styled-components";
import PageContainer from '../components/PageContainer';
import BasicPagination from '../components/BasicPagination';
import  useFetch from '../api/useFetch';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import { useHistory } from "react-router-dom";

const CHALLENGES_PER_PAGE = 10;
const headers = [
    'Id',
    'Title',
    'Difficulty',
    'Date Created',
    'Status',
    'Highscores',
];

const ChallengeSet = () => {
    let history = useHistory();
    const {credentials, setCredentials} = useContext(AuthContext);
    const [numChallenges, setNumChallenges] = useState(0);
    const [page, setPage] = useState(1);
    const [challenges, setChallenges] = useState();
    const [submissions, setSubmissions] = useState();
    const [error, setError] = useState();
    const fetchData = useFetch();

    // create key : value mapping (key = challengeId : value = submission object) for easier/faster data retrieval during pagination.
    const getSubmissionsById = (submissions) => {
        const challengeIdMap = submissions.reduce((obj, submission)=>{
            obj[submission.challengeId] = submission;
            return obj;
        }, {});
        return challengeIdMap;
    }

    useEffect( async () => {
        const [challengeSet, loading, error] = await fetchData(`http://localhost:8080/challenges/getChallengeSet`);
        if(challengeSet){
            setChallenges(challengeSet.challenges);
            setNumChallenges(challengeSet.challenges.length);  
        }
              
    }, [] );

    useEffect( async () => {
        const [userSubmissions, loading,  err] = await fetchData(`http://localhost:8080/submission-history/getUserSubmissions?userName=${credentials.username}`);
        if(userSubmissions && !err) {
            const submissionsById = getSubmissionsById(userSubmissions.userSubmissions);
            setSubmissions(submissionsById);
        }
        if(err){
            setError(err);
            console.log(err);
        }  
    }, [] );

    const paginateChallenges = () => {
        const start = (page-1)*CHALLENGES_PER_PAGE;
        const end = (page*CHALLENGES_PER_PAGE <= numChallenges) ? page*CHALLENGES_PER_PAGE : undefined;
        const currChallenges = challenges.slice(start, end);
        return (
            currChallenges.map(challenge => (
                <tr key={challenge.name}
                    onClick={ (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/challenges/${challenge.name}/${challenge.id}`, 
                            state: { 
                                challenge : challenge,
                                submission : submissions[challenge.id]
                            }
                        });
                        e.stopPropagation();
                    }}
                >
                    <td>{challenge.id}</td>
                    <td>{challenge.name} </td>
                    <td className={challenge.difficulty.toLowerCase()}>{challenge.difficulty}</td> 
                    <td>{new Date(challenge.date).toLocaleDateString('en-US')}</td>
                    { submissions && submissions[challenge.id] && submissions[challenge.id].didAllTestsPass
                    ?  <td className='success'>Completed</td>
                    :  <td className='error'>Incomplete</td>
                    }
                    <td className='highscores'> 
                        <Button className='highscores' text="Highscores"
                        onClick={ (e) => {
                            e.preventDefault();
                            history.push({
                                pathname: `/highscores/${challenge.id}`, 
                                state: { 
                                    challenge : challenge,
                                }
                            });
                            e.stopPropagation();
                        }}

                        
                        />
                    </td>
                </tr>
            ))
        );
    }

    return (
        <PageContainer className='challenges-container' header={'Solve A Challenge'}>
            <Table>
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!challenges
                    ? null 
                    : paginateChallenges()
                    }
                </tbody>
            </Table>
            <BasicPagination pageCount={Math.ceil(numChallenges / CHALLENGES_PER_PAGE)} setPage={setPage} />
            
        </PageContainer>
    );
}

const Table = styled.table`
    width:100%;
    border-collapse:collapse; 
    thead {
        background: var(--title-primary);
        color: white;
        
    };

    tbody  tr:hover :not(.highscores) {
            background:var(--hover-color);
            cursor: pointer;
    }

    td, th {
        text-align: center;
        padding-bottom: 1em;
        padding-top: 1em;
    };

`;

export default ChallengeSet;

