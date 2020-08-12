import React from 'react';
import Store from './components/Store';
import Dashboard from './components/Dashboard';
import './App.css';
import styled from 'styled-components';

export const AppContainer = styled.div`
  text-align: center;
`

function App() {
  return (
    <AppContainer>
      <Store>
        <Dashboard />
      </Store>
    </AppContainer>
  );
}

export default App;
