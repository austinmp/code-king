import React from "react";
import styled from "styled-components";

function PageContainer({children}){
    return (
        <Container>{children}</Container>
    );
}

const Container = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    color:white;
    min-height: 100vh ;
    height:100%;
    p {
      margin: 0px;
      padding: 0px;
    };
    label {
      font-weight: 500;
      font-size: 17px;
      margin-top: 20px;
      margin-bottom: 5px;
    }
`;

export default PageContainer;