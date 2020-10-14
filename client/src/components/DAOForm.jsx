import React , {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Tezos } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';

const DAOForm = () => {

    const [strength, setstrength] = useState("");
    const [contribution, setcontribution] = useState("");
    const [numberofToken, setnumberofToken] = useState("");
    const [votestart, vstart] = useState("");
    const [voteend, vend] = useState("");
    const [disputeend, dend] = useState("");
    



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
          "KT1QwfTHgFwJo18B6xQPzgAWfq1uVVkRdG8h"
        );
        const operation = await DaoContract.methods.addDAO(contribution,disputeend,contribution,numberofToken,strength,voteend,votestart).send({amount:0.0001});
        
        await operation.confirmation();
        window.alert("Create DAO: transaction successful")
        
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
                            Create a Decentralised Autonomous Organisation
                        </h2>
                            
                              </center>
                        
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-5">
                    
                            <img className="pt-5 mt-5" alt="about page" src="https://cryptooa.com/wp-content/uploads/2018/12/DAO.png" style={{ width: '700px' }} />
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
                        <Form.Control type="strength" placeholder="Enter Strength of DAO"
                                value = {strength}
                                onChange = {e => setstrength(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="minimumcontribution">
                        <Form.Label>Contribution:</Form.Label>
                        <Form.Control type="minimumcontribution" placeholder="Enter Contribution of each member in mutez " 
                            value = {contribution}
                            onChange = {e => setcontribution(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="token">
                        <Form.Label>Number of Token:</Form.Label>
                        <Form.Control type="token" placeholder="Enter No of tokens to be given to each person" 
                                value = {numberofToken}
                                onChange = {e => setnumberofToken(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="vstart">
                        <Form.Label>Vote start Time:</Form.Label>
                        <Form.Control type="token" placeholder="Enter vote start time in epoch" 
                                value = {votestart}
                                onChange = {e => vstart(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="vend">
                        <Form.Label>Vote end Time:</Form.Label>
                        <Form.Control type="token" placeholder="Enter vote start time in epoch" 
                                value = {voteend}
                                onChange = {e => vend(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="dend">
                        <Form.Label>dispute vote end Time:</Form.Label>
                        <Form.Control type="token" placeholder="Enter vote start time in epoch" 
                                value = {disputeend}
                                onChange = {e => dend(e.target.value)}
                        />
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

export default DAOForm;