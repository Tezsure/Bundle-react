import React from "react";
import DaoCards from './DaoCards'
import sampleimage1 from '../molecular.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'

import {sampleData} from '../data/sampleData'

const DAO  = () => {


  const renderCards = sampleData.map((details) => (
    <div className="col-md-2 col-sm-6">
      <DaoCards details={details} />
    </div>
  ))

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
            <p>
              
            </p>
            </Col>
  </Row>  

                <div className="row pl-5 ml-5 text-center">
                  <h1 class="font-weight-light ">A List of all DAO's Open for Intake</h1>
                </div>
                <div className="row pt-5">          
                    <div className="col-md-2 col-sm-6">

                    </div>
                    {renderCards}
                </div>
            

          
      </Container>
      </div>
  );
}

export default DAO;