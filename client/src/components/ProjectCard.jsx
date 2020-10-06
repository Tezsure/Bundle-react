import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const ProjectCard = ( props ) => {



  return (
    <div className="pb-4">
    <Card  className="border border-dark" style={{ width: '15rem' }}>
      <center>
  <Card.Img variant="top" src='https://image.freepik.com/free-photo/beautiful-sunset-mountains-landscape-with-sun-light-shining-through-orange-clouds-fog_146671-18476.jpg' style={{width:'230px'}} />
    </center>
  <Card.Body>
  <Card.Title>{props.title}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    
    
      <Button variant="primary">Know more</Button>

  </Card.Body>
</Card>
</div>
  );
}

export default ProjectCard;