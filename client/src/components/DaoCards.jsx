import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const DaoCards = ( {details} ) => {



  return (
    <div className="pb-4">
    <Card style={{ width: '15rem' }}>
      <center>
  <Card.Img variant="top" src={details.image} style={{width:'230px'}} />
    </center>
  <Card.Body>
  <Card.Title>{details.title}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    
    <Link to={`/DAO/${details.id}`}>
      <Button variant="primary">  Know more</Button>
    </Link>
  </Card.Body>
</Card>
</div>
  );
}

export default DaoCards;