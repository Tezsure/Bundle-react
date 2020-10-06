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



const ReactPage = (props) => {

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
    "KT1Wv17QNADUyQRbiVrp5TquHKFvoEyG7wV8"
  );
  const operation = await DaoContract.methods.addMember(4).send( {amount: 0.0001});
  setaddinitiate('True');
  await operation.confirmation();
  
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
                      Minimum contribution to be added is - 20 mutez

                    </h5>
                    <br/>
                    <br/>
                    <div>
                      <button type="button" onClick={addmember}class="btn btn-primary btn-lg btn-block">Become a Member</button> 
                  </div>
              </div>
            </div>
            <hr className ="pb-4" />

            <div className="row">
                <div className="col">
                <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example2">
                    <Tab eventKey="tab1" title="Proposal">
                        <br />
                        <ProjectCard title="Vera Loans"/>
                    </Tab>
                  <Tab eventKey="tab2" title="Project">
                        <br />
                        <ProjectCard title="Vera Loans"/>
                  </Tab>
                </Tabs>
                </div>
            </div>

            <br/>
            <br/>

            <hr className ="pb-4" />


          
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
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="second">
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="third">
                                        sdfas
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
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="second">
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


            
            <div className="row">
                <div className="col">
                <Tabs defaultActiveKey="Round Allocations" id="uncontrolled-tab-example">
                  
                  <Tab eventKey="Contributers" title="Contributers">
                    <div className="container container pt-5 pl-5">
                        Contributers List:-
                    </div>
                  </Tab>
                  <Tab eventKey="Add proposal" title="Add proposal">
                    <div className="container container pt-5 pl-5">
                      Fill in the Market and category that you want to allocate for the first round of funding.
                        <ProposalForm/>
                    </div>
                  </Tab>
                  <Tab eventKey="Add Projects" title="Add Projects">
                    <div className="container container pt-5 pl-5">
                        <ProjectAdd/>
                    </div>
                  </Tab>
                  <Tab eventKey="Vote for Projects" title="Vote for Project">
                    <div className="container container pt-5 pl-5">
                        <ProjectVote/>
                    </div>
                  </Tab>
                  <Tab eventKey="Vote for Proposals" title="Vote for Proposal">
                    <div className="container container pt-5 pl-5">
                        <ProposalVote/>
                    </div>
                  </Tab>
                  <Tab eventKey="Propose Results" title="Propose">
                    <div className="container container pt-5 pl-5">
                        <ProposeResults/>
                    </div>
                  </Tab>
                  <Tab eventKey="Dispute Results" title="Dispute">
                    <div className="container container pt-5 pl-5">
                        <DisputeResults/>
                    </div>
                  </Tab>
                  <Tab eventKey="Finalise" title="Finalise Results">
                    <div className="container container pt-5 pl-5">
                        <FinaliseResults/>
                    </div>
                  </Tab>
                  <Tab eventKey="Reward Funds" title="Reward Funds">
                    <div className="container container pt-5 pl-5">
                        <RewardFunds/>
                    </div>
                  </Tab>
                  <Tab eventKey="Regain Tez" title="Regain XTZ">
                    <div className="container container pt-5 pl-5">
                        <RegainFunds/>
                    </div>
                  </Tab>
                  <Tab eventKey="Gain" title="Gain Tokens">
                    <div className="container container pt-5 pl-5">
                        <GainToken/>
                    </div>
                  </Tab>
                </Tabs>                  
                </div>  
            </div>

          </div>
      </React.Fragment>
  );
}

export default ReactPage;