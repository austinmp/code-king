import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { device } from '../common/breakpoints';

const PageContainer = ({header, children}) =>{
    return (
      <OuterContainer>
        <Header text={header} />
        <Container className='page-container'>
          {children}
        </Container>
      </OuterContainer>
    );
}
const OuterContainer = styled.div`

  @media ${device.sm} {
    width:95%;
  } 



  @media ${device.lg} {
    width: 85%;
  } 

  @media ${device.xl} {
    width: 65%;
  } 

  margin-bottom: 40px;
  align-content: center;
`;


const Container = styled.div`
  background-color: #ffffff;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: safe-center;
  width: 100%
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
    padding: 10px;
  } 

  
`;


export default PageContainer;