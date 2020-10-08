import React, {useState} from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { ThanosWallet } from '@thanos-wallet/dapp';

import Button from 'react-bootstrap/Button'


const ProjectProposalCard = ( {details} ) => {

  const[value,setValue] = useState(0)
  const[index,setIndex] = useState(0)

  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const voteProject = async () => {

    console.log(value2)
  
      
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
          const operation = await DaoContract.methods.voteproposal(value2,value3).send();
          
          await operation.confirmation();
          window.alert("Proposal vote: transaction successful")
          
          const addmemberValue = await DaoContract.storage();
          console.info(`Member: ${addmemberValue}`);
  
  }



  return (
    <div className="pb-4">
    <Card style={{ width: '15rem' , height:'24rem'}}>
  
  <Card.Body>
    <div className=" pt-2 pb-3">
      <center className="pb-4">
      <h3>
            Category: DeFi 
        </h3>
        

      </center>
    </div>
    <Form>
          <Form.Group controlId="projectname">
            <Form.Control type="text" placeholder="Vote" 
              value = {value2}
              onChange = {e => setValue2(e.target.value)}
              
              />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="projectname">
            <Form.Control type="text" placeholder="Proposal ID" 
              value = {value3}
              onChange = {e => setValue3(e.target.value)}
              
              />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <center className="pb-3">
            <Button variant="success" type="createdao" onClick={voteProject}>
                          Vote 
            </Button>
          </center>
          
      </Form>
    <div className="pt-3 mt-5">
    <Link to="/ProposalDetails">
      <center >
      <Button variant="primary">Know More</Button>
      </center>
    </Link>
    </div>
  </Card.Body>
</Card>
</div>
  );
}

export default ProjectProposalCard;