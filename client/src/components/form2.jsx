import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const AboutPage = () => {
    return (
        <React.Fragment>
            
            <div className="container">
                <div className="row pt-9" >
                    <div className="col">
                        <center>
                        <h2 className="font-weight-bold">
                            Create a Decentralised Autonomous Organisation
                        </h2>
                            
                              </center>
                        
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-5">
                    
                            <img className="pt-5 mt-5" alt="about page" src="https://png2.cleanpng.com/sh/f6e344d1fb9c208ff291a229e93d8bee/L0KzQYq3VsEzN5Z5jpH0aYP2gLBuTfRma5ZzjORqbHn9dbW0ggV1d590hdHAcz3ygrjojvl7aaVuh9C2cHB1hLLpjPUudpZ5RdNqLYD1f7vsiCR0NWZpSKJtMHXmR7KAUvY4Nmg2TKQCNUmzQYa9UMM0PGY8Sqc5MUaxgLBu/kisspng-decentralized-autonomous-organization-portable-net-aa-projekts-5d00d0ec7a72f7.7142759015603345725016.png" style={{ width: '700px' }} />
                        </div>
                        <div className="col-md-1">

                        </div>
                        <div className= "col-md-6">
            <Card className="border border-dark">

                <Card.Body>

                <Form>
                    <Form.Group controlId="daoname">
                        <Form.Label>DAO Name:</Form.Label>
                        <Form.Control type="daoname" placeholder="Enter DAO name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="ownername">
                        <Form.Label>Owner Name:</Form.Label>
                        <Form.Control type="ownername" placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group controlId="strength">
                        <Form.Label>Strength:</Form.Label>
                        <Form.Control type="strength" placeholder="Enter Strength of DAO" />
                    </Form.Group>
                    <Form.Group controlId="minimumcontribution">
                        <Form.Label>Contribution:</Form.Label>
                        <Form.Control type="minimumcontribution" placeholder="Enter Contribution of each member " />
                    </Form.Group>
                    <Form.Group controlId="token">
                        <Form.Label>Number of Token:</Form.Label>
                        <Form.Control type="token" placeholder="Enter No of tokens to be given to each person" />
                    </Form.Group>
                    <Form.Group controlId="daoimg">
                    <Form.Label>Dao cover image:</Form.Label>
                        <Form.File id="daoimg" label="Upload DAO cover image" />
                    </Form.Group>

                    <br />

<center>
                    <Button variant="primary" type="createdao">
                        Create DAO
                    </Button>
                    </center>
                </Form>
                </Card.Body>
            </Card>

            </div>
                </div>
                
            
            <div className= "col-md-4">
                    </div>
            
        </React.Fragment>
    );
}

export default AboutPage;
