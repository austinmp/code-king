import React, {useState, useEffect, useContext} from 'react';
import PageContainer from '../components/PageContainer';
import  useFetch from '../api/useFetch';
import { useHistory } from "react-router-dom";
import BasicPagination from '../components/BasicPagination';
import Table from '../components/Table';

const SUBMISSIONS_PER_PAGE = 10;
const headers = [
    'Date Submitted',
    'Title',
    'Language',
    'Execution Time',
    'Status',
];

const Submissions = ({ match }) => {
    let history = useHistory();
    const { username } = match.params;
    const [error, setError] = useState();
    const [submissions, setSubmissions] = useState();
    const [numSubmissions, setNumSubmissions] = useState(0);
    const [page, setPage] = useState(1);
    const fetchData = useFetch();

    useEffect( async () => { 
        const [userSubmissions, loading, err] = await fetchData(`http://localhost:8080/submission-history/getUserSubmissions?userName=${username}`);
        if(userSubmissions && !err){
            setSubmissions(userSubmissions.userSubmissions);
            setNumSubmissions(userSubmissions.userSubmissions.length);
        } 
        
        if(err) setError(err);

    }, []);

    const paginateSubmissions = () => {
        const start = (page-1)*SUBMISSIONS_PER_PAGE;
        const end = (page*SUBMISSIONS_PER_PAGE <= numSubmissions) ? page*SUBMISSIONS_PER_PAGE : undefined;
        const currSubmissions = submissions.slice(start, end);
        return (
            currSubmissions.map(submission => (
                <tr 
                    key={submission.challengeId}
                    onClick={ (e) => {
                        e.preventDefault();
                        history.push({
                            pathname: `/challenges/${submission.challengeName}/${submission.challengeId}`, 
                            state: { submission: submission }
                        });
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
            <BasicPagination pageCount={Math.ceil(numSubmissions / SUBMISSIONS_PER_PAGE)} setPage={setPage} />
        </PageContainer>
    );
}

export default Submissions;