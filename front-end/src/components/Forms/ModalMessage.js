import React from 'react'
import Button from '../Button';
import styled from "styled-components";
import { FaCheckCircle } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';

const ModalMessage = ({ modal, setModal }) => {
    const Icon = icons[modal.icon];
    return (
        <Container>
            <Icon/>
            <HeaderDiv><h2>{modal.data}</h2></HeaderDiv>
            <CloseButton 
                text='Close' 
                onClick={() => {
                    setModal(prevState => ({
                        ...prevState,
                        isOpen : false,
                    }))
                }}
            />       
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
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

const CloseButton = styled(Button)`
    text-align: center;
`;

const ErrorIcon = styled(MdErrorOutline)`
    width: 100px;
    height: auto;
    color: #e85e6c;
`;

const SuccessIcon = styled(FaCheckCircle)`
    width: 100px;
    height: auto;
    color: #4CAF55;
`;

const icons = {
    error : ErrorIcon,
    success: SuccessIcon
}

export default ModalMessage;