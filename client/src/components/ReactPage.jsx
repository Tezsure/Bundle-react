import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import { sampleData } from '../data/sampleData';
import { Tezos } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';
import ProposalForm from './ProposalForm';
import ProposalVote from './ProposalVote';
import ProjectVote from './ProjectVote';
import ProjectAdd from './ProjectAdd';
import AddDAO from "./AddDAO";
import ProposeResults from "./ProposeResults";
import DisputeResults from "./DisputeResults"
import FinaliseResults from "./FinaliseResults";
import RewardFunds from "./RewardFunds";
import RegainFunds from "./RegainFunds";
import GainToken from "./GainToken";
import ProjectCard from "./ProjectCard";
import AddprojectCard from "./AddprojectCard"
import ProjectProposalCard from "./ProjectProposalCard"
import AddproposalCard from "./AddproposalCard"



const ReactPage = (props) => {

  const [value2, setValue2] = useState("");
  

// make sure to add daoid as a json object in ipfs so as to reuse it to add members

//State for addmember 
const[addinitiate,setaddinitiate] = useState('False')
const[addsuccess,setaddsuccess] = useState('False')
//function for add member interface
const addmember = async () => {
  try {
    const available = await ThanosWallet.isAvailable();
    if (!available) {
      throw new Error('Thanos Wallet not installed');
    }
  } catch (err) {
    console.log(err);
  }
  const wallet = new ThanosWallet('Tijori');
  await wallet.connect("carthagenet");
  
  const tezos = wallet.toTezos();
  const accountPkh = await tezos.wallet.pkh();
  const accountBalance = await tezos.tz.getBalance(accountPkh);
  const DaoContract = await tezos.wallet.at(
    "KT1BLFCd7359ZndXtLGbMn8fPt9utSBxE6yJ"
  );
  const operation = await DaoContract.methods.addMember(value2).send( {amount: 0.0001});
  setaddinitiate('True');
  await operation.confirmation();
  window.alert("Add Member: transaction successful")
  
  const addmemberValue = await DaoContract.storage();
  console.info(`Member: ${addmemberValue}`);
}


  const {id} = useParams();

  return (
    <React.Fragment>
        <div>
          <br/>
          <br/>
        </div>
          <div className="container">
            <div className="row">
              <div className="col-md-5">

                <img  alt="daocardimage"  src={sampleData[id-1].image}   style={{ width:'80%' }}  />
                  <br />
                  <br />
                  {/* <h5 className="font-weight-light">
                      <a href="/" className="btn btn-outline-info btn-lg pr-2">Connect with us</a>
                      &nbsp;&nbsp;&nbsp;
                      <a href="/" className="btn btn-outline-success btn-lg ">Github Link</a>

                    </h5> */}
              </div>
              

              
              
              <div className="col-md-7">
                  
                    <h2 className="font-weight-bold"> {sampleData[id-1].title} </h2>
                    <br/>
                    <h5 className="font-weight-light">
                    Description:
                    Amount:

                    </h5>
                    <br/>
                    <br/>
                    <div>
                      <Form>
                        <Form.Group controlId="addmember">
                          <Form.Control type="text" placeholder="DAO ID" 
                            value = {value2}
                            onChange = {e => setValue2(e.target.value)}
                            
                            />
                          <Form.Text className="text-muted">
                          </Form.Text>
                        </Form.Group>
                        <button type="button" onClick={addmember}class="btn btn-primary btn-lg btn-block">Become a Member</button> 
                      </Form>
                  </div>
              </div>
            </div>
            <hr className ="pb-4" />
            <div className="text-center">
            <h3 className="text-primary text-bold pb-2">Project and Proposals</h3> 
            </div>

            <div className="row">
                <div className="col">
                <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example2">
                    <Tab eventKey="tab1" title="Proposal">
                        <br />
                        <div className="row">
                          <div className="col-md-3">
                            <AddproposalCard />
                          </div>
                          <div className="col-md-3" >
                          <ProjectProposalCard />

                          </div>
                        </div>
                        
                    </Tab>
                  <Tab eventKey="tab2" title="Project">
                        <br />
                        <div className="row">
                          <div className="col-md-3">
                            <AddprojectCard />
                          </div>
                          <div className="col-md-3" >
                          <ProjectCard title="Vera Loans"/>

                          </div>
                        </div>
                  </Tab>
                </Tabs>
                </div>
            </div>

            <br/>
            <br/>

            <hr className ="pb-4" />


            <div className="text-center">
            <h3 className="text-primary text-bold pb-2">Operations</h3> 
            </div>
            <div className="row">
                <div className="col">
                <Tabs defaultActiveKey="Admin" id="uncontrolled-tab-example3">
                    <Tab eventKey="Admin" title="Admin Operations">
                        <br />
                              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row>
                                  <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                      <Nav.Item>
                                        <Nav.Link eventKey="first">Propose Results</Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="second">Finalise Results</Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="third">Reward Funds</Nav.Link>
                                      </Nav.Item>
                                    </Nav>
                                  </Col>
                                  <Col sm={9}>
                                    <Tab.Content>
                                      <Tab.Pane eventKey="first">
                                      <ProposeResults/>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="second">
                                      <FinaliseResults/>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="third">
                                      <RewardFunds/>
                                      </Tab.Pane>
                                    </Tab.Content>
                                  </Col>
                                </Row>
                              </Tab.Container>
                    </Tab>
                  <Tab eventKey="Member" title="Member Operations">
                        <br />
                              <Tab.Container id="left-tabs-example2" defaultActiveKey="first">
                                <Row>
                                  <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                      <Nav.Item>
                                        <Nav.Link eventKey="first">Dipute DAO</Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="second">Regain Contribution</Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="third">Gain Project Tokens</Nav.Link>
                                      </Nav.Item>
                                    </Nav>
                                  </Col>
                                  <Col sm={9}>
                                    <Tab.Content>
                                      <Tab.Pane eventKey="first">
                                      <DisputeResults/>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="second">
                                      <RegainFunds/>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="third">
                                        <GainToken/>
                                      </Tab.Pane>
                                    </Tab.Content>
                                  </Col>
                                </Row>
                              </Tab.Container>
                  </Tab>
                </Tabs>
                </div>
            </div>

            <br/>

            <hr className ="pb-4" />



            
           
          </div>
      </React.Fragment>
  );
}

export default ReactPage;