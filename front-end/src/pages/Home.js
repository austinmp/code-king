import React, {useEffect} from 'react';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PageContainer from '../components/PageContainer';
import Header from '../components/Header';
import { device } from '../common/breakpoints';

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
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAwMSA1MTIuMDAxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAxIDUxMi4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGMEYwRkE7IiBkPSJNNzQuMTcxLDM4My44NjljLTg1LjUxMi04NS41MTItODUuNTEyLTIyNC4xNTQsMC0zMDkuNjY2czIyNC4xNTQtODUuNTEyLDMwOS42NjYsMA0KCXM4NS41MTIsMjI0LjE1NCwwLDMwOS42NjZTMTU5LjY4Myw0NjkuMzgxLDc0LjE3MSwzODMuODY5eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6Izc4RDJGQTsiIGQ9Ik0zMTIuMzgyLDI5Ny4yMjlsLTMyLjA4OC01LjkzMmMtMTIuODM3LTIuMzc0LTIyLjE1My0xMy41NjktMjIuMTUzLTI2LjYyNHYtNy4xMzVoLTU3LjgxMnY3LjEzNg0KCWMwLDEzLjA1NC05LjMxNiwyNC4yNS0yMi4xNTIsMjYuNjIzbC0zMi4wNzMsNS45M2MtMzEuMTI3LDUuNzU1LTUzLjcxNSwzMi45MDItNTMuNzE1LDY0LjU1N3YzOC4zNzkNCgljNzkuODM3LDYzLjg5NSwxOTQuMDA5LDYzLjc2OSwyNzMuNzA4LTAuMzgydi0zNy45OTZDMzY2LjA5OCwzMzAuMTMxLDM0My41MDksMzAyLjk4MywzMTIuMzgyLDI5Ny4yMjl6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkZCNDg3OyIgZD0iTTIyOS4zODQsMzAyLjQ4bDI5Ljk0NC0yOS45NDRjLTAuNzYtMi41MDEtMS4xODctNS4xMzctMS4xODctNy44NjN2LTcuMTM1aC01Ny44MTJ2Ny4xMzYNCgljMCwyLjY0NC0wLjM5OSw1LjIwMy0xLjExNSw3LjYzN0wyMjkuMzg0LDMwMi40OHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGNUI5NTU7IiBkPSJNMjI5LjAwNCw3NS4xMjRMMjI5LjAwNCw3NS4xMjRjLTM4LjkyLDAtNzAuNDcxLDMxLjU1MS03MC40NzEsNzAuNDcxdjE2Ljk2NGgzNC40NTYNCgljMjIuOTA1LDAsNDQuNjMzLTEwLjE0MSw1OS4zNDQtMjcuNjk3bDAsMGw0Ny4xNDMsMjcuNjk3di0xNi45NjRDMjk5LjQ3NSwxMDYuNjc1LDI2Ny45MjQsNzUuMTI0LDIyOS4wMDQsNzUuMTI0eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGQ0RBQzsiIGQ9Ik0yMzcuMTUzLDE0OC43MTFjLTEyLjgzOCw4LjkxOC0yOC4yMTMsMTMuODQ4LTQ0LjE2NCwxMy44NDhoLTM0LjQ1NnYyOS45MzENCgljMCwzOC45MiwzMS41NTEsNzAuNDcxLDcwLjQ3MSw3MC40NzFsMCwwYzM4LjkyLDAsNzAuNDcxLTMxLjU1MSw3MC40NzEtNzAuNDcxdi0yOS45MzFsLTIzLjU3MS0xMy44NDhsLTIzLjU3MS0xMy44NDgNCglMMjM3LjE1MywxNDguNzExeiIvPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0Y1Qjk1NTsiIHBvaW50cz0iMjUyLjU1MSwzODcuMDc2IDIyOS4zOCwyOTkuMDE0IDIwNi4yMTYsMzg3LjA3NiAyMjkuMzg5LDQxMy40MzcgIi8+DQo8Y2lyY2xlIHN0eWxlPSJmaWxsOiNGRjhDOEM7IiBjeD0iNDEyLjgwNyIgY3k9IjQxMi44NDciIHI9Ijg5LjE1NiIvPg0KPHBhdGggZD0iTTIwNi4yODcsMTgzLjM2M2MtMS44Ni0xLjg2LTQuNDM5LTIuOTMtNy4wNjktMi45M2MtMi42MywwLTUuMjA5LDEuMDctNy4wNjksMi45M2MtMS44NiwxLjg3LTIuOTMsNC40MzktMi45Myw3LjA3OQ0KCWMwLDIuNjMsMS4wNyw1LjE5OSwyLjkzLDcuMDU5YzEuODYsMS44Nyw0LjQzOSwyLjkzLDcuMDY5LDIuOTNjMi42MywwLDUuMjA5LTEuMDYsNy4wNjktMi45M2MxLjg2LTEuODUsMi45My00LjQyOSwyLjkzLTcuMDU5DQoJQzIwOS4yMTcsMTg3LjgwMiwyMDguMTQ3LDE4NS4yMjIsMjA2LjI4NywxODMuMzYzeiIvPg0KPHBhdGggZD0iTTI1OS41NDksMjAwLjQzYzIuNjQsMCw1LjIwOS0xLjA2LDcuMDY5LTIuOTNjMS44Ni0xLjg2LDIuOTMtNC40MjksMi45My03LjA1OWMwLTIuNjQtMS4wNy01LjIwOS0yLjkzLTcuMDc5DQoJYy0xLjg2LTEuODYtNC40MzktMi45My03LjA2OS0yLjkzYy0yLjYzLDAtNS4yMDksMS4wNy03LjA2OSwyLjkzYy0xLjg2LDEuODYtMi45Myw0LjQzOS0yLjkzLDcuMDc5YzAsMi42MywxLjA3LDUuMTk5LDIuOTMsNy4wNTkNCglDMjU0LjM0LDE5OS4zNywyNTYuOTE5LDIwMC40MywyNTkuNTQ5LDIwMC40M3oiLz4NCjxwYXRoIGQ9Ik0yNDcuNTMyLDIxMy43MzhjLTMuOTA0LTMuOTA0LTEwLjIzNS0zLjkwNC0xNC4xNDEsMGMtMi4yODcsMi4yODgtNi4wMDksMi4yODgtOC4yOTYsMGMtMy45MDQtMy45MDQtMTAuMjM1LTMuOTA0LTE0LjE0MSwwDQoJYy0zLjkwNCwzLjkwNC0zLjkwNCwxMC4yMzUsMCwxNC4xNDFjNS4wNDIsNS4wNDEsMTEuNjY1LDcuNTYzLDE4LjI4OCw3LjU2M2M2LjYyNCwwLDEzLjI0Ny0yLjUyMSwxOC4yODktNy41NjMNCglDMjUxLjQzNiwyMjMuOTc0LDI1MS40MzYsMjE3LjY0MywyNDcuNTMyLDIxMy43Mzh6Ii8+DQo8cGF0aCBkPSJNMzU3LjYzLDQ2OS42MDJjLTMuOTY3LTMuODQxLTEwLjI5Ny0zLjczNy0xNC4xMzgsMC4yMzFjLTMuODQsMy45NjgtMy43MzYsMTAuMjk4LDAuMjMyLDE0LjEzOGwwLjMzNSwwLjMyNA0KCWMxLjk0LDEuODY5LDQuNDM4LDIuNzk4LDYuOTM2LDIuNzk4YzIuNjIyLDAsNS4yMzktMS4wMjUsNy4yMDItMy4wNjNjMy44MzEtMy45NzcsMy43MTItMTAuMzA2LTAuMjY1LTE0LjEzOEwzNTcuNjMsNDY5LjYwMnoiLz4NCjxwYXRoIGQ9Ik00NDAuMjIxLDMxNy41NTVjMTMuMzkxLTMyLjAxNCwxOS4zODItNjYuOTg0LDE3LjM2MS0xMDEuODQxYy0yLjI1OC0zOC45NjUtMTQuNDg2LTc2Ljg2OS0zNS4zNjMtMTA5LjYxNQ0KCWMtMi45NjktNC42NTYtOS4xNS02LjAyNC0xMy44MDYtMy4wNTZzLTYuMDI0LDkuMTUtMy4wNTYsMTMuODA2YzM3LjM4Niw1OC42NDEsNDIuODEzLDEzMy42MiwxNC42MywxOTcuMTExDQoJYy0yLjM3Mi0wLjE3MS00Ljc2NS0wLjI2Mi03LjE4LTAuMjYyYy0xNi42NjIsMC0zMi4zNzMsNC4xMzctNDYuMTcyLDExLjQyOWMtMTAuODc0LTE5LjcyLTI5Ljg5NS0zMy41NjMtNTIuNDM4LTM3LjczDQoJbC0zMi4wODgtNS45MzNjLTguMDk2LTEuNDk3LTEzLjk3Mi04LjU1OS0xMy45NzItMTYuNzkxdi0xLjU5NWMyNC44MDEtMTMuNzQxLDQxLjYzNi00MC4xOCw0MS42MzYtNzAuNDg1di00Ni45MzcNCgljMC00NC40MDUtMzYuMTI2LTgwLjUzMS04MC41MzEtODAuNTMxcy04MC41MzEsMzYuMTI3LTgwLjUzMSw4MC41MzF2NDYuOTM3YzAsMzAuMjk4LDE2LjgyNiw1Ni43MzEsNDEuNjE4LDcwLjQ3NXYxLjYwNQ0KCWMwLDguMjMzLTUuODc2LDE1LjI5Ni0xMy45NzEsMTYuNzkybC0zMi4wNzMsNS45M2MtMzUuODY1LDYuNjMyLTYxLjg5NSwzNy45MTctNjEuODk1LDc0LjM4OXYxNi4xNDMNCgljLTAuMzgzLTAuMzc3LTAuNzctMC43NDgtMS4xNTEtMS4xMjhjLTM5LjQ2OS0zOS40NjktNjEuMjA1LTkxLjk0NS02MS4yMDUtMTQ3Ljc2MlM0MS43NzMsMTIwLjc0MSw4MS4yNDIsODEuMjczDQoJYzY3LjM2OC02Ny4zNjgsMTcxLjY4Mi04MC43MDgsMjUzLjY3LTMyLjQ0MWM0Ljc1OCwyLjgwMiwxMC44ODcsMS4yMTQsMTMuNjg5LTMuNTQzYzIuODAyLTQuNzU4LDEuMjE1LTEwLjg4Ny0zLjU0My0xMy42ODkNCglDMjU1LjIxMi0yMS4yOTIsMTQwLjkxMy02LjY3OSw2Ny4xMDEsNjcuMTMzQzIzLjg1NiwxMTAuMzc4LDAuMDM5LDE2Ny44NzgsMC4wMzksMjI5LjAzNlMyMy44NTUsMzQ3LjY5NCw2Ny4xLDM5MC45NA0KCWM0My45LDQzLjg5OSwxMDIuNjM1LDY3LjA1LDE2Mi4xNiw2Ny4wNWMyOS44MDksMCw1OS44MTYtNS44MjQsODguMjU1LTE3Ljc0YzAuNjczLDIuMzQyLDEuNDEzLDQuNjY3LDIuMjYxLDYuOTYyDQoJYzEuOTE0LDUuMTc5LDcuNjYzLDcuODMsMTIuODQ0LDUuOTEzYzUuMTgtMS45MTMsNy44MjgtNy42NjQsNS45MTQtMTIuODQ0Yy0zLjIzOC04Ljc2NC00Ljg3OS0xNy45OTEtNC44NzktMjcuNDMNCgljMC00My42NDYsMzUuNTA5LTc5LjE1NSw3OS4xNTUtNzkuMTU1YzQzLjY0NSwwLDc5LjE1NSwzNS41MDksNzkuMTU1LDc5LjE1NWMwLDQzLjY0NS0zNS41MDksNzkuMTU0LTc5LjE1NSw3OS4xNTQNCgljLTcuOTM2LDAtMTUuNzY1LTEuMTY4LTIzLjI2OS0zLjQ3MmMtNS4yNzgtMS42MTktMTAuODcxLDEuMzQ2LTEyLjQ5Miw2LjYyNGMtMS42MjEsNS4yNzgsMS4zNDUsMTAuODcxLDYuNjI0LDEyLjQ5Mg0KCWM5LjQwOSwyLjg4OSwxOS4yMTEsNC4zNTMsMjkuMTM5LDQuMzUzYzU0LjY3MywwLDk5LjE1Mi00NC40NzgsOTkuMTUyLTk5LjE1MUM1MTEuOTYxLDM2Ny42ODMsNDgxLjYwMywzMjkuNDc3LDQ0MC4yMjEsMzE3LjU1NXoNCgkgTTIyOS4zODIsMzM4LjMxM2wxMi4xNDYsNDYuMTYybC0xMi4xNDEsMTMuODE3bC0xMi4xNDctMTMuODE5TDIyOS4zODIsMzM4LjMxM3ogTTIyOS4zODUsMjg4LjMzOWwtMTcuMDA2LTE3LjAwNg0KCWM1LjQ0MiwxLjE2NSwxMS4wODEsMS43OTEsMTYuODY2LDEuNzkxYzUuOTE0LDAsMTEuNjc1LTAuNjU5LDE3LjIzLTEuODc1TDIyOS4zODUsMjg4LjMzOXogTTE2OC43MSwxNDUuNjU2DQoJYzAtMzMuMzc5LDI3LjE1Ni02MC41MzQsNjAuNTM0LTYwLjUzNGMzMy4yMTMsMCw2MC4yNjUsMjYuODksNjAuNTMyLDYwLjA0MmwtMzIuMTE4LTE4Ljg3Yy00LjIxMS0yLjQ3NC05LjU5Mi0xLjU0NC0xMi43MjgsMi4xOTkNCgljLTEyLjg1OCwxNS4zNDQtMzEuNzEzLDI0LjE0My01MS43MzIsMjQuMTQzSDE2OC43MXYtMy44NjFMMTY4LjcxLDE0NS42NTZMMTY4LjcxLDE0NS42NTZ6IE0xNjguNzEsMTkyLjU5M3YtMTkuOTU5aDI0LjQ4Nw0KCWMyMy4wODYsMCw0NC45NzctOS4wMjcsNjEuMjY0LTI1LjAyNGwzNS4zMTcsMjAuNzQ4djI0LjIzNmMwLDMzLjM3OC0yNy4xNTYsNjAuNTM0LTYwLjUzNCw2MC41MzQNCglDMTk1Ljg2NiwyNTMuMTI3LDE2OC43MSwyMjUuOTcyLDE2OC43MSwxOTIuNTkzeiBNMzEzLjY1OCw0MTIuODQ5YzAsMi40MDMsMC4xMDgsNC43OTIsMC4yNzgsNy4xNzINCgljLTcwLjA4MiwzMS4xNjMtMTUxLjM2NSwyMS4wNzUtMjExLjU0Ny0yNC43NXYtMzMuNDg3YzAtMjYuODMxLDE5LjE1LTQ5Ljg0Niw0NS41MzQtNTQuNzI2bDMyLjA3My01LjkzDQoJYzguNjM5LTEuNTk3LDE2LjEwOS02LjExOCwyMS40NzctMTIuNDIxbDE2LjA1NywxNi4wNTdsLTIwLjk4Miw3OS43NjljLTAuODQ3LDMuMjE5LTAuMDM3LDYuNjQ1LDIuMTYsOS4xNDVsMjMuMTcyLDI2LjM2MQ0KCWMxLjg5OSwyLjE2LDQuNjM1LDMuMzk2LDcuNTExLDMuMzk2czUuNjEyLTEuMjM5LDcuNTEtMy4zOThsMjMuMTYzLTI2LjM2MWMyLjE5Ni0yLjQ5OSwzLjAwNS01LjkyNywyLjE1OS05LjE0NWwtMjAuOTg4LTc5Ljc2MQ0KCWwxNS45MDQtMTUuOTA0YzUuMzU4LDYuMjE5LDEyLjc3MywxMC42NzcsMjEuMzQsMTIuMjZsMzIuMDg4LDUuOTMzYzE3LjEyOCwzLjE2NywzMS40NzEsMTMuOTQyLDM5LjMyNSwyOS4yMTYNCglDMzI3Ljc4MSwzNTQuNDc2LDMxMy42NTgsMzgyLjA0NCwzMTMuNjU4LDQxMi44NDl6Ii8+DQo8cGF0aCBkPSJNNDAyLjgxMSw0MjIuODQ4djI1LjE2MmMwLDUuNTIxLDQuNDc2LDkuOTk4LDkuOTk4LDkuOTk4YzUuNTIyLDAsOS45OTgtNC40NzcsOS45OTgtOS45OTh2LTI1LjE2MmgyNS4xNjMNCgljNS41MjIsMCw5Ljk5OC00LjQ3Nyw5Ljk5OC05Ljk5OGMwLTUuNTIxLTQuNDc2LTkuOTk4LTkuOTk4LTkuOTk4aC0yNS4xNjN2LTI1LjE2M2MwLTUuNTIxLTQuNDc2LTkuOTk4LTkuOTk4LTkuOTk4DQoJYy01LjUyMiwwLTkuOTk4LDQuNDc3LTkuOTk4LDkuOTk4djI1LjE2M2gtMjUuMTYzYy01LjUyMiwwLTkuOTk4LDQuNDc3LTkuOTk4LDkuOTk4YzAsNS41MjEsNC40NzYsOS45OTgsOS45OTgsOS45OThINDAyLjgxMXoiLz4NCjxwYXRoIGQ9Ik0zNzcuMTI5LDgxLjYzN2MxLjk1NCwxLjk2MSw0LjUxOCwyLjk0Myw3LjA4NCwyLjk0M2MyLjU1MywwLDUuMTA1LTAuOTcxLDcuMDU2LTIuOTE1DQoJYzMuOTEyLTMuODk3LDMuOTI0LTEwLjIyNywwLjAyOC0xNC4xNGwtMC4zOS0wLjM5MWMtMy45MDQtMy45MDQtMTAuMjM2LTMuOTA0LTE0LjE0LDBjLTMuOTA0LDMuOTA0LTMuOTA0LDEwLjIzNSwwLDE0LjE0DQoJTDM3Ny4xMjksODEuNjM3eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" width="100" />  
            <h3>Create an Account &rarr;</h3>
            <P>Unlock the ability to solve and create challenges and view highscores.</P>
          </a>

          <a href="/challenges" className="card">
            {/* <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Im00ODEuMDgxIDQzOC41aC00NTAuMTYyYy0xNy4wNzYgMC0zMC45MTktMTMuODQzLTMwLjkxOS0zMC45MTl2LTI3MC40NzloNTEydjI3MC40NzljMCAxNy4wNzYtMTMuODQzIDMwLjkxOS0zMC45MTkgMzAuOTE5eiIgZmlsbD0iI2E5ZGJmNSIvPjxwYXRoIGQ9Im00ODEuMDk1IDEzNy4xMDJ2MzAxLjM5OGMxNy4wNjkgMCAzMC45MDUtMTMuODQ5IDMwLjkwNS0zMC45MzJ2LTI3MC40NjZ6IiBmaWxsPSIjODhjM2UwIi8+PGcgZmlsbD0iIzQzODA5ZiI+PHBhdGggZD0ibTEwMy44NyAyMzMuOTY3Yy0yLjkyOS0yLjkyOC03LjY3OC0yLjkyOC0xMC42MDYgMGwtNDYuNDMxIDQ2LjQzMWMtMi45MjkgMi45My0yLjkyOSA3LjY3OCAwIDEwLjYwN2w0NS44MTYgNDUuODE2YzEuNDY0IDEuNDY0IDMuMzg0IDIuMTk2IDUuMzAzIDIuMTk2czMuODM5LS43MzIgNS4zMDMtMi4xOTZjMi45MjktMi45MyAyLjkyOS03LjY3OCAwLTEwLjYwN2wtNDAuNTEzLTQwLjUxMyA0MS4xMjctNDEuMTI3YzIuOTMtMi45MjkgMi45My03LjY3OC4wMDEtMTAuNjA3eiIvPjxwYXRoIGQ9Im0yNjQuNTIgMjgwLjM5Ny00Ni40MzEtNDYuNDMxYy0yLjkyOS0yLjkyOC03LjY3OC0yLjkyOC0xMC42MDYgMC0yLjkyOSAyLjkzLTIuOTI5IDcuNjc4IDAgMTAuNjA3bDQxLjEyNyA0MS4xMjctNDAuNTEzIDQwLjUxM2MtMi45MjkgMi45My0yLjkyOSA3LjY3OCAwIDEwLjYwNyAxLjQ2NCAxLjQ2NCAzLjM4NCAyLjE5NiA1LjMwMyAyLjE5NnMzLjgzOS0uNzMyIDUuMzAzLTIuMTk2bDQ1LjgxNy00NS44MTZjMi45MjgtMi45MjkgMi45MjgtNy42NzcgMC0xMC42MDd6Ii8+PHBhdGggZD0ibTE4NS44MTMgMjA2LjA2M2MtMy44NzQtMS40NzEtOC4yMDMuNDc3LTkuNjczIDQuMzUxbC01NC45MDIgMTQ0LjYzOGMtMS40NyAzLjg3Mi40NzggOC4yMDMgNC4zNSA5LjY3My44NzYuMzMzIDEuNzc1LjQ5IDIuNjYuNDkgMy4wMjUgMCA1Ljg3Ni0xLjg0NCA3LjAxMy00Ljg0MWw1NC45MDItMTQ0LjYzOGMxLjQ3LTMuODcyLS40NzctOC4yMDMtNC4zNS05LjY3M3oiLz48L2c+PHBhdGggZD0ibTM4Ni4zMTggMjM0LjIzaC00OC40MTljLTguNTM0IDAtMTUuNDUzLTYuOTE4LTE1LjQ1My0xNS40NTMgMC04LjUzNCA2LjkxOC0xNS40NTMgMTUuNDUzLTE1LjQ1M2g0OC40MTljOC41MzQgMCAxNS40NTMgNi45MTggMTUuNDUzIDE1LjQ1MyAwIDguNTM0LTYuOTE5IDE1LjQ1My0xNS40NTMgMTUuNDUzeiIgZmlsbD0iIzI5Y2VmNiIvPjxwYXRoIGQ9Im00NjUuNjQyIDI5Ni4wNDFoLTEyNy43NDNjLTguNTM0IDAtMTUuNDUzLTYuOTE4LTE1LjQ1My0xNS40NTMgMC04LjUzNCA2LjkxOC0xNS40NTMgMTUuNDUzLTE1LjQ1M2gxMjcuNzQyYzguNTM0IDAgMTUuNDUzIDYuOTE4IDE1LjQ1MyAxNS40NTMuMDAxIDguNTM0LTYuOTE4IDE1LjQ1My0xNS40NTIgMTUuNDUzeiIgZmlsbD0iI2ZmYzMyOCIvPjxwYXRoIGQ9Im00MjcuNjk1IDM1Ny44NTJoLTg5Ljc5NmMtOC41MzQgMC0xNS40NTMtNi45MTgtMTUuNDUzLTE1LjQ1MyAwLTguNTM0IDYuOTE4LTE1LjQ1MyAxNS40NTMtMTUuNDUzaDg5Ljc5NmM4LjUzNCAwIDE1LjQ1MyA2LjkxOCAxNS40NTMgMTUuNDUzIDAgOC41MzQtNi45MTkgMTUuNDUzLTE1LjQ1MyAxNS40NTN6IiBmaWxsPSIjZjc4ZTM2Ii8+PHBhdGggZD0ibTUxMiAxNDcuNzM3aC01MTJ2LTQzLjMxOGMwLTE3LjA3NiAxMy44NDMtMzAuOTE5IDMwLjkxOS0zMC45MTloNDUwLjE2MmMxNy4wNzYgMCAzMC45MTkgMTMuODQzIDMwLjkxOSAzMC45MTl6IiBmaWxsPSIjNDM4MDlmIi8+PHBhdGggZD0ibTQ4MS4wOTUgNzMuNXY3NC4yMzdoMzAuOTA1di00My4zMDVjMC0xNy4wODMtMTMuODM3LTMwLjkzMi0zMC45MDUtMzAuOTMyeiIgZmlsbD0iIzNhNzE5MCIvPjxjaXJjbGUgY3g9IjQ5LjQ1NSIgY3k9IjExMS4xMjYiIGZpbGw9IiMyOWNlZjYiIHI9IjE1LjQ1MyIvPjxjaXJjbGUgY3g9IjEwOS4zNyIgY3k9IjExMS4xMjYiIGZpbGw9IiNmM2YzZjMiIHI9IjE1LjQ1MyIvPjxjaXJjbGUgY3g9IjE2OS4yODUiIGN5PSIxMTEuMTI2IiBmaWxsPSIjZjc4ZTM2IiByPSIxNS40NTMiLz48L2c+PC9zdmc+" width="80" height="80"/> */}
            <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Im01MDQuNSAxNTFoLTQ5N3YtNDJjMC0xNi41NjkgMTMuNDMxLTMwIDMwLTMwaDQzN2MxNi41NjkgMCAzMCAxMy40MzEgMzAgMzB6IiBmaWxsPSIjNDM4MDlmIi8+PHBhdGggZD0ibTQ3NC41IDc5djcyaDMwdi00MmMwLTE2LjU2OS0xMy40MzEtMzAtMzAtMzB6IiBmaWxsPSIjM2E3MTkwIi8+PHBhdGggZD0ibTQ3NC41IDQzM2gtNDM3Yy0xNi41NjkgMC0zMC0xMy40MzEtMzAtMzB2LTI1Mmg0OTd2MjUyYzAgMTYuNTY5LTEzLjQzMSAzMC0zMCAzMHoiIGZpbGw9IiNhOWRiZjUiLz48cGF0aCBkPSJtNDc0LjUgMTUxdjI4MmMxNi41NjkgMCAzMC0xMy40MzEgMzAtMzB2LTI1MnoiIGZpbGw9IiM4OGMzZTAiLz48Y2lyY2xlIGN4PSI1NS41MDciIGN5PSIxMTUuMzcxIiBmaWxsPSIjMjljZWY2IiByPSIxNSIvPjxjaXJjbGUgY3g9IjExMy42NjYiIGN5PSIxMTUuMzcxIiBmaWxsPSIjZjNmM2YzIiByPSIxNSIvPjxjaXJjbGUgY3g9IjE3MS44MjUiIGN5PSIxMTUuMzcxIiBmaWxsPSIjZjc4ZTM2IiByPSIxNSIvPjxwYXRoIGQ9Im0zODIuNSAyMzQuODY4aC00N2MtOC4yODQgMC0xNS02LjcxNi0xNS0xNSAwLTguMjg0IDYuNzE2LTE1IDE1LTE1aDQ3YzguMjg0IDAgMTUgNi43MTYgMTUgMTUgMCA4LjI4NC02LjcxNiAxNS0xNSAxNXoiIGZpbGw9IiMyOWNlZjYiLz48cGF0aCBkPSJtNDU5LjUgMjk0Ljg2OGgtMTI0Yy04LjI4NCAwLTE1LTYuNzE2LTE1LTE1IDAtOC4yODQgNi43MTYtMTUgMTUtMTVoMTI0YzguMjg0IDAgMTUgNi43MTYgMTUgMTUgMCA4LjI4NC02LjcxNiAxNS0xNSAxNXoiIGZpbGw9IiNmZmMzMjgiLz48cGF0aCBkPSJtNDIyLjY2NSAzNTQuODY4aC04Ny4xNjVjLTguMjg0IDAtMTUtNi43MTYtMTUtMTUgMC04LjI4NCA2LjcxNi0xNSAxNS0xNWg4Ny4xNjVjOC4yODQgMCAxNSA2LjcxNiAxNSAxNSAwIDguMjg0LTYuNzE2IDE1LTE1IDE1eiIgZmlsbD0iI2Y3OGUzNiIvPjxnPjxwYXRoIGQ9Im00NzQuNSA3MS41aC0yNi4yNjFjLTQuMTQzIDAtNy41IDMuMzU3LTcuNSA3LjVzMy4zNTcgNy41IDcuNSA3LjVoMjYuMjYxYzEyLjQwNiAwIDIyLjUgMTAuMDk0IDIyLjUgMjIuNXYzNC41aC00ODJ2LTM0LjVjMC0xMi40MDYgMTAuMDkzLTIyLjUgMjIuNS0yMi41aDM3Ny44MDljNC4xNDMgMCA3LjUtMy4zNTcgNy41LTcuNXMtMy4zNTctNy41LTcuNS03LjVoLTM3Ny44MDljLTIwLjY3OCAwLTM3LjUgMTYuODIyLTM3LjUgMzcuNXY4Mi42ODFjMCA0LjE0MyAzLjM1OCA3LjUgNy41IDcuNXM3LjUtMy4zNTcgNy41LTcuNXYtMzMuMTgxaDQ4MnYxOTMuMzY2YzAgNC4xNDMgMy4zNTcgNy41IDcuNSA3LjVzNy41LTMuMzU3IDcuNS03LjV2LTI0Mi44NjZjMC0yMC42NzgtMTYuODIyLTM3LjUtMzcuNS0zNy41eiIvPjxwYXRoIGQ9Im01MDQuNSAzNzUuOTk0Yy00LjE0MyAwLTcuNSAzLjM1Ny03LjUgNy41djE5LjUwNmMwIDEyLjQwNi0xMC4wOTQgMjIuNS0yMi41IDIyLjVoLTQzN2MtMTIuNDA3IDAtMjIuNS0xMC4wOTQtMjIuNS0yMi41di0xNzkuMTMzYzAtNC4xNDMtMy4zNTgtNy41LTcuNS03LjVzLTcuNSAzLjM1Ny03LjUgNy41djE3OS4xMzNjMCAyMC42NzggMTYuODIyIDM3LjUgMzcuNSAzNy41aDQzN2MyMC42NzggMCAzNy41LTE2LjgyMiAzNy41LTM3LjV2LTE5LjUwNmMwLTQuMTQyLTMuMzU3LTcuNS03LjUtNy41eiIvPjxwYXRoIGQ9Im0xMDguNDgyIDIzNC40NTdjLTIuOTI5LTIuOTI4LTcuNjc4LTIuOTI4LTEwLjYwNiAwbC00NS4wNyA0NS4wN2MtMS40MDcgMS40MDctMi4xOTcgMy4zMTQtMi4xOTcgNS4zMDRzLjc5IDMuODk2IDIuMTk3IDUuMzA0bDQ0LjQ3NCA0NC40NzRjMS40NjQgMS40NjQgMy4zODQgMi4xOTYgNS4zMDMgMi4xOTZzMy44MzktLjczMiA1LjMwMy0yLjE5NmMyLjkyOS0yLjkzIDIuOTI5LTcuNjc4IDAtMTAuNjA3bC0zOS4xNzEtMzkuMTcgMzkuNzY3LTM5Ljc2N2MyLjkzLTIuOTMgMi45My03LjY3OCAwLTEwLjYwOHoiLz48cGF0aCBkPSJtMjA5LjM0NCAzMzQuNjA4YzEuNDY0IDEuNDY0IDMuMzg0IDIuMTk2IDUuMzAzIDIuMTk2czMuODM5LS43MzIgNS4zMDMtMi4xOTZsNDQuNDc1LTQ0LjQ3NGMxLjQwNi0xLjQwNyAyLjE5Ni0zLjMxNCAyLjE5Ni01LjMwNHMtLjc5LTMuODk2LTIuMTk2LTUuMzA0bC00NS4wNzEtNDUuMDdjLTIuOTI5LTIuOTI4LTcuNjc4LTIuOTI4LTEwLjYwNiAwLTIuOTI5IDIuOTMtMi45MjkgNy42NzggMCAxMC42MDdsMzkuNzY4IDM5Ljc2Ny0zOS4xNzEgMzkuMTdjLTIuOTMgMi45MzEtMi45MyA3LjY3OS0uMDAxIDEwLjYwOHoiLz48cGF0aCBkPSJtMTMxLjk5IDM2Mi4yMzRjMy4wMjUgMCA1Ljg3Ni0xLjg0NCA3LjAxMy00Ljg0MWw1My4yOTQtMTQwLjM5OGMxLjQ3LTMuODczLS40NzgtOC4yMDQtNC4zNS05LjY3NC0zLjg3Mi0xLjQ3MS04LjIwNC40NzgtOS42NzMgNC4zNWwtNTMuMjk0IDE0MC40Yy0xLjQ3IDMuODcyLjQ3OCA4LjIwMyA0LjM1IDkuNjczLjg3Ni4zMzMgMS43NzUuNDkgMi42Ni40OXoiLz48cGF0aCBkPSJtMzMuMDA2IDExNS4zNzFjMCAxMi40MDYgMTAuMDkzIDIyLjUgMjIuNSAyMi41czIyLjUtMTAuMDk0IDIyLjUtMjIuNS0xMC4wOTMtMjIuNS0yMi41LTIyLjUtMjIuNSAxMC4wOTQtMjIuNSAyMi41em0zMCAwYzAgNC4xMzYtMy4zNjQgNy41LTcuNSA3LjVzLTcuNS0zLjM2NC03LjUtNy41IDMuMzY0LTcuNSA3LjUtNy41IDcuNSAzLjM2NCA3LjUgNy41eiIvPjxwYXRoIGQ9Im05MS4xNjYgMTE1LjM3MWMwIDEyLjQwNiAxMC4wOTMgMjIuNSAyMi41IDIyLjVzMjIuNS0xMC4wOTQgMjIuNS0yMi41LTEwLjA5My0yMi41LTIyLjUtMjIuNS0yMi41IDEwLjA5NC0yMi41IDIyLjV6bTMwIDBjMCA0LjEzNi0zLjM2NCA3LjUtNy41IDcuNXMtNy41LTMuMzY0LTcuNS03LjUgMy4zNjQtNy41IDcuNS03LjUgNy41IDMuMzY0IDcuNSA3LjV6Ii8+PHBhdGggZD0ibTE0OS4zMjUgMTE1LjM3MWMwIDEyLjQwNiAxMC4wOTMgMjIuNSAyMi41IDIyLjVzMjIuNS0xMC4wOTQgMjIuNS0yMi41LTEwLjA5My0yMi41LTIyLjUtMjIuNS0yMi41IDEwLjA5NC0yMi41IDIyLjV6bTMwIDBjMCA0LjEzNi0zLjM2NCA3LjUtNy41IDcuNXMtNy41LTMuMzY0LTcuNS03LjUgMy4zNjQtNy41IDcuNS03LjUgNy41IDMuMzY0IDcuNSA3LjV6Ii8+PHBhdGggZD0ibTMzNS41IDI0Mi4zNjhoNDdjMTIuNDA2IDAgMjIuNS0xMC4wOTQgMjIuNS0yMi41cy0xMC4wOTQtMjIuNS0yMi41LTIyLjVoLTQ3Yy0xMi40MDYgMC0yMi41IDEwLjA5NC0yMi41IDIyLjVzMTAuMDk0IDIyLjUgMjIuNSAyMi41em0wLTMwaDQ3YzQuMTM2IDAgNy41IDMuMzY0IDcuNSA3LjVzLTMuMzY0IDcuNS03LjUgNy41aC00N2MtNC4xMzYgMC03LjUtMy4zNjQtNy41LTcuNXMzLjM2NC03LjUgNy41LTcuNXoiLz48cGF0aCBkPSJtMzM1LjUgMzAyLjM2OGgxMjRjMTIuNDA2IDAgMjIuNS0xMC4wOTQgMjIuNS0yMi41cy0xMC4wOTQtMjIuNS0yMi41LTIyLjVoLTEyNGMtMTIuNDA2IDAtMjIuNSAxMC4wOTQtMjIuNSAyMi41czEwLjA5NCAyMi41IDIyLjUgMjIuNXptMC0zMGgxMjRjNC4xMzYgMCA3LjUgMy4zNjQgNy41IDcuNXMtMy4zNjQgNy41LTcuNSA3LjVoLTEyNGMtNC4xMzYgMC03LjUtMy4zNjQtNy41LTcuNXMzLjM2NC03LjUgNy41LTcuNXoiLz48cGF0aCBkPSJtMzM1LjUgMzYyLjM2OGg4Ny4xNjVjMTIuNDA2IDAgMjIuNS0xMC4wOTQgMjIuNS0yMi41cy0xMC4wOTQtMjIuNS0yMi41LTIyLjVoLTg3LjE2NWMtMTIuNDA2IDAtMjIuNSAxMC4wOTQtMjIuNSAyMi41czEwLjA5NCAyMi41IDIyLjUgMjIuNXptMC0zMGg4Ny4xNjVjNC4xMzYgMCA3LjUgMy4zNjQgNy41IDcuNXMtMy4zNjQgNy41LTcuNSA3LjVoLTg3LjE2NWMtNC4xMzYgMC03LjUtMy4zNjQtNy41LTcuNXMzLjM2NC03LjUgNy41LTcuNXoiLz48L2c+PC9nPjwvc3ZnPg==" width="100" />
            <h3>Solve &rarr;</h3>
            <P>Submit your own solutions to challenges! Beat other highscores!</P>
          </a>
          <a href='/createChallenge' className="card">
            <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ4MHB0IiB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgd2lkdGg9IjQ4MHB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0xMDQgOGgyNzJjMTcuNjcxODc1IDAgMzIgMTQuMzI4MTI1IDMyIDMydjM1MmMwIDE3LjY3MTg3NS0xNC4zMjgxMjUgMzItMzIgMzJoLTI3MmMtMTcuNjcxODc1IDAtMzItMTQuMzI4MTI1LTMyLTMydi0zNTJjMC0xNy42NzE4NzUgMTQuMzI4MTI1LTMyIDMyLTMyem0wIDAiIGZpbGw9IiM4N2NlZDkiLz48cGF0aCBkPSJtNzIgMzkyYzAgMTcuNjcxODc1IDE0LjMyODEyNSAzMiAzMiAzMmgxMjkuMzM1OTM4bC0xNjEuMzM1OTM4LTE2MS4zMzU5Mzh6bTAgMCIgZmlsbD0iIzcxYzRkMSIvPjxwYXRoIGQ9Im05NiAzMmgxNnYxNmgtMTZ6bTAgMCIgZmlsbD0iIzVlYjNkMSIvPjxwYXRoIGQ9Im0xMjggMzJoMTZ2MTZoLTE2em0wIDAiIGZpbGw9IiM1ZWIzZDEiLz48cGF0aCBkPSJtMTYwIDMyaDE2djE2aC0xNnptMCAwIiBmaWxsPSIjNWViM2QxIi8+PHBhdGggZD0ibTIxNiAzMTJoMjU2djY0aC0yNTZ6bTAgMCIgZmlsbD0iI2ZkYjYyZiIvPjxnIGZpbGw9IiNmZDg4MmYiPjxwYXRoIGQ9Im00MzIgMzEyaDE2djI0aC0xNnptMCAwIi8+PHBhdGggZD0ibTQwMCAzMTJoMTZ2MjRoLTE2em0wIDAiLz48cGF0aCBkPSJtMzY4IDMxMmgxNnYyNGgtMTZ6bTAgMCIvPjxwYXRoIGQ9Im0zMzYgMzEyaDE2djI0aC0xNnptMCAwIi8+PHBhdGggZD0ibTMwNCAzMTJoMTZ2MjRoLTE2em0wIDAiLz48cGF0aCBkPSJtMjcyIDMxMmgxNnYyNGgtMTZ6bTAgMCIvPjxwYXRoIGQ9Im0yNDAgMzEyaDE2djI0aC0xNnptMCAwIi8+PC9nPjxwYXRoIGQ9Im04IDIyNHYyNDhoMjQ4em00OCAxMjAgODAgODBoLTgwem0wIDAiIGZpbGw9IiNlODU5NGEiLz48cGF0aCBkPSJtMzYwIDI4OGgtMTc2Yy00LjQxNzk2OSAwLTgtMy41ODIwMzEtOC04di0xNDRjMC00LjQxNzk2OSAzLjU4MjAzMS04IDgtOGgxNzZjNC40MTc5NjkgMCA4IDMuNTgyMDMxIDggOHYxNDRjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOHptLTE2OC0xNmgxNjB2LTEyOGgtMTYwem0wIDAiIGZpbGw9IiM1ZWIzZDEiLz48cGF0aCBkPSJtMTg0IDI0OGMtNDguNjAxNTYyIDAtODgtMzkuMzk4NDM4LTg4LTg4czM5LjM5ODQzOC04OCA4OC04OCA4OCAzOS4zOTg0MzggODggODhjLS4wNTQ2ODggNDguNTc4MTI1LTM5LjQyMTg3NSA4Ny45NDUzMTItODggODh6bTAtMTYwYy0zOS43NjU2MjUgMC03MiAzMi4yMzQzNzUtNzIgNzJzMzIuMjM0Mzc1IDcyIDcyIDcyIDcyLTMyLjIzNDM3NSA3Mi03MmMtLjA0Njg3NS0zOS43NDYwOTQtMzIuMjUzOTA2LTcxLjk1MzEyNS03Mi03MnptMCAwIiBmaWxsPSIjNWViM2QxIi8+PHBhdGggZD0ibTQ0OS4zNzUgMjRjMTIuNDk2MDk0IDAgMjIuNjI1IDEwLjEyODkwNiAyMi42MjUgMjIuNjI1IDAgNi0yLjM4MjgxMiAxMS43NTM5MDYtNi42MjUgMTZsLTEzNy4zNzUgMTM3LjM3NS00MCA4IDgtNDAgMTM3LjM3NS0xMzcuMzc1YzQuMjQ2MDk0LTQuMjQyMTg4IDEwLTYuNjI1IDE2LTYuNjI1em0wIDAiIGZpbGw9IiM0Mzk4ZDEiLz48cGF0aCBkPSJtNDE4LjM0NzY1NiA0NS42NjAxNTYgMTEuMzEyNS0xMS4zMTY0MDYgMzIgMzItMTEuMzEyNSAxMS4zMTY0MDZ6bTAgMCIgZmlsbD0iIzEyNjA5OSIvPjxwYXRoIGQ9Im0yOTAuMzQ3NjU2IDE3My42NjAxNTYgMTEuMzEyNS0xMS4zMTI1IDMyIDMyLTExLjMxMjUgMTEuMzE2NDA2em0wIDAiIGZpbGw9IiMxMjYwOTkiLz48cGF0aCBkPSJtMjE2IDM3NmgxOTJ2MTZoLTE5MnptMCAwIiBmaWxsPSIjNzFjNGQxIi8+PHBhdGggZD0ibTk2IDMyaDE2djE2aC0xNnptMCAwIi8+PHBhdGggZD0ibTEyOCAzMmgxNnYxNmgtMTZ6bTAgMCIvPjxwYXRoIGQ9Im0xNjAgMzJoMTZ2MTZoLTE2em0wIDAiLz48cGF0aCBkPSJtOCA0ODBoMjQ4YzMuMjM0Mzc1IDAgNi4xNTIzNDQtMS45NDkyMTkgNy4zOTA2MjUtNC45Mzc1cy41NTA3ODEtNi40Mjk2ODgtMS43MzQzNzUtOC43MTg3NWwtMjQ4LTI0OGMtMi4yODkwNjItMi4yODUxNTYtNS43MzA0NjktMi45NzI2NTYtOC43MTg3NS0xLjczNDM3NXMtNC45Mzc1IDQuMTU2MjUtNC45Mzc1IDcuMzkwNjI1djI0OGMwIDQuNDE3OTY5IDMuNTgyMDMxIDggOCA4em04LTIzNi42ODc1IDIyMC42ODc1IDIyMC42ODc1aC0yMjAuNjg3NXptMCAwIi8+PHBhdGggZD0ibTE0MS42NTYyNSA0MTguMzQzNzUtODAtODBjLTIuMjg5MDYyLTIuMjg1MTU2LTUuNzMwNDY5LTIuOTcyNjU2LTguNzE4NzUtMS43MzQzNzVzLTQuOTM3NSA0LjE1NjI1LTQuOTM3NSA3LjM5MDYyNXY4MGMwIDQuNDE3OTY5IDMuNTgyMDMxIDggOCA4aDgwYzMuMjM0Mzc1IDAgNi4xNTIzNDQtMS45NDkyMTkgNy4zOTA2MjUtNC45Mzc1cy41NTA3ODEtNi40Mjk2ODgtMS43MzQzNzUtOC43MTg3NXptLTc3LjY1NjI1LTIuMzQzNzV2LTUyLjY4NzVsNTIuNjg3NSA1Mi42ODc1em0wIDAiLz48cGF0aCBkPSJtNDcxLjAyMzQzOCA2OC4yODkwNjJjMTEuOTYwOTM3LTExLjk2MDkzNyAxMS45NjA5MzctMzEuMzUxNTYyIDAtNDMuMzEyNS0xMS45NjA5MzgtMTEuOTYwOTM3LTMxLjM1MTU2My0xMS45NjA5MzctNDMuMzEyNSAwbC0xMiAxMmMtMS41NDI5NjktMjAuODA4NTkzLTE4Ljg0Mzc1LTM2LjkyMTg3NDUtMzkuNzEwOTM4LTM2Ljk3NjU2MmgtMjcyYy0yMi4wODIwMzEuMDI3MzQzOC0zOS45NzI2NTYgMTcuOTE3OTY5LTQwIDQwdjIwOGgxNnYtMjA4YzAtMTMuMjUzOTA2IDEwLjc0NjA5NC0yNCAyNC0yNGgyNzJjMTMuMjUzOTA2IDAgMjQgMTAuNzQ2MDk0IDI0IDI0djEyLjY4NzVsLTc1LjMxMjUgNzUuMzEyNWgtNTguODAwNzgxYy0xNS43NzM0MzgtNDAuMzg2NzE5LTU4LjYyNS02My4yNTc4MTItMTAwLjk1NzAzMS01My44NzUtNDIuMzM1OTM4IDkuMzc4OTA2LTcxLjUxNTYyNiA0OC4yMDcwMzEtNjguNzUzOTA3IDkxLjQ3NjU2MiAyLjc2MTcxOSA0My4yNzM0MzggMzYuNjQ0NTMxIDc4LjA3ODEyNiA3OS44MjQyMTkgODJ2MzIuMzk4NDM4YzAgNC40MTc5NjkgMy41ODIwMzEgOCA4IDhoMTc2YzQuNDE3OTY5IDAgOC0zLjU4MjAzMSA4LTh2LTEwOC42ODc1bDMyLTMydjE2NC42ODc1aC0xODRjLTQuNDE3OTY5IDAtOCAzLjU4MjAzMS04IDh2NjRjMCA0LjQxNzk2OSAzLjU4MjAzMSA4IDggOGgxODR2OGMwIDEzLjI1MzkwNi0xMC43NDYwOTQgMjQtMjQgMjRoLTEyOHYxNmgxMjhjMjIuMDgyMDMxLS4wMjczNDQgMzkuOTcyNjU2LTE3LjkxNzk2OSA0MC00MHYtOGg1NmM0LjQxNzk2OSAwIDgtMy41ODIwMzEgOC04di02NGMwLTQuNDE3OTY5LTMuNTgyMDMxLTgtOC04aC01NnYtMTgwLjY4NzV6bS03LjAyMzQzOCAyOTkuNzEwOTM4aC0yNDB2LTQ4aDE2djE2aDE2di0xNmgxNnYxNmgxNnYtMTZoMTZ2MTZoMTZ2LTE2aDE2djE2aDE2di0xNmgxNnYxNmgxNnYtMTZoMTZ2MTZoMTZ2LTE2aDE2djE2aDE2di0xNmgxNnptLTE2My4wODk4NDQtMTgzLjc3NzM0NCAxMC44NjcxODggMTAuODY3MTg4LTEzLjYwMTU2MyAyLjcxMDkzN3ptMjcuMDg5ODQ0IDQuNDY0ODQ0LTIwLjY4NzUtMjAuNjg3NSAxMTYuNjg3NS0xMTYuNjg3NSAyMC42ODc1IDIwLjY4NzV6bTEyMS4zNjcxODgtMTU2LjY4NzVjNS45MTc5NjggMCAxMS4yNSAzLjU2NjQwNiAxMy41MTU2MjQgOS4wMzUxNTYgMi4yNjE3MTkgNS40NjQ4NDQgMS4wMTE3MTkgMTEuNzU3ODEzLTMuMTcxODc0IDE1Ljk0MTQwNmwtMy43MTA5MzggMy43MTA5MzgtMjAuNjg3NS0yMC42ODc1IDMuNzEwOTM4LTMuNzEwOTM4YzIuNzM4MjgxLTIuNzUzOTA2IDYuNDYwOTM3LTQuMzAwNzgxIDEwLjM0Mzc1LTQuMjg5MDYyem0tMzM3LjM2NzE4OCAxMjhjLS4wMzUxNTYtMzMuNDI5Njg4IDIyLjk2MDkzOC02Mi40NzY1NjIgNTUuNTAzOTA2LTcwLjEwOTM3NSAzMi41NDY4NzUtNy42MzY3MTkgNjYuMDYyNSA4LjE1MjM0NCA4MC44OTQ1MzIgMzguMTA5Mzc1aC02NC4zOTg0MzhjLTQuNDE3OTY5IDAtOCAzLjU4MjAzMS04IDh2OTUuNTI3MzQ0Yy0zNi40MTQwNjItNC4xMDU0NjktNjMuOTQ5MjE5LTM0Ljg4MjgxMy02NC03MS41MjczNDR6bTE0NCAwYy0uMDUwNzgxIDM2LjY0NDUzMS0yNy41ODU5MzggNjcuNDIxODc1LTY0IDcxLjUyNzM0NHYtODcuNTI3MzQ0aDYyLjE0NDUzMWMxLjIxNDg0NCA1LjI0NjA5NCAxLjgzOTg0NCAxMC42MTMyODEgMS44NTU0NjkgMTZ6bTk2IDExMmgtMTYwdi0yNC4zOTg0MzhjMjQuNjY3OTY5LTIuMTYwMTU2IDQ3LjI2OTUzMS0xNC42NTIzNDMgNjIuMjIyNjU2LTM0LjM5MDYyNCAxNC45NDkyMTktMTkuNzM4MjgyIDIwLjg1MTU2My00NC44ODI4MTMgMTYuMjUtNjkuMjEwOTM4aDM4LjIxNDg0NGwtMTguMzQzNzUgMTguMzQzNzVjLTEuMTE3MTg4IDEuMTEzMjgxLTEuODc4OTA2IDIuNTM5MDYyLTIuMTgzNTk0IDQuMDg5ODQ0bC04IDQwYy0uNDY4NzUgMi4zNDc2NTYuMTM2NzE5IDQuNzg1MTU2IDEuNjU2MjUgNi42MzY3MTggMS41MTk1MzIgMS44NTE1NjMgMy43ODkwNjMgMi45Mjk2ODggNi4xODM1OTQgMi45Mjk2ODguNTM5MDYyLjAwMzkwNiAxLjA3NDIxOS0uMDUwNzgxIDEuNjAxNTYyLS4xNjAxNTZsNDAtOGMxLjU0Njg3Ni0uMzA0Njg4IDIuOTcyNjU3LTEuMDY2NDA2IDQuMDg1OTM4LTIuMTgzNTk0bDE4LjMxMjUtMTguMzQzNzV6bTAgMCIvPjwvc3ZnPg==" width="100"/>

            <h3>Contribute  &rarr;</h3>
            <P>Create a coding challenge of your own that other users can have a crack at!</P>
          </a>
          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iRmlsbF9vdXRfbGluZSIgZGF0YS1uYW1lPSJGaWxsIG91dCBsaW5lIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPjxwYXRoIGQ9Ik00ODgsMjE2YTg4LjAwMTMsODguMDAxMywwLDAsMS04OCw4OEgxMTJBODguMDExODUsODguMDExODUsMCwwLDEsOTQuNTMsMTI5LjczYy42Mzk4OS0uMTMsMS4yOS0uMjUsMS45Mjk5My0uMzdBNDcuOTk0NjUsNDcuOTk0NjUsMCwwLDEsMTQ0LDg4Yy42ODk5NCwwLDEuMzc5ODguMDEsMi4wNzAwNy4wNWE0Ny42Mzg5NCw0Ny42Mzg5NCwwLDAsMSwxNi4zMjAwNywzLjYsMTM2LjA0NSwxMzYuMDQ1LDAsMCwxLDI1MC4wMjk3OCwzNy4yM0E4Ny45NTQ3MSw4Ny45NTQ3MSwwLDAsMSw0ODgsMjE2WiIgc3R5bGU9ImZpbGw6IzhhY2NlNyIvPjxyZWN0IHg9IjY0IiB5PSIzMjgiIHdpZHRoPSIxNjgiIGhlaWdodD0iNjQiIHJ4PSIyNCIgcnk9IjI0IiBzdHlsZT0iZmlsbDojMmQ4MGIzIi8+PHJlY3QgeD0iNjQiIHk9IjI2NCIgd2lkdGg9IjE2OCIgaGVpZ2h0PSI2NCIgcng9IjI0IiByeT0iMjQiIHN0eWxlPSJmaWxsOiMyZDgwYjMiLz48cmVjdCB4PSI2NCIgeT0iMjAwIiB3aWR0aD0iMTY4IiBoZWlnaHQ9IjY0IiByeD0iMjQiIHJ5PSIyNCIgc3R5bGU9ImZpbGw6IzJkODBiMyIvPjxwYXRoIGQ9Ik0zNjAsMjQwaDY0YTI0LDI0LDAsMCwxLDI0LDI0djMySDM2MFoiIHN0eWxlPSJmaWxsOiNlZWJlMzMiLz48cGF0aCBkPSJNMzM2LDI2NHY0OGEyNCwyNCwwLDAsMCwyNCwyNGg2NGEyNCwyNCwwLDAsMCwyNC0yNFYyOTZhMjQsMjQsMCwwLDAtMjQtMjRINDA2LjgzMjgyYTI0LDI0LDAsMCwxLTIxLjQ2NjI2LTEzLjI2Njg3bC0yLjczMzEyLTUuNDY2MjZBMjQsMjQsMCwwLDAsMzYxLjE2NzE4LDI0MEgzNjBBMjQsMjQsMCwwLDAsMzM2LDI2NFoiIHN0eWxlPSJmaWxsOiNlZWRjOWEiLz48cGF0aCBkPSJNMzYwLDM5Mmg2NGEyNCwyNCwwLDAsMSwyNCwyNHYzMkgzNjBaIiBzdHlsZT0iZmlsbDojZWViZTMzIi8+PHBhdGggZD0iTTMzNiw0MTZ2NDhhMjQsMjQsMCwwLDAsMjQsMjRoNjRhMjQsMjQsMCwwLDAsMjQtMjRWNDQ4YTI0LDI0LDAsMCwwLTI0LTI0SDQwNi44MzI4MmEyNCwyNCwwLDAsMS0yMS40NjYyNi0xMy4yNjY4N2wtMi43MzMxMi01LjQ2NjI2QTI0LDI0LDAsMCwwLDM2MS4xNjcxOCwzOTJIMzYwQTI0LDI0LDAsMCwwLDMzNiw0MTZaIiBzdHlsZT0iZmlsbDojZWVkYzlhIi8+PHBhdGggZD0iTTQ3Mi4yNDksMTUyLjc4ODA5YTk1Ljk4NzEzLDk1Ljk4NzEzLDAsMCwwLTUzLjM3ODktMzAuOTAzMDhDNDAyLjExODY1LDYwLjkyMTM5LDM0Ni4yMTE0MywxNiwyODAsMTZBMTQ0LjAxOTc4LDE0NC4wMTk3OCwwLDAsMCwxNTguOTE0MDYsODIuMDI0OWE1NS45ODYxMyw1NS45ODYxMywwLDAsMC02OS4yOTMsNDAuNjE1LDk2LjAwNzE2LDk2LjAwNzE2LDAsMCwwLTUxLjY3NDgsMTU0LjQ1Mzg2bDEyLjMzNTk0LTEwLjE4NzVBODAuMDAzODMsODAuMDAzODMsMCwwLDEsMTEyLDEzNmMyLjQyOTY5LDAsNC44Nzk4OC4xMDkzOCw3LjI4MjIzLjMyNjE3bDEuNDM1NTQtMTUuOTM1NTVDMTE3LjgzOTg0LDEyMC4xMzE4NCwxMTQuOTA2MjUsMTIwLDExMiwxMjBxLTIuMzY5LDAtNC43MTA0NS4xMTY3QTM5Ljk3ODcyLDM5Ljk3ODcyLDAsMCwxLDE1MC43MDcsOTYuNTY4ODVjLTIuMDEwMjUsNC4xMDA1OC0zLjg1MzUxLDguMjk3ODUtNS40Nzk0OSwxMi42MDY5M2wxNC45NzA3LDUuNjQ4NDRBMTI4LjAyMywxMjguMDIzLDAsMCwxLDQwOCwxNjBoMTZhMTQ0LjU1NTMzLDE0NC41NTUzMywwLDAsMC0xLjUwMzQyLTIwLjc2OTc4QTgwLjM5NjExLDgwLjM5NjExLDAsMCwxLDQ4MCwyMTZhNzkuNDc5LDc5LjQ3OSwwLDAsMS0xNC41NDEsNDYuMDAybDEzLjA4Miw5LjIxMjg5YTk2LjAxNDEyLDk2LjAxNDEyLDAsMCwwLTYuMjkyLTExOC40MjY3NVoiLz48Y2lyY2xlIGN4PSI4OCIgY3k9IjM2MCIgcj0iOCIvPjxjaXJjbGUgY3g9IjExMiIgY3k9IjM2MCIgcj0iOCIvPjxjaXJjbGUgY3g9IjEzNiIgY3k9IjM2MCIgcj0iOCIvPjxyZWN0IHg9IjE2MCIgeT0iMzUyIiB3aWR0aD0iNDgiIGhlaWdodD0iMTYiLz48Y2lyY2xlIGN4PSI4OCIgY3k9IjI5NiIgcj0iOCIvPjxjaXJjbGUgY3g9IjExMiIgY3k9IjI5NiIgcj0iOCIvPjxjaXJjbGUgY3g9IjEzNiIgY3k9IjI5NiIgcj0iOCIvPjxyZWN0IHg9IjE2MCIgeT0iMjg4IiB3aWR0aD0iNDgiIGhlaWdodD0iMTYiLz48cGF0aCBkPSJNMjA4LDE5Mkg4OGEzMi4wMzY2NywzMi4wMzY2NywwLDAsMC0zMiwzMnYxNmEzMS45MjUsMzEuOTI1LDAsMCwwLDEwLjg2ODE2LDI0QTMxLjkyNSwzMS45MjUsMCwwLDAsNTYsMjg4djE2YTMxLjkyNSwzMS45MjUsMCwwLDAsMTAuODY4MTYsMjRBMzEuOTI1LDMxLjkyNSwwLDAsMCw1NiwzNTJ2MTZhMzIuMDM2NjcsMzIuMDM2NjcsMCwwLDAsMzIsMzJIMjA4YTMyLjAzNjY3LDMyLjAzNjY3LDAsMCwwLDMyLTMyVjM1MmEzMS45MjUsMzEuOTI1LDAsMCwwLTEwLjg2ODE2LTI0QTMxLjkyNSwzMS45MjUsMCwwLDAsMjQwLDMwNFYyODhhMzEuOTI1LDMxLjkyNSwwLDAsMC0xMC44NjgxNi0yNEEzMS45MjUsMzEuOTI1LDAsMCwwLDI0MCwyNDBWMjI0QTMyLjAzNjY3LDMyLjAzNjY3LDAsMCwwLDIwOCwxOTJabTE2LDE2MHYxNmExNi4wMTgzMywxNi4wMTgzMywwLDAsMS0xNiwxNkg4OGExNi4wMTgzMywxNi4wMTgzMywwLDAsMS0xNi0xNlYzNTJhMTYuMDE4MzMsMTYuMDE4MzMsMCwwLDEsMTYtMTZIMjA4QTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLDIyNCwzNTJabTAtNjR2MTZhMTYuMDE4MzMsMTYuMDE4MzMsMCwwLDEtMTYsMTZIODhhMTYuMDE4MzMsMTYuMDE4MzMsMCwwLDEtMTYtMTZWMjg4YTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLDE2LTE2SDIwOEExNi4wMTgzMywxNi4wMTgzMywwLDAsMSwyMjQsMjg4Wk04OCwyNTZhMTYuMDE4MzMsMTYuMDE4MzMsMCwwLDEtMTYtMTZWMjI0YTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLDE2LTE2SDIwOGExNi4wMTgzMywxNi4wMTgzMywwLDAsMSwxNiwxNnYxNmExNi4wMTgzMywxNi4wMTgzMywwLDAsMS0xNiwxNloiLz48Y2lyY2xlIGN4PSI4OCIgY3k9IjIzMiIgcj0iOCIvPjxjaXJjbGUgY3g9IjExMiIgY3k9IjIzMiIgcj0iOCIvPjxjaXJjbGUgY3g9IjEzNiIgY3k9IjIzMiIgcj0iOCIvPjxyZWN0IHg9IjE2MCIgeT0iMjI0IiB3aWR0aD0iNDgiIGhlaWdodD0iMTYiLz48cGF0aCBkPSJNNDI0LDIzMkgzNjBhMzIuMDM2NjcsMzIuMDM2NjcsMCwwLDAtMzIsMzJ2NDhhMzIuMDM2NjcsMzIuMDM2NjcsMCwwLDAsMzIsMzJoNjRhMzIuMDM2NjcsMzIuMDM2NjcsMCwwLDAsMzItMzJWMjY0QTMyLjAzNjY3LDMyLjAzNjY3LDAsMCwwLDQyNCwyMzJabTE2LDMydjQuMzA1MThBMzEuNzkyLDMxLjc5MiwwLDAsMCw0MjQsMjY0SDQwNi44MzNhMTUuOTEwODksMTUuOTEwODksMCwwLDEtMTQuMzEwNTUtOC44NDM3NWwtMi43MzM0LTUuNDY3NzdjLS4yODgzMy0uNTc2NjYtLjYwMDEtMS4xMzUyNi0uOTE4Ny0xLjY4ODQ4SDQyNEExNi4wMTgzMywxNi4wMTgzMywwLDAsMSw0NDAsMjY0Wm0wLDQ4YTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLTE2LDE2SDM2MGExNi4wMTgzMywxNi4wMTgzMywwLDAsMS0xNi0xNlYyNjRhMTYuMDE4MzMsMTYuMDE4MzMsMCwwLDEsMTYtMTZoMS4xNjdhMTUuOTEwODksMTUuOTEwODksMCwwLDEsMTQuMzEwNTUsOC44NDM3NWwyLjczMzQsNS40Njc3N0EzMS44MjYzLDMxLjgyNjMsMCwwLDAsNDA2LjgzMywyODBINDI0YTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLDE2LDE2WiIvPjxwYXRoIGQ9Ik00MjQsMzg0SDM2MGEzMi4wMzY2NywzMi4wMzY2NywwLDAsMC0zMiwzMnY0OGEzMi4wMzY2NywzMi4wMzY2NywwLDAsMCwzMiwzMmg2NGEzMi4wMzY2NywzMi4wMzY2NywwLDAsMCwzMi0zMlY0MTZBMzIuMDM2NjcsMzIuMDM2NjcsMCwwLDAsNDI0LDM4NFptMTYsMzJ2NC4zMDUxOEEzMS43OTIsMzEuNzkyLDAsMCwwLDQyNCw0MTZINDA2LjgzM2ExNS45MTA4OSwxNS45MTA4OSwwLDAsMS0xNC4zMTA1NS04Ljg0Mzc1bC0yLjczMzQtNS40Njc3N2MtLjI4ODMzLS41NzY2Ni0uNjAwMS0xLjEzNTI2LS45MTg3LTEuNjg4NDhINDI0QTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLDQ0MCw0MTZabTAsNDhhMTYuMDE4MzMsMTYuMDE4MzMsMCwwLDEtMTYsMTZIMzYwYTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLTE2LTE2VjQxNmExNi4wMTgzMywxNi4wMTgzMywwLDAsMSwxNi0xNmgxLjE2N2ExNS45MTA4OSwxNS45MTA4OSwwLDAsMSwxNC4zMTA1NSw4Ljg0Mzc1bDIuNzMzNCw1LjQ2Nzc3QTMxLjgyNjMsMzEuODI2MywwLDAsMCw0MDYuODMzLDQzMkg0MjRhMTYuMDE4MzMsMTYuMDE4MzMsMCwwLDEsMTYsMTZaIi8+PHBhdGggZD0iTTI0OCwyODB2MTZoMjRWNDQ4YTguMDAwMzksOC4wMDAzOSwwLDAsMCw4LDhoMzJWNDQwSDI4OFYyOTZoMjRWMjgwSDI0OFoiLz48L3N2Zz4K" width="100" />
            <h3>Documentation &rarr;</h3>
            <P>
              Get in-depth info on the microservices and APIs used to make this app. 
            </P>
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

  @media ${device.sm} {
    flex-basis: 100%;
    min-width: 0px;
  } 
`

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
 

  & .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    flex-basis: 45%;
    min-height: 350px;
    min-width: 500px;
    height: auto;
    padding: 2rem;
    color: white;
    text-decoration: none;
    border: 4px solid black;
    border-radius: 10px;
    background: var(--secondary);
    transition: color 0.15s ease, border-color 0.15s ease;

    @media ${device.sm} {
      flex-basis: 100%;
      min-width: 0px;
    } 

    h3 {
      margin: 1rem 0 1rem 0;
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

const P = styled.p`
  text-align: center;
`;

export default Home;