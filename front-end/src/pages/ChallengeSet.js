import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import fetch from 'node-fetch';
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';
import { Link } from "react-router-dom";
import useAPI from '../api/useAPI';


const headers = [
    'Id',
    'Title',
    'Difficulty',
    'Status',
    'Date Created',
    'Highscores',
];

function ChallengeSet({ token} ){
    const [ { data, error }, setUrl, setOptions] = useAPI();
    const [challenges, setChallenges] = useState([]);
    useEffect(() => {
        async function fetchMyAPI() {
            const url = 'http://localhost:8080/challenges/getChallengeSet';
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

        if(data && !error){
            console.log(data);
            setChallenges(data);
        }

        fetchMyAPI();
        
      }, []);

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
                    {!data ? null :
                        data.challenges.map(challenge => (
                            <tr key={challenge.id}
                                onClick={ (e) => {
                                    e.preventDefault();
                                    console.log(challenge);
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
                    ))}
                </tbody>
            </Table>
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