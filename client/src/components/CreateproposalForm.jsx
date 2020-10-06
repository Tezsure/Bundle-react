import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const CreateproposalForm = () => {
    
    const all = require("it-all");
    //const [adddata, setadddata] = useState("");
    //const [addinfo, setaddinfo] = useState("");

const ipfsclient = require("ipfs-http-client");
  const ipfs = ipfsclient({
    host: "ipfs-infura-io",
    port: 5001,
    protocol: "https"
  });

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
                    
                            <img className="pt-1 mt-5" alt="about page" src="https://image.freepik.com/free-vector/man-presenting-project_65141-106.jpg" style={{ width: '700px' }} />
                        </div>
                        <div className="col-md-1">

                        </div>
                        <div className= "col-md-6">
            <Card className="border border-dark">

                <Card.Body>

                <Form>
                    <Form.Group controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control type="Category" placeholder="Enter Proposal category" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                   
                    <Form.Group controlId="proposalDescription">
                        <Form.Label>Proposal description:</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    

                    <br />

<center>
                    <Button variant="primary" type="createdao">
                        Submit Proposal
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

export default CreateproposalForm;