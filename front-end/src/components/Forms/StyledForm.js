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
    input {
        margin-top: 10px;
        height: 60px;
    }

    label {
        width: 100%;
    }

    button {
        width:100%;
        height: 60px;
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