import React from "react";
import styled from "styled-components";
import { device } from '../common/breakpoints';


const ContentCard = ({children}) => {
    return (
        <Container className='content-card'>
            {children} 
        </Container>
    );
}

const Container = styled.div`
  background-color: inherit;
  color: var( --primary); 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width:100%;
  overflow: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  
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
`;

export default ContentCard;