import React, {useState, useEffect, useContext} from 'react';
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
import { AuthContext } from './context/AuthContext';
import GlobalStyles from './GlobalStyles';



function App() {

  const {credentials, setCredentials} = useContext(AuthContext);
  console.log(credentials);

  // const [credentials, setCredentials] = useState({
  //   username  : localStorage.getItem('codeKingUsername') || '',
  //   token     : localStorage.getItem('APIToken') || '',
  // });

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
      <GlobalStyles/>
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
        {/* <Route 
          exact path="/createChallenge" 
          render={(props) => (
            <CreateChallenge setModal={setModal} />
          )}
        /> */}
        <ProtectedRoute exact path="/createChallenge" component={CreateChallenge} setModal={setModal}/>
        <ProtectedRoute exact path="/challenges" component={ChallengeSet} />
        <ProtectedRoute path="/challenges/:title/:_id" component={Challenge} username={credentials.username}/>
      </Router>
    </Div>    
  );
}

export default App;

const Div = styled.div`
  min-height: 100vh;
  position:relative;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


