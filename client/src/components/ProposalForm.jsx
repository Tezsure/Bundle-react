import React , {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Tezos } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';

const ProposalForm = () => {

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
        const operation = await DaoContract.methods.addProposal(category,dao).send();
        
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
                            Create a Proposal for the DAO to choose a category
                        </h2>
                            
                              </center>
                        
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-5">
                    
                            <img className="pt-5 mt-5" alt="about page" src="https://www.pngkey.com/png/detail/304-3045071_pdf-icon-document-line-icon-vector.png" style={{ width: '700px' }} />
                        </div>
                        <div className="col-md-1">

                        </div>
                        <div className= "col-md-6">
            <Card className="border border-dark">

                <Card.Body>

                <Form>
                   
                    <Form.Group controlId="dao">
                        <Form.Label>DAO ID:</Form.Label>
                        <Form.Control type="DAO" placeholder="Enter DAO ID"
                                value = {dao}
                                onChange = {e => daoid(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="catindex">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control type="category" placeholder="Enter category index " 
                            value = {category}
                            onChange = {e => cat(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Description">
                        <Form.Label>Proposal description:</Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    

                    <br />

<center>
                    <Button variant="primary" type="createdao"onClick={CreateDao}>
                        Add Proposal 
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

export default ProposalForm;