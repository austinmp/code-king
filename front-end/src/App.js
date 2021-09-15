import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Modal from './components/Modal/Modal';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateChallenge from './pages/CreateChallenge';
import EditChallenge from './pages/EditChallenge';
import Submissions from './pages/Submissions';
import ChallengeSet from './pages/ChallengeSet';
import Highscores from './pages/Highscores';
import Challenge from './pages/Challenge';
import ProtectedRoute from './components/ProtectedRoute';
import styled from "styled-components";
import { AuthContext } from './context/AuthContext';
import GlobalStyles from './GlobalStyles';
import {
  BrowserRouter as Router,
  Route, 
} from "react-router-dom";

function App() {
  const {credentials, setCredentials} = useContext(AuthContext);
  const [modal, setModal] = useState({
    isOpen  : false,
    form    : '',
    header  : '',
    data    : '',
    icon    : ''
  });

  useEffect( ()=> {
    sessionStorage.setItem('APIToken', credentials.token);
    sessionStorage.setItem('codeKingUsername', credentials.username);
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

        <ProtectedRoute exact path='/createChallenge' component={CreateChallenge} setModal={setModal}/>
        <ProtectedRoute path='/editChallenge/:challengeId' component={EditChallenge} setModal={setModal} />
        <ProtectedRoute exact path='/challenges' component={ChallengeSet} />
        <ProtectedRoute path='/challenges/:title/:challengeId' component={Challenge} username={credentials.username}/>
        <ProtectedRoute path='/highscores/:challengeId' component={Highscores} />
        <ProtectedRoute path='/submissions/:username' component={Submissions} />
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


