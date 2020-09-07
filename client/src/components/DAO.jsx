import React from "react";
import DaoCards from './DaoCards'
import sampleimage1 from '../molecular.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

function DAO() {
  return (
    <div className="home">
      <Jumbotron fluid>
  <Container>
    <h1>Decentralised Autonomous Organisation</h1>
    <p>
      Become a member of a DAO and start investing to earn returns
    </p>
  </Container>
</Jumbotron>

      <Container fluid>
  <Row>
    <Col> 
    <h1 class="font-weight-light">A List of all DAO's Open for Intake</h1>
            <p>
              
            </p>
            </Col>
  </Row>

            
          <Row>
          <div class="col-lg-3">
            <DaoCards cardimage={sampleimage1}></DaoCards >
            <DaoCards cardimage={sampleimage1}></DaoCards>
            </div>
            <div class="col-lg-4">
            <DaoCards cardimage={sampleimage1}></DaoCards>
            <DaoCards cardimage={sampleimage1}></DaoCards>
            </div>
            </Row>
       </Container>
       </div>
  );
}

export default DAO;