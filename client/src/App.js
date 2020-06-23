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
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Learn React for the Frontend</h5>
                <a href="https://reactjs.org/tutorial/tutorial.html" class="btn btn-primary">
                  Explore ReactJs
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Learn ConseilJs for interacting with Smart Contract</h5>
                <a href="https://cryptonomic.github.io/ConseilJS/#/" class="btn btn-primary">
                  Explore ConseilJS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
