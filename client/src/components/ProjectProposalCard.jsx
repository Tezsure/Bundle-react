import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const ProjectProposalCard = ( {details} ) => {



  return (
    <div className="pb-4">
    <Card style={{ width: '15rem' , height:'24rem'}}>
  
  <Card.Body>
    <div className="mt-5 pt-4">
      <center>
      <h3>
            Category 
        </h3>
        <h3>
            Description 
        </h3>

      </center>
    </div>
    <div className="pt-5 mt-5">
    <Link to="/ProjectForm">
      <center >
      <Button variant="primary">Know Mmore</Button>
      </center>
    </Link>
    </div>
  </Card.Body>
</Card>
</div>
  );
}

export default ProjectProposalCard;