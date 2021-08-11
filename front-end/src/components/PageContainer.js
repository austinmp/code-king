import React from "react";
import styled from "styled-components";
import Header from "./Header";

function PageContainer({header, children}){
    return (
      <OuterContainer>
        {/* { header */}
             <Header text={header} />
            {/* : null
        } */}
        <Container className='page-container'>
          {children}
        </Container>
      </OuterContainer>
    );
}
const OuterContainer = styled.div`
  width:60%;
  margin-bottom: 40px;
  align-content: center;
  @media (max-width: 1000px) {
    width: 90%;
  };
`;


const Container = styled.div`
  background-color: #ffffff;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
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
  
`;


export default PageContainer;