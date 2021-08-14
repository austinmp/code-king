import React from "react";
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import styled from "styled-components";
import SignInForm from '../ModalForms/SignInForm';
import SignUpForm from '../ModalForms/SignUpForm';
import ModalMessage from "../ModalForms/ModalMessage";
import { device } from '../../common/breakpoints'

const forms = {
    signIn : SignInForm,
    signUp: SignUpForm,
    message : ModalMessage
}

const  Modal = ( { modal, setModal, setCredentials } ) => {
    const ModalForm = forms[modal.form] || forms['signIn'];
    if(!modal.isOpen) return null;

    const renderHeader = () => {
        if(!modal.header) return null;
        return (
            <HeaderDiv> <h2>{modal.header}</h2></HeaderDiv>
        );
    }

    const clearPrevHeader = () => {
        setModal(prevState => ({
            ...prevState,
            header : '',
        }))
    }

    return ReactDOM.createPortal(
        <ModalBackDrop 
            className='modal-backdrop'
            onClick={ () => {
                setModal(prevState =>({
                    ...prevState,
                    isOpen : false,
                }));
            }}
        >
            <ModalContainer
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                {renderHeader()}
                <ModalForm modal={modal} setModal={setModal} setCredentials={setCredentials}/>
                <CloseModalButton 
                    onClick={ () => 
                        setModal(prevState => ({
                            ...prevState,
                            isOpen : false,
                        }))
                    }
                >
                    <CloseIcon /> 
                </CloseModalButton>
            </ModalContainer>
        </ModalBackDrop>,
        document.getElementById('modal')
    );
}

const ModalBackDrop = styled.div`
    background: rgba(103, 103, 102, 0.1);
    backdrop-filter: blur(3px);
`;

const ModalContainer = styled.div`
    background: green;
    border-radius: 10px;    
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 1;
    width: 600px;
    top: 50%;
    left: 50%;
    height: auto    ;
    transform: translate(-50%, -50%);
    background:  #20232a;
    padding: 80px;
    color:white;
    &:a{
        color: #0070f3;
    }

    @media ${device.sm} {
        width: 100%;
      } 
    
`;
const HeaderDiv = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;  
    color: white;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const CloseIcon = styled(MdClose)`
    width:30px;
    height: auto;
    color: white;
    &:hover {
        color: #e85e6c;
    }
`;

const CloseModalButton = styled.button`
    cursor: 'pointer';
    position: absolute;
    border: none;
    text-decoration: none;
    background-color: inherit;
    top: 10px;
    right: 10px;
    padding: 0;
    z-index: 1;
`;

export default Modal;



