import styled from "styled-components";
import React, { useState } from "react";
import { device } from '../common/breakpoints';
import { MdLightbulbOutline } from 'react-icons/md';
import { IoIosArrowDropdown } from 'react-icons/io';
import { IoIosArrowDropup } from 'react-icons/io';



const TestCaseHowTo = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const renderText = () => {
        return (
            <p>
                <b> Input : </b> An array containing all function paramter inputs, with a comma seperating each parameter.
                <br/>
                <br/>
                <b> Expected Output : </b>  The output a correct solution to the problem would generate, given the input defined.
                <br/>
                <br/>
                <b> Tip : </b> Strings/Chars should be wrapped in double quotes.
                <br/>
                <br/>
                <b> Example #1: </b>
                <br/> 
                <br/> 
                <Div>
                    <b>Challenge Description : </b> Given an array of integers as the first parameter, and an integer k as the second, return the kth smallest element in the array.
                    <br/>
                    <br/> 
                    <b> Input : </b> [ [7, 10, 4, 3, 20, 15], 3 ] &nbsp;&nbsp; &larr; (2 parameters wrapped in an array with k=3)
                    <br/>
                    <br/> 
                    <b> Expected Output : </b>  7
                </Div>
                <br/>
                <b> Example #2: </b>
                <br/> 
                <br/> 
                <Div>
                    <b>Challenge Description : </b> Given a string, return a reversed version of the original.
                    <br/>
                    <br/> 
                    <b> Input : </b> [ "hello" ] &nbsp;&nbsp; &larr; (1 parameter wrapped in an array)
                    <br/>
                    <br/> 
                    <b> Expected Output : </b>  "olleh"
                </Div>  
            </p> 
        );
    }


    return (
            <Container className="how-to-container"
            onClick={ ()=> setIsCollapsed(prevState=> !prevState)}
            
            >
                { isCollapsed
                ?   <ToolTip >
                        <LightIcon className='icon'/>
                            <p><b>Help Formatting Test Cases</b></p>
                            <DropDownIcon className='icon'/>
                    </ToolTip>
                :   <>
                        <ToolTip >
                            <LightIcon className='icon'/>
                                <p><b>Help Formatting Test Cases</b></p>
                                <DropUpIcon className='icon'/>
                        </ToolTip>
                        <Text>
                            {renderText()}
                        </Text>
                    </>
                }             
            </Container>
    );
}

const ToolTip = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

const LightIcon = styled(MdLightbulbOutline)`
    font-size: 30px;
`;

const DropDownIcon = styled(IoIosArrowDropdown)`
    font-size: 30px;
`;

const DropUpIcon = styled(IoIosArrowDropup)`
    font-size: 30px;
`;

const Text = styled.div`
    margin-top: 20px;
`

// To Do - Figure out how to use override content card
const Container = styled.div`
    background-color: rgba(255,229,100,0.3);
    color: var( --primary); 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    width: 80%;
    overflow: auto;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-left-color: #ffe564;
    border-left-width: 9px;
    border-left-style: solid;
    padding: 20px 45px 20px 26px;

    p {
        margin: 0px;
        padding: 0px;
    };

    label {
        font-weight: 500;
        font-size: 17px;
        margin-top: 20px;
        margin-bottom: 5px;
    };

    @media ${device.sm} {
        width:100%;
    } 

    .icon {

        :hover {
            transform: scale(1.3);
        }
    }

    :hover {
        cursor: pointer;
        box-shadow: 0px 0px 16px 0 rgba(0, 0, 0, 0.5);
    }
  


`;

const Div = styled.div`
  padding-left: 40px;
`;

export default TestCaseHowTo;