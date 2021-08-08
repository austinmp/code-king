import React, {useState, useEffect, useContext} from 'react';
import styled from "styled-components";
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';
import BasicPagination from '../components/BasicPagination';
import  useFetch from '../api/useFetch';
import { AuthContext } from '../context/AuthContext';



const CHALLENGES_PER_PAGE = 20;

const headers = [
    'Id',
    'Title',
    'Difficulty',
    'Status',
    'Date Created',
    'Highscores',
];

const ChallengeSet = () => {
    const {credentials, setCredentials} = useContext(AuthContext);
    const [numChallenges, setNumChallenges] = useState(0);
    const [page, setPage] = useState(1);
    const [challenges, setChallenges] = useState();
    const [submissions, setSubmissions] = useState();
    const fetchData = useFetch();

    const getSubmissionsById = (submissions) => {
        const test = submissions.reduce((obj, submission)=>{
            obj[submission.challengeId] = submission;
            return obj;
        }, {});

        console.log(test);
        return test;
    }

    useEffect( async () =>{
        const [challengeSet, loading, error] = await fetchData(`http://localhost:8080/challenges/getChallengeSet`);
        setChallenges(challengeSet.challenges);
        setNumChallenges(challengeSet.length);

        const [userSubmissions] = await fetchData(`http://localhost:8080/submission-history/getUserSubmissions?userName=${credentials.username}`);
        const submissionsById = getSubmissionsById(userSubmissions.userSubmissions);
        setSubmissions(submissionsById);
    }, [] );


    useEffect ( ()=> {


    })

    const paginateChallenges = () => {
        const start = (page-1)*CHALLENGES_PER_PAGE;
        const end = (page*CHALLENGES_PER_PAGE <= numChallenges) ? page*CHALLENGES_PER_PAGE : undefined;
        const currChallenges = challenges.slice(start, end);
        const challengeIds = currChallenges.map(challenge => challenge.id);
       return (
            currChallenges.map(challenge => (
                <tr key={challenge.name}
                    onClick={ (e) => {
                        e.preventDefault();
                        window.location.href=`/challenges/${challenge.name}/${challenge._id}`;
                    }}
                >
                    <td>{challenge.id}</td>
                    <td>{challenge.name} </td>
                    <td>{challenge.difficulty}</td> 
                    { submissions && submissions[challenge.id] && submissions[challenge.id].didAllTestsPass
                    ?  <td>Completed</td>
                    :  <td>Incomplete</td>
                    }
                    <td>{challenge.date}</td>
                    <td>Highscores</td>
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
        
    }

    tbody tr:hover{
        background:var(--hover-color);
        cursor: pointer;
    }

    td, th {
        text-align: center;
        padding-bottom: 1em;
        padding-top: 1em;
    }
`;

export default ChallengeSet;

