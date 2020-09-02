import React from "react";
import logo from "./bundle.png";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'

function App() {
  return (
    <div className="App">
      <div className="container"></div>
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <div className="container">
    <div className="row">
        <div className="col-md-3">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Investor</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Invest in Projects and businesses </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
        </div>
        <div className="col-md-3">

        </div>
        <div className="col-md-3">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
        </div>
        
    </div>

</div>
      <h2><Button variant="primary">Primary</Button>{' '}</h2>
    </div>
  );
}






export default App;
