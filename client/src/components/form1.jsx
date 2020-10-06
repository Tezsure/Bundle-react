import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const ProjectForm = () => {
    return (
        <React.Fragment>
            
            <div className="container">
                <div className="row pt-9" >
                    <div className="col">
                        <center>
                        <h2 className="font-weight-bold">
                            Enter Project details and be a part of the DAO 
                        </h2>
                            
                              </center>
                        
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-5">
                    
                            <img className="pt-5 mt-5" alt="about page" src="https://image.freepik.com/free-vector/man-presenting-project_65141-106.jpg" style={{ width: '700px' }} />
                        </div>
                        <div className="col-md-1">

                        </div>
                        <div className= "col-md-6">
            <Card className="border border-dark">

                <Card.Body>

                <Form>
                    <Form.Group controlId="projectname">
                        <Form.Label>Project Name:</Form.Label>
                        <Form.Control type="projectname" placeholder="Enter Project name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="proownername">
                        <Form.Label> Project Owner Name:</Form.Label>
                        <Form.Control type="proownername" placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group controlId="walletadd">
                        <Form.Label>Carthagnet wallet address:</Form.Label>
                        <Form.Control type="walletadd" placeholder="Enter Wallet address" />
                    </Form.Group>
                    <Form.Group controlId="daoindex">
                        <Form.Label>DAO index:</Form.Label>
                        <Form.Control type="daoindex" placeholder="Enter DAO index you want to be a part of" />
                    </Form.Group>
                    <Form.Group controlId="funding">
                        <Form.Label>Required funds::</Form.Label>
                        <Form.Control type="funding" placeholder="Enter funds required in XTZ" />
                    </Form.Group>
                    <Form.Group controlId="prodescription">
                        <Form.Label>Project description:</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    <Form.Group controlId="proimg">
                    <Form.Label>Project cover image:</Form.Label>
                        <Form.File id="proimg" label="Upload Project cover image" />
                    </Form.Group>

                    <br />

<center>
                    <Button variant="primary" type="createdao">
                        Submit 
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

export default ProjectForm;