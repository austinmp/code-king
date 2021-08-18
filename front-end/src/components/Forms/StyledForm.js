import styled from "styled-components";

const StyledForm = ({onSubmit, children}) => {
    return(
        <Form
            onSubmit={onSubmit}
        >
            {children}
        </Form>
    );
}

const Form = styled.form`
    font-size: var(--form-font-size);
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
    height: auto;  
    width: 100%;
    input {
        margin-top: 10px;
        height: 60px;
    }

    label {
        width: 100%;
    }

    .modal-button {
        height: 60px;
        width: 100%;
    }
   
    button {
        text-align: center;
    }

    .error {
        text-align: center;
    }

    .noMatch {
        border-color: var(--error-color);
        border-width: 0.2em;
    }
`;

export default StyledForm;