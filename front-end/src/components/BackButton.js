import Button from './Button';
import { useHistory } from "react-router-dom";
import { IoMdArrowRoundBack } from 'react-icons/io';
import styled from "styled-components";

const BackButton = () => {
    let history = useHistory();
    return (
         <StyledButton
            text='Browse Challenges'
            icon={<BackIcon/>} 
            onClick={ () => history.push('/challenges')} 
        />
    );
}

const StyledButton = styled(Button)`
    align-self: flex-start;
    // margin-bottom: 20px;
`;

const BackIcon = styled(IoMdArrowRoundBack)`
    margin-right: 10px;
    text-align: center;
    align-self: center;
    width: 20px;
    height: auto;
`;

export default BackButton;