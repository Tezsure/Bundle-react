import React from "react";
import logo from "./bundle.png";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  
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
