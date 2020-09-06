//import React, {Component} from "react";
//import logo from "./bundle.png";
//import "./App.css";
//import Button from 'react-bootstrap/Button';
//import Navbar from 'react-bootstrap/Navbar'
//import Nav from 'react-bootstrap/Nav'
//import NavDropdown from 'react-bootstrap/NavDropdown'
//import Form from 'react-bootstrap/Form'
//import FormControl from 'react-bootstrap/FormControl'
//import Card from 'react-bootstrap/Card'


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, DAO, Projects, ProjectProfile, DaoCards, ProjectPage, ReactPage} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
        
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Projects" exact component={() => <Projects />} />
          <Route path="/DAO" exact component={() => <DAO />} />
          <Route path="/ProjectPage" exact component={() => <ProjectPage />} />
          <Route path="/ReactPage" exact component={() => <ReactPage />} />


        </Switch>
        
      </Router>
    </div>
  );
}






export default App;
