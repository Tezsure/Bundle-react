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
import AddprojectCard from "./AddprojectCard"
import ProjectProposalCard from "./ProjectProposalCard"
import AddproposalCard from "./AddproposalCard"



const ProposalDetails = (props) => {

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
              
              

              
              
              <div className="col-md-7">
                  
                    <h2 className="font-weight-bold"> Vera Loans </h2>
                    <br/>
                    <h5 className="font-weight-light">
                    Description:
                    <br/>
                    Amount:

                    </h5>
                    <br/>
                    <br/>
    
              </div>
            </div>
           

        

          </div>
      </React.Fragment>
  );
}

export default ProposalDetails;