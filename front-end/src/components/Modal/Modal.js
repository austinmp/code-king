import React from "react";
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import styled from "styled-components";
import SignInForm from '../Forms/SignInForm';
import SignUpForm from '../Forms/SignUpForm';
import ErrorForm from '../Forms/ErrorForm';


const forms = {
    signIn : SignInForm,
    signUp: SignUpForm,
    errorMessage : ErrorForm
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
    border-radius: 10px;    
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 1;
    min-width: 300px;
    min-height: 450px;
    top: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
    background:  #20232a;
    width: 30%; 
    height: 60%; 
    padding:50px;
    color:white;
    overflow: show;
    &:a{
        color: #0070f3;
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
        color: red;
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






// function Modal({isModalOpen, headerText, modalForm, modalData, toggleModal, setModalHeaderText, setModalForm, setModalData, setCredentials }) {
//     const ModalForm = forms[modalForm] || forms['signIn'];
//     if(!isModalOpen) return null;
//     return ReactDOM.createPortal(
//         <ModalBackDrop 
//             className='modal-backdrop'
//             onClick={ () => {
//                 toggleModal()
//             }}
//         >
//             <ModalContainer
//                 onClick={e => {
//                     e.stopPropagation();
//                 }}
//             >
//                 <ModalHeader headerText={headerText} className="modal-header" />
//                 <ModalForm 
//                     toggleModal={toggleModal} 
//                     setModalHeaderText={setModalHeaderText}
//                     setModalForm={setModalForm}
//                     setModalData={setModalData}
//                     modalData={modalData}
//                     setCredentials={setCredentials}
//                 />
//                 <CloseModalButton onClick={ ()=> toggleModal()}> <CloseIcon /> </CloseModalButton>
//             </ModalContainer>
//         </ModalBackDrop>,
//         document.getElementById('modal')
//     );
// }

// const ModalBackDrop = styled.div`
//     background: rgba(103, 103, 102, 0.1);
//     backdrop-filter: blur(3px);
// `;

// const ModalContainer = styled.div`
//     flex-direction: column;
//     align-items: center;
//     position: fixed;
//     z-index: 1;
//     min-width: 300px;
//     min-height: 450px;
//     overflow-y:auto;
//     top: 50%;
//     left: 50%;
//     width: 50%;
//     transform: translate(-50%, -50%);
//     background:  #20232a;
//     width: 30%; 
//     height: 60%; 
//     padding:50px;
//     color:white;
//     &:a{
//         color: #0070f3;
//     }
// `;

// const CloseIcon = styled(MdClose)`
//     width:30px;
//     height: auto;
//     color: white;
//     &:hover {
//         color: red;
//     }
// `;

// const CloseModalButton = styled.button`
//     cursor: 'pointer';
//     position: absolute;
//     border: none;
//     text-decoration: none;
//     background-color: inherit;
//     top: 10px;
//     right: 10px;
//     padding: 0;
//     z-index: 1;
// `;

// export default Modal;





            