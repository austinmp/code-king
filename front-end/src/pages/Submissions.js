import React, {useState, useEffect, useContext} from 'react';
import styled from "styled-components";
import PageContainer from '../components/PageContainer';
import  useFetch from '../api/useFetch';
import Challenge from './Challenge';
import { useHistory } from "react-router-dom";



const headers = [
    'Date Submitted',
    'Title',
    'Language',
    'Execution Time',
    'Status',
];


const Submissions = ({ match }) => {
    let history = useHistory();
    const fetchData = useFetch();
    const { username } = match.params;
    const [error, setError] = useState();
    const [submissions, setSubmissions] = useState();


    useEffect( async () => { 
        const [userSubmissions, loading, err] = await fetchData(`http://localhost:8080/submission-history/getUserSubmissions?userName=${username}`);
        if(userSubmissions && !err) setSubmissions(userSubmissions.userSubmissions);
        if(err) setError(err);

    }, []);

    const paginateSubmissions = () => {
        console.log(submissions[0]);
        return (
            submissions.map(submission => (
                <tr 
                    key={submission.challengeId}
                    onClick={ (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/challenges/${submission.challengeName}/${submission.challengeId}`, 
                            state: { submission: submission }
                        });
                        
                            
                        //     state: submission
                        //    }}>
                        // // window.location.href=`/challenges/${submission.challengeName}/${submission.challengeId}`;
                    }} 
                >
                    <td>{new Date(submission.dateSubmitted).toLocaleDateString('en-US')}</td>
                    <td>{submission.challengeName}</td>
                    <td>{submission.programmingLanguage}</td>
                    <td>{submission.executionTime + 'ms'}</td>
                    { submission.didAllTestsPass
                    ?  <td className='success'>Completed</td>
                    :  <td className='error'>Incomplete</td>
                    }
                </tr>
            ))


        )


    }

    return (
        <PageContainer className='submissions-container' header={`${username}'s Submissions`}>
            <Table>
                <thead>
                    <tr>
                        {headers.map(header =>  <th key={header}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    { !submissions
                    ?   null 
                    :   paginateSubmissions()
                    }
                </tbody>
            </Table>
            { error 
            ?   <div className="error"> {
                    error.message} 
                </div> 
            : null
            } 
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

export default Submissions;