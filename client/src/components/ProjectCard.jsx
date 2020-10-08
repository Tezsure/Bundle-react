import React, {useState} from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { ThanosWallet } from '@thanos-wallet/dapp';


const ProjectCard = (props) => {
  const[value,setValue] = useState(0)
  const[index,setIndex] = useState(0)

  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");



  const proposalVote = async () => {

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
      const operation = await DaoContract.methods.rewardfunds(value2).send();
      
      await operation.confirmation();
      
      const addmemberValue = await DaoContract.storage();
      console.info(`Member: ${addmemberValue}`);
  

}


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
        const operation = await DaoContract.methods.voteproject(value2,value3).send();
        
        await operation.confirmation();
        
        const addmemberValue = await DaoContract.storage();
        console.info(`Member: ${addmemberValue}`);

}

  



const handleChange = (event) => {
  setValue(event.target.value)

}
  return (
    <div className="pb-4">
    <Card  className="border border-dark" style={{ width: '15rem' }}>
      <center>
  <Card.Img variant="top" src='https://image.freepik.com/free-photo/beautiful-sunset-mountains-landscape-with-sun-light-shining-through-orange-clouds-fog_146671-18476.jpg' style={{width:'230px'}} />
    </center>
  <Card.Body>
  
  <Card.Title><center>{props.title}</center></Card.Title>

      <Form>
          <Form.Group controlId="projectname">
            <Form.Control type="text" placeholder="Votes" 
              value = {value2}
              onChange = {e => setValue2(e.target.value)}
              />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="projectname">
            <Form.Control type="text" placeholder="Project ID" 
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
  
   
    
      <Link to="/ProjectDetails">
      <Button variant="primary">Know more</Button>
      </Link>

      

  </Card.Body>
</Card>
</div>
  );
}

export default ProjectCard;