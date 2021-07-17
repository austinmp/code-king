import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import fetch from 'node-fetch';
import Header from '../components/Header.js';
import PageContainer from '../components/PageContainer';

function Challenge(props) {
    const { title } = props.match.params
    console.log(title);
    return (
        <PageContainer className='challenge-container'>
            <Header text="Challenge"/>
        </PageContainer>
    );
}


export default Challenge;