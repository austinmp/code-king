import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import styled, {css} from "styled-components";
import Button from '../components/Button';
import PageContainer from '../components/PageContainer';
import useFetch from '../api/useFetch';
import BackButton from '../components/BackButton';

// icons
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaRegTrashAlt } from 'react-icons/fa';

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
      <TestCaseContainer key={'testCase' + i}>
        <TestCase>
          <Input>
            <label>Input:</label>
              {(testCases[i]['inputError']) ? <ErrorText>{'*Malformed input'}</ErrorText> : null} 
              <TextArea 
                name='input' 
                key={'input' + i} 
                onChange={(e) => handleTestCaseChange(e, i)} 
                value={testCases[i]['input']} 
                required 
              />
          </Input>
          <ExpectedOutput>
            <label>Expected Output:</label>
            {testCases[i]['expectedOutputError'] ? <ErrorText>{'*Malformed expected output'}</ErrorText> : null} 
              <TextArea  
                name='expectedOutput' 
                key={'expectedOutput' + i} 
                onChange={(e) => handleTestCaseChange(e, i)} 
                value={testCases[i]['expectedOutput']} 
                required
              />
            </ExpectedOutput>
            <RemoveTestCaseButton 
              classname='btn' 
              onClick={(e) => removeTestCase(e, i)}
              icon={<TrashIcon/>}
            />
        </TestCase>
      </TestCaseContainer>
    )
  }

  return (
    <PageContainer className='create-challenge-container' header={'Create a Challenge'}>
      <BackButton/>
      <CreateChallengeForm onSubmit={handleSubmit}>
        <Div>
          <Row>
            <ChallengeName>
              <Label>
                Challenge Name:
                <input 
                  type="text" 
                  name='name' 
                  className="form-control" 
                  onChange={handleChange} 
                  required 
                  maxLength="128" 
                />
              </Label>
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
            <Label>
              Description:
              <input 
                type="text" 
                name='description' 
                className="form-control" 
                onChange={handleChange} 
                required 
                maxLength="512" 
              />
            </Label>
          </ChallengeDescription>
          <label>Test Cases:</label>
          <Blockquote>
          <p>An individual test case consists of a comma seperated array specifying the function parameter inputs, along with the
            output that is expected from a correct solution to the problem. Provide as many individual test cases as you would like in 
            the array below, seperated by commas.
            <br/>
            <br/>
            <b>Example:</b> Given an integer array nums and an integer k, return the kth largest element in the array.
            <br/>
            <br/>
              <b>Input:</b> [ [[3,2,1,5,6,4], 2], [[1,9,8,4,2], 1], [[1,2,3], 3] ] &nbsp; &nbsp; &#8592; Three individual test cases
              <br /> 
              <b>Ouput:</b> [5, 9, 1]       
            </p> 
          </Blockquote>
          {renderTestCases()}
          <AddTestCaseButton 
            classname='btn' 
            text='Add Test Case'
            icon={<AddIcon/>} 
            onClick={addTestCase}
          />
          <SubmitButton text="Submit" className='btn'/>
        </Div>
      </CreateChallengeForm>
    </PageContainer>
  );
};

const Label = styled.label`
  width: 100%;
`;

const ChallengeName = styled.div`
  width: 70%;
`;

const CreateChallengeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  height: auto;
  width:100%;
  overflow: visible;
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

const ChallengeDescription = styled.div`
  width: 70%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow:visible;
  width:100%;
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
  height: auto;
  width: 100%;
`

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

const TestCase = styled.div`
  display: flex;
  min-width: 100%;
  justify-content: space-between;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const ExpectedOutput = styled.div`
  overflow: visible;
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const TextArea = styled.textarea`
  height:9em;
  width: 100%;
`;

// const TestCaseAside = styled.div`
//   display: flex;
//   height: inherit;
//   flex-shrink: 3;
//   margin-left: 20px;
//   justify-content: flex-end;
//   background: green;
// `;

const RemoveTestCaseButton = styled(Button)`
  background: #e85e6c;
  min-height: 1em;
  min-width: 1em;
  align-self: center;
  text-align: center;
  height:50px;
  width: 3.5em;
  &:hover {
    background: #ad424d;
  }
`;

const AddTestCaseButton = styled(Button)`
  min-width: 0;
  margin-top: 20px;
  align-self: left;
  width: 200px;
  height:50px;
`;

const ErrorText = styled.div`
  color: #e85e6c;
`;

const SubmitButton = styled(Button)`
  width: 200px;
  height:50px;
  margin-top:80px;
  align-self: center;
  text-align: center;
  background-color: #4CAF55;
  &:hover {
    background: #60e06c;
  }
`;

const TrashIcon = styled(FaRegTrashAlt)`
    color: white;
`;

const AddIcon = styled(IoMdAddCircleOutline)`
  color: white;
  font-size: 1.5em;
  margin-right: 20px;
  text-align:center;
`;


export default CreateChallenge;
