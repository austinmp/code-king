import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Modal from './components/Modal/Modal';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateChallenge from './pages/CreateChallenge';
import ChallengeSet from './pages/ChallengeSet';
import Challenge from './pages/Challenge';
import ProtectedRoute from './components/ProtectedRoute';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route, 
} from "react-router-dom";

import ModalMessage from './components/ModalForms/ModalMessage';

function App() {

  const [credentials, setCredentials] = useState({
    username  : localStorage.getItem('codeKingUsername') || '',
    token     : localStorage.getItem('APIToken') || '',
  });

  const [modal, setModal] = useState({
    isOpen  : false,
    form    : '',
    header  : '',
    data    : '',
    icon    : ''
  });

  useEffect( ()=> {
    localStorage.setItem('APIToken', credentials.token);
    localStorage.setItem('codeKingUsername', credentials.username);
  }, [credentials]);

  return (
    <Div className="App">
      <Router>
        <Navbar 
          setModal={setModal}
          credentials={credentials}
          setCredentials={setCredentials}
        /> 
        <Footer/>
        { modal.isOpen ? 
            <Modal 
              modal={modal}
              setModal={setModal}
              setCredentials={setCredentials}
            />  
          : null
        }
        <Route
          exact path='/'
          render={(props) => (
            <Home modal={modal} setModal={setModal} />
          )}
        />
        <Route 
          exact path="/createChallenge" 
          render={(props) => (
          <CreateChallenge 
          token={credentials.token}
          setModal={setModal} />
          )}
        
        />
        {/* <ProtectedRoute exact path="/createChallenge" component={CreateChallenge} isAuthenticated={credentials.token}/> */}
        <ProtectedRoute exact path="/challenges" component={ChallengeSet} isAuthenticated={credentials.token} />
        <ProtectedRoute path="/challenges/:title/:_id" component={Challenge} isAuthenticated={credentials.token} username={credentials.username}/>
      </Router>
    </Div>    
  );
}

export default App;

const Div = styled.div`
  /* background: red; */
  min-height: 100vh;
  position:relative;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


