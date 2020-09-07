import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'




const ReactPage = (props) => {
  return (
    <Container>
  <Row>
    <Col xs={6} md={4}>
      <Image src="holder.js/171x180" rounded />
    </Col>
    </Row>
  

  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
  <Tab eventKey="home" title="Home">
    OP1
  </Tab>
  <Tab eventKey="profile" title="Profile">
    OP2
  </Tab>
  <Tab eventKey="contact" title="Contact">
    OP3
  </Tab>
</Tabs>
  </Container>  
  
  
);
}

export default ReactPage;