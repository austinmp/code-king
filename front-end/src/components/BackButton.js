import Button from './Button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useHistory } from "react-router-dom";
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
`

const BackIcon = styled(IoMdArrowRoundBack)`
    margin-right: 5px;
    text-align: center;
    align-self: center;
    width: 20px;
    height: auto;
`;

export default BackButton;