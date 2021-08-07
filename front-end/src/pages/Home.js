import React, {useEffect} from 'react';
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import './Main.css';
import PageContainer from '../components/PageContainer';
import Header from '../components/Header';



function Home({ modal, setModal }){
  const search = useLocation().search;
  const showLogIn = new URLSearchParams(search).get('showLogIn');
  useEffect(() => {
    if(showLogIn){
      setModal(prevState =>({
        ...prevState,
        isOpen : true,
        header : 'Sign In',
        form   : 'singIn'
      }));
    }
  }, [showLogIn]);
  
  return (
    <>
      <PageContainer>

        <HeaderContainer>
          <img src="/logo.png" alt="monkey with laptop logo" width="150"/>
          <div>
            <Header text="Code King"/>
          </div>          
          <h3 className="description">
            A coding challenge website built using microservices for
            <a href="https://sites.google.com/cs.umass.edu/compsci497s/home" > CS497S - Scalable Web Systems (Fall 2020)</a>
          </h3>
        </HeaderContainer>
      </PageContainer>

      <PageContainer>
        <Grid className="grid">
          <a href="#"
            className="card"
            onClick={() => {
              setModal( prevState =>({
                  ...prevState,
                  isOpen: true,
                  header : 'Create an Account',
                  form: 'signUp'
              })); 
            }}  
          >
            <h3>Create an Account &rarr;</h3>
            <p>Unlock the ability to solve and create challenges and view highscores.</p>
          </a>

          <a href="/challenges" className="card">
            <h3>Solve &rarr;</h3>
            <p>Submit your own solutions to challenges! Beat other highscores!</p>
          </a>
          <a href='/createChallenge'
            className="card" 
          >
            <h3>Contribute  &rarr;</h3>
            <p>Create a coding challenge of your own that other users can have a crack at!</p>
          </a>
          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Documentation &rarr;</h3>
            <p>
              Get in-depth info on the microservices and APIs used to make this app. 
            </p>
          </a>
        </Grid>
      </PageContainer>
    </>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-basis: 45%;
  text-align: center; 
  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }
`

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  // max-width: 1000px;

  & .card {
    margin: 1rem;
    flex-basis: 45%;
    height: 300px;
    padding: 2rem;
    text-align: left;
    color: white;
    text-decoration: none;
    border: 4px solid black;
    border-radius: 10px;
    background: var(--secondary);
    transition: color 0.15s ease, border-color 0.15s ease;

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      font-size: 1.1rem;
      line-height: 1.5;
    }

    :hover,
    :focus,
    :active {
      background: var(--hover-color);
    }

    
  }
`;

export default Home;