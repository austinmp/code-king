import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import useFetch from '../api/useFetch';
import BackButton from '../components/BackButton';
import StyledForm from '../components/Forms/StyledForm';
import { device } from '../common/breakpoints';
import ContentCard from '../components/ContentCard';
import TestCaseHowTo from '../components/TestCaseHowTo';


// icons
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';

function CreateChallenge({ setModal }) {
  let history = useHistory();
  const fetchData = useFetch();

  const testCase = {
    input: "[]",
    expectedOutput:"",
    inputError:false,
    expectedOutputError:false
  }

  const [testCases, setTestCases] = useState([testCase]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    difficulty: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setForm( prevState => ({
        ...prevState,
        [e.target.name] : value
    }));
  };

  const handleTestCaseChange = (e, index) => {
    let testCaseCopy = [...testCases];
    testCaseCopy[index][e.target.name] = e.target.value;
    setTestCases(testCaseCopy);
  };

  const addTestCase = (e) => {
    e.preventDefault();
    setTestCases(prevState => [...prevState, testCase]);
  }

  const removeTestCase = (e, index) => {
    e.preventDefault();
    let testCaseCopy = [...testCases];
    testCaseCopy.splice(index, 1);
    setTestCases(testCaseCopy);
  }

  const handleSubmit = async (e, i) => {
    e.preventDefault();
    if( !(isValidTestCases()) || testCases.length === 0 ) return;
    const body = {
      ...form,
      testCases: testCases
    }
    const options = {
      method: 'POST',
      body : JSON.stringify(body),
    }
    const [response, loading, error]  = await fetchData('http://localhost:8080/challenges/createChallenge', options);
    if(error) handleError(error)
    if(response && !error) handleSuccess(response);
  };
  
  const isValidTestCases = () => {
    const keys = ['input']
    let isAllValid = true;
    let isError = true;
    testCases.map( (test, index) => {
      keys.forEach( key => {
        try {
          let testCase = JSON.parse(testCases[index][key]);
          if(!(testCase instanceof Array)){
            throw new Error('Test cases must be wrapped in an array.')
          } 
          isError = false;
        } catch(err) {
          isAllValid = false;
          isError= true;
        }
        let testCaseCopy = [...testCases];
        testCaseCopy[index][key + 'Error'] = isError;
        setTestCases(testCaseCopy);
      });
     });
     return isAllValid;
  }

  const handleError = (error) => {
      console.log(error);
      setModal(prevState =>({
          ...prevState,
          isOpen : true,
          form: 'message',
          data: error.message,
          header: '',
          icon : 'error'
      }));
  }

  const handleSuccess = (response) => {
    const newChallenge = response._doc;
    setModal(prevState =>({
      ...prevState,
      isOpen : true,
      form: 'message',
      data: 'Challenge created successfully!',
      header: '',
      icon : 'success'
    }));
    
    history.push({
      pathname: `/challenges/${newChallenge.name}/${newChallenge._id}`, 
      state: { 
          challenge : newChallenge,
      }
    });
  }

  const renderTestCases = () => {
    return testCases.map((test, i) =>
      <ContentCard>
        <TestCase key={'testCase' + i}>
          <div className="input">
            <label>Input:</label>
              {(testCases[i]['inputError']) ? <div className="error">{'*Malformed input'}</div> : null} 
              <TextArea 
                name='input' 
                key={'input' + i} 
                onChange={(e) => handleTestCaseChange(e, i)} 
                value={testCases[i]['input']} 
                required 
              />
          </div>
          <div className="input">
            <label>Expected Output:</label>
            {testCases[i]['expectedOutputError'] ? <div className="error">{'*Malformed expected output'}</div> : null} 
              <TextArea  
                name='expectedOutput' 
                key={'expectedOutput' + i} 
                onChange={(e) => handleTestCaseChange(e, i)} 
                value={testCases[i]['expectedOutput']} 
                required
              />
            </div>
            <RemoveTestCaseButton 
              classname='' 
              onClick={(e) => removeTestCase(e, i)}
              icon={<TrashIcon/>}
            />
        </TestCase>
      </ContentCard>
    )
  }

  return (
    <PageContainer className='create-challenge-container' header={'Create a Challenge'}>
      <BackButton/>
      <StyledForm onSubmit={handleSubmit}>
        <Row>
          <ChallengeName>
            <label>
              Challenge Name:
              <input 
                type="text" 
                name='name' 
                className="form-control" 
                onChange={handleChange} 
                required 
                maxLength="128" 
              />
            </label>
          </ChallengeName>
          <DifficultySelect>
            <label>Difficulty:</label>
              <select name='difficulty' onChange={handleChange} required> 
                  <option value = "">Select</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
          </DifficultySelect> 
        </Row>
          <ChallengeDescription>
            <label>
              Description
              <input 
                type="text" 
                name='description' 
                className="form-control" 
                onChange={handleChange} 
                required 
                maxLength="512" 
              />
            </label>
          </ChallengeDescription>
          <TestCaseContainer>
            <TestCaseHowTo/>
            <label>Test Cases</label>
            {renderTestCases()}
          </TestCaseContainer>
          <AddTestCaseButton 
            className='btn' 
            text='Add Test Case'
            icon={<AddIcon/>} 
            onClick={addTestCase}
          />
          <SubmitButton text="Submit" className='btn'/>
      </StyledForm>
    </PageContainer>
  );
};

const ChallengeName = styled.div`
  width: 70%;
`;

const ChallengeDescription = styled.div`
  width: 70%;
`;

const DifficultySelect = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20%;
  select {
    height:2em;
    width: 100%;
  }
`;

const Blockquote = styled.blockquote`
  height:auto;
  width:100%;
  background-color: rgba(255,229,100,0.3);
  border-left-color: #ffe564;
  border-left-width: 9px;
  border-left-style: solid;
  padding: 20px 45px 20px 26px;
`;

const TestCaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

`;

const TestCase = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  gap: 10px 10px;

  .input {
    margin-top: 0;
    margin-bottom: 0;
    width: 45%;
    label {
      margin: 0;
    }
  }

  @media ${device.sm} {
    justify-content: center;
    flex-wrap: wrap;
    .input {
      width: 100%;
    }
  } 
`;

const RemoveTestCaseButton = styled(Button)`
  background: var(--error-color);
  min-width: 30px;
  width: 40px;
  height: 40px;
  padding: 0;
  align-self: center;
  &:hover {
    background: #ad424d;
  }
`;

const TextArea = styled.textarea`
  height:5em;
  width: 100%;
`;

const Row = styled.div`
  display:flex;
  justify-content: space-between;
  width:100%;
  min-width:100%;
  height: auto;
  overflow: visible;
  textarea {
    margin-bottom: 10px;
  }
`;

const AddTestCaseButton = styled(Button)`
  margin-top: 20px;
  align-self: left;
  width: 200px;

  @media ${device.sm} {
    align-self: center;
  }
`;

const SubmitButton = styled(Button)`
  width: 200px;
  margin-top:20px;
  align-self: center;
  text-align: center;
  background-color: #4CAF55;
  &:hover {
    background: #60e06c;
  }
`;

const TrashIcon = styled(FaRegTrashAlt)`
    width: 20px;
`;

const AddIcon = styled(IoIosAdd)`
  width: 30px;
  height: auto;
`;

export default CreateChallenge;
