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


import {createStore} from "react";

import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, DAO, Projects, ProjectProfile, DaoCards, ProjectPage, ReactPage, FormComp} from "./components";
import ProjectForm from './components/ProjectForm'
import DAOForm from './components/DAOForm'
import CreateproposalForm from './components/CreateproposalForm'
import ProjectDetails from './components/ProjectDetails'
import ProposalDetails from './components/ProposalDetails'
import AboutPage from "./components/AboutPage"
import Rules from "./components/Rules"

import { ThanosWallet } from '@thanos-wallet/dapp';

function App() {
  
  return (
    <div className="App">
      
      <Router>
        <Navigation />
      
        <Switch>
        
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Project" exact component={() => <Projects />} />
          <Route path="/DAO" exact component={() => <DAO />} />

          <Route 
            exact
            path="/DAO/:id"
            component={ReactPage}
          />

          <Route 
            exact
            path="/Project/:id"
            component={ReactPage}
          />

          <Route path="/about" exact component ={() => <AboutPage /> } />
          <Route path="/create" exact component ={() => <FormComp /> } />
          <Route path="/Rules" exact component ={() => <Rules /> } />

          <Route path="/ProjectPage" exact component={() => <ProjectPage />} />
          <Route path="/ReactPage" exact component={() => <ReactPage />} />
          <Route path="/ProjectForm" exact component={() => <ProjectForm />} />
          <Route path="/DAOForm" exact component={() => <DAOForm />} />
          <Route path="/CreateproposalForm" exact component={() => <CreateproposalForm/>} />
          <Route path="/ProjectDetails" exact component={() => <ProjectDetails/>} />
          <Route path="/ProposalDetails" exact component={() => <ProposalDetails/>} />




        </Switch>
        
      </Router>
    </div>
  );
}






export default App;