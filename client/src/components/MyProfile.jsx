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

const MyProfile  = () => {


  const renderCards = sampleData.map((details) => (
    <div className="col-md-3 col-sm-6">
      <DaoCards details={details} />
    </div>
  ))

  return (
    <div className="home">
      <Jumbotron fluid>
  <Container>
    <h1>Decentralised Autonomous Organisation</h1>
    <p>
      Here are the all available DAO's which are accepting members for creation of funding pool, you can choose according to your risk appetite, click on "Know more" to get further details
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
                
                <div className="p-5 m-5 border">
                <Tabs defaultActiveKey="Diversified" id="uncontrolled-tab-example">
                    <Tab eventKey="Diversified" title="Diversified">
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
                    <Tab eventKey="High Risk Profile" title="High Risk Profile">
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
                    <Tab eventKey="Safe" title="Safe">
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
            

          
      </Container>
      </div>
  );
}

export default MyProfile;