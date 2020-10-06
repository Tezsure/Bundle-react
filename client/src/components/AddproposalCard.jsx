import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CreateproposalForm from "./CreateproposalForm"


const AddproposalCard = ( {details} ) => {



  return (
    <div className="pb-4">
    <Card style={{ width: '15rem' , height:'24rem'}}>
      <center>
  <Card.Img variant="center" src="https://image.flaticon.com/icons/png/512/8/8820.png" style={{width:'150px' , paddingTop:'5rem', opacity: '0.6'}} />
    </center>
  <Card.Body>
    <div className="pt-3">
    <Link to="/CreateproposalForm">
      <center >
      <Button variant="primary">Create Proposal</Button>
      </center>
    </Link>
    </div>
  </Card.Body>
</Card>
</div>
  );
}

export default AddproposalCard;