import React from 'react';
import logo from './tezsure.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <a href="https://tezsure.com/"><img className="logo" src={logo} alt="logo"/></a>
        <h2 className="headerName">
          Tezster-Bundle ; React ~ SmartPy
        </h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
        <a className="App-link" href="https://cryptonomic.github.io/ConseilJS/#/">Learn ConseilJs</a>
      </header>
    </div>
  );
}

export default App;
