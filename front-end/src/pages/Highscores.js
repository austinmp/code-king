import React, {useState, useEffect, useContext} from 'react';
import styled from "styled-components";
import PageContainer from '../components/PageContainer';
import ContentCard from '../components/ContentCard';
import useFetch from '../api/useFetch';
import BackButton from '../components/BackButton';
import Table from '../components/Table';

const headers = [
    'Username',
    'Execution Time',
    'Programming Language',
    'Date Submitted',
];

const Highscores = ({history, location, match}) => {
    const { challengeId } = match.params;
    const [highscores, setHighscores] = useState();
    const [challenge, setChallenge] = useState(location.state.challenge);
    const fetchData = useFetch();
    
    useEffect( async () =>{
        const [highscoresData, loading, error] = await fetchData(`http://localhost:8080/submission-history/getChallengeHighscores?challengeId=${challengeId}`);
        setHighscores(highscoresData.highscores);
    }, [] );

    const renderHighscores = () => {
       return (
            highscores.map(submission => (
                <tr key={submission.userName}>
                    <td>{submission.userName}</td>
                    <td>{submission.executionTime + ' ms'}</td>
                    <td>{submission.programmingLanguage}</td>
                    <td>{new Date(submission.dateSubmitted).toLocaleDateString('en-US')}</td>
                </tr>
            ))
        );
    }

    return (
        <PageContainer className='highscores-container' header={'Highscores'}>
            <BackButton />
            <ContentCard>
                {!challenge
                ? <div>Loading... </div>
                :<>  
                    <ChallengeDetailsTopRow>
                        <div> 
                            <Label>Challenge Id: {challenge.id}</Label> 
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
            <ContentCard>  
                <Table>
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th key={header}>{header}</th>
                            ))}
        
                        </tr>
                    </thead>
                    <tbody>
                        {!highscores
                        ? <div>Loading... </div> 
                        : renderHighscores()
                        }
                    </tbody>
                </Table>
            </ContentCard>  
        </PageContainer>
    );
}

const ChallengeDetailsTopRow = styled.div`
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const Label = styled.label`
    width: 100%;
    margin: 0;
    padding: 0;
    align-self: flex-start;
`;

export default Highscores;

