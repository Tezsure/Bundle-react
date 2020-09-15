import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
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
//functions for proposal form
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


const ReactPage = (props) => {



// const addProposal = async () => {
// 
// try {
  // const available = await ThanosWallet.isAvailable();
  // if (!available) {
    // throw new Error('Thanos Wallet not installed');
  // }
// } catch (err) {
  // console.log(err);
// }
// const wallet = new ThanosWallet('Tijori');
// await wallet.connect("carthagenet");
// 
// const tezos = wallet.toTezos();
// const accountPkh = await tezos.wallet.pkh();
// const accountBalance = await tezos.tz.getBalance(accountPkh);
// const DaoContract = await tezos.wallet.at(
  // "KT1AgQZ6EBxFQ1JnhxPFZiLaSvA9iZa2EQif"
// );
// 
// const operation = await DaoContract.methods.addmember(transfervalue).send();
// setaddinitiate('True');
// await operation.confirmation();
// 
// const addmemberValue = await DaoContract.storage();
// console.info(`Member: ${addmemberValue}`);
// 
// }

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
    "KT1AgQZ6EBxFQ1JnhxPFZiLaSvA9iZa2EQif"
  );
  const operation = await DaoContract.methods.addmember(20).send();
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
              <div className="col-md-4">

                <img  alt="daocardimage"  src={sampleData[id-1].image}   style={{ width:'430px' }}  />

              </div>
              <div className="col-md-1">

              </div>
              <div className="col-md-7">
                  
                    <h2 className="font-weight-bold"> {sampleData[id-1].title} </h2>
                    <br/>
                    <h5 className="font-weight-light">
                      <a href="/" className="btn btn-outline-info btn-lg pr-4">Connect with us</a>
                      <br/>
                      <br/>
                      <a href="/" className="btn btn-outline-success btn-lg pr-4">Github Link</a>

                    </h5>
                    <br/>
                    <br/>
                    <div>
                      <button type="button" onClick={addmember}class="btn btn-primary btn-lg btn-block">Become a Member</button> 
                    </div>
              </div>
            </div>

            <br/>
            <br/>
            <div className="row">
                <div className="col">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  <Tab eventKey="Description" title="Description">
                    <div className="container pt-5 pl-5">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui delectus esse quia, officia dolore deserunt, id eaque magni recusandae similique aliquam nulla nihil quaerat, libero maiores enim cupiditate dignissimos aperiam!      
                    </div>
                      
                  </Tab>
                  <Tab eventKey="Members" title="Contributers">
                    <div className="container container pt-5 pl-5">
                        Contributers List:-
                    </div>
                  </Tab>
                  <Tab eventKey="Round Allocation" title="Round Allocation">
                    <div className="container container pt-5 pl-5">
                      Fill in the Market and Amount that you want to allocate for the first round of funding.
                        <ProposalForm/>
                    </div>
                  </Tab>
                  <Tab eventKey="Add Projects" title="Add Projects">
                    <div className="container container pt-5 pl-5">
                        Enter Projects
                    </div>
                  </Tab>
                  <Tab eventKey="Vote for Projects" title="Vote for Project">
                    <div className="container container pt-5 pl-5">
                        
                    </div>
                  </Tab>
                  <Tab eventKey="Vote for Proposals" title="Vote for Proposal">
                    <div className="container container pt-5 pl-5">
                        
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