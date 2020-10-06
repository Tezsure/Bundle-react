import React from "react";
import DaoCards from './DaoCards'
import sampleimage1 from '../molecular.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {sampleData} from '../data/sampleData'
import ProjectCards from './ProjectCards'
const Projects  = () => {


  const renderCards = sampleData.map((details) => (
    <div className="col-md-2 col-sm-6">
      <ProjectCards details={details} />
    </div>
  ))

  return (
    <div className="home">
      <Jumbotron fluid>
  <Container>
    <h1>Projects</h1>
    <p>
    Upload your project profile  and start raising capital.
    </p>
  </Container>
      </Jumbotron>

      <div className="row pl-5 ml-5 text-center">
                  <h1 class="font-weight-light ">Projects open for Funding </h1>
                </div>
                
                <div className="p-5 m-5 border">
                <Tabs defaultActiveKey="De-fi" id="uncontrolled-tab-example">
                    <Tab eventKey="De-fi" title="De-fi">
                      <div className="row p-5">
                          {renderCards}
                      </div>
                      <div className="row p-5">
                          {renderCards}
                      </div>
                      <div className="row p-5">
                          {renderCards}
                      </div>
                    </Tab>
                    <Tab eventKey="Crypto-Games" title="Crypto-Games">
                        <div className="row p-5">
                              {renderCards}
                          </div>
                          <div className="row p-5">
                              {renderCards}
                          </div>
                          <div className="row p-5">
                              {renderCards}
                          </div>
                    </Tab>
                    <Tab eventKey="E-Commerce" title="E-Commerce">
                        <div className="row p-5">
                              {renderCards}
                          </div>
                          <div className="row p-5">
                              {renderCards}
                          </div>
                          <div className="row p-5">
                              {renderCards}
                          </div>
                    </Tab>
                </Tabs>
                </div>
            

          
       
       </div>
  );
}

export default Projects;