import React, {useState, useEffect} from 'react';
import './Main.css';
import {useLocation} from "react-router-dom";



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
    <main>
      <div className = "title-container">
        <img src="/logo.png" alt="monkey with laptop logo" width="150"/>
        <h1 className="title">
          Code King
        </h1>          
        <p className="description">
          A coding challenge website built using microservices for
          <a href="https://sites.google.com/cs.umass.edu/compsci497s/home" > CS497S - Scalable Web Systems (Fall 2020)</a>
        </p>
      </div>
      <div className="grid">
        <a href="#"
          onClick={() => {
            setModal( prevState =>({
                ...prevState,
                isOpen: true,
                header : 'Create an Account',
                form: 'signUp'
            })); 
          }} 
          className="card"
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
      </div>
    </main>
  );
}

export default Home;