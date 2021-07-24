import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import fetch from 'node-fetch';
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';
import { Link } from "react-router-dom";
import useAPI from '../api/useAPI';
import BasicPagination from '../components/BasicPagination';

const CHALLENGES_PER_PAGE = 20;

const headers = [
    'Id',
    'Title',
    'Difficulty',
    'Status',
    'Date Created',
    'Highscores',
];

function ChallengeSet({ token }){
    const [challenges, setChallenges] = useState();
    const [numChallenges, setNumChallenges] = useState(0);
    const [page, setPage] = useState(1);
    
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

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }
        fetch(`http://localhost:8080/challenges/getChallengeSet`, options)
        .then(response => response.json())
        .then(data => {
            setChallenges(data.challenges);
            setNumChallenges(data.challenges.length);

        })
        .catch(err => console.log(err));
 
      }, []);

    useEffect( () => {
        if(challenges) {
            paginateChallenges();
        }      
    }, [page]);

    

    

    return (
        <PageContainer className='challenges-container'>
            <Header text="Solve a Challenge"/>
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
        background: #20232a;
    }

    tbody tr:hover{
        background:#6568F4;
        cursor: pointer;
    }

    td, th {
        text-align: center;
        padding-bottom: 1em;
        padding-top: 1em;
    }
`;

export default ChallengeSet;



// <tbody>
//                     {!data ? null :
//                         data.challenges.map(challenge => (
//                             <tr key={challenge.id}
//                                 onClick={ (e) => {
//                                     e.preventDefault();
//                                     window.location.href=`/challenges/${challenge.name}/${challenge._id}`;
//                                 }}
//                             >
//                                 <td>{challenge.id}</td>
//                                 <td>{challenge.name} </td>
//                                 <td>{challenge.difficulty}</td> 
//                                 <td>Incomplete</td>
//                                 <td>{challenge.date}</td>
//                                 <td>Highscores</td>
//                             </tr>
//                     ))}
//                 </tbody>