import React from "react";
import logo from "./bundle.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
      <h2 className="headerName">Bundle React</h2>
      </header>

      <a href="https://tezsure.com/">
        <img className="logo" src={logo} alt="logo" />
      </a>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">React for Dapp Dev</h5>
                <button href="https://reactjs.org" className="col">
                  Learn React
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Learn ConseilJS for Contract interaction
                </h5>
                <button
                  href="https://cryptonomic.github.io/ConseilJS/#/"
                  className="col"
                >
                  Go to ConseilJs Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
