import React from 'react'
import Button from '../Button';
import { MdErrorOutline } from 'react-icons/md';
import styled from "styled-components";

const ErrorForm = ( {modal, setModal} ) => {
    return (
        <Container>
            <ErrorIcon/>
            <HeaderDiv><h2>{modal.data}</h2></HeaderDiv>
            <Button 
                classname='btn' 
                text='Close' 
                onClick={() => {
                    setModal(prevState => ({
                        ...prevState,
                        isOpen : false,
                    }))
                
                }}
            >       
            </Button>       
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    // background: green;
    align-items: center;
    justify-content: space-around;
    height:80%;
    width: 100%;
`;

const ErrorIcon = styled(MdErrorOutline)`
    width: 100px;
    height: auto;
    color: white;
`;

const HeaderDiv = styled.div `
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;  
    color: white;
    margin-bottom: 20px;
    margin-top: 20px;
`;


export default ErrorForm;