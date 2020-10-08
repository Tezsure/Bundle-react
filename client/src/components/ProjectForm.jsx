import React , {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Tezos } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';

const ProjectForm = () => {

    const [walletaddress, waddress] = useState("");
    const [dao, daoid] = useState("");
    const [category, cat] = useState("");
    



    const CreateDao = async () => {
        try {
          const available = await ThanosWallet.isAvailable();
          if (!available) {
            throw new Error('Thanos Wallet not installed');
          }
        } catch (err) {
          console.log(err);
        }
        const wallet = new ThanosWallet('Tijori');
        await wallet.connect("carthagenet");
        
        const tezos = wallet.toTezos();
        const accountPkh = await tezos.wallet.pkh();
        const accountBalance = await tezos.tz.getBalance(accountPkh);
        const DaoContract = await tezos.wallet.at(
          "KT1BLFCd7359ZndXtLGbMn8fPt9utSBxE6yJ"
        );
        const operation = await DaoContract.methods.addProject(category,dao).send();
        
        await operation.confirmation();
        
        const addmemberValue = await DaoContract.storage();
        console.info(`Member: ${addmemberValue}`);
    }




    return (
        <React.Fragment>
            
            <div className="container">
                <div className="row pt-9" >
                    <div className="col">
                        <center>
                        <h2 className="font-weight-bold">
                            Enter Project Details and be a part of the DAO
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
                        <Form.Control type="project" placeholder="Enter Project name" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="ownername">
                        <Form.Label> Project Owner Name:</Form.Label>
                        <Form.Control type="ownername" placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group controlId="walletaddress">
                        <Form.Label>Wallet Address:</Form.Label>
                        <Form.Control type="Wallet Address" placeholder="Enter your wallet Address"
                                value = {walletaddress}
                                onChange = {e => waddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="daoid">
                        <Form.Label>DAO Id:</Form.Label>
                        <Form.Control type="dao" placeholder="Enter DAO index " 
                            value = {dao}
                            onChange = {e => daoid(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>category:</Form.Label>
                        <Form.Control type="category" placeholder="Category Index of project" 
                                value = {category}
                                onChange = {e => cat(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Reqfunds">
                        <Form.Label> Required Funds:</Form.Label>
                        <Form.Control type="RequiredFunds" placeholder="Enter required Funds" />
                    </Form.Group>

                    <Form.Group controlId="Description">
                        <Form.Label>Project description:</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    
                    
                    <Form.Group controlId="daoimg">
                    <Form.Label>Dao cover image:</Form.Label>
                        <Form.File id="daoimg" label="Upload DAO cover image" />
                    </Form.Group>

                    <br />

<center>
                    <Button variant="primary" type="createdao"onClick={CreateDao}>
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

export default ProjectForm;