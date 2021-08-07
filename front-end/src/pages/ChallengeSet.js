import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';
import BasicPagination from '../components/BasicPagination';
import  useFetch from '../api/useFetch';

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
    const [numChallenges, setNumChallenges] = useState(0);
    const [page, setPage] = useState(1);
    const [challenges, setChallenges] = useState();
    const fetchData = useFetch();

    useEffect( async () =>{
        const [challengeSet, loading, error] = await fetchData(`http://localhost:8080/challenges/getChallengeSet`);
        setChallenges(challengeSet.challenges);
        setNumChallenges(challengeSet.length);
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
                        window.location.href=`/challenges/${challenge.name}/${challenge._id}`;
                    }}
                >
                    <td>{challenge.id}</td>
                    <td>{challenge.name} </td>
                    <td>{challenge.difficulty}</td> 
                    <td>Incomplete</td>
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

