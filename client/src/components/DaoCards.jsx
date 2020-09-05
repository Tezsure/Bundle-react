import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const DaoCards = (props) => {
  return (
    <div className="pb-4">
    <Card style={{ width: '15rem' }}>
      <center>
  <Card.Img variant="top" src={props.cardimage} style={{width:'100px'}} />
    </center>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</div>
  );
}

export default DaoCards;