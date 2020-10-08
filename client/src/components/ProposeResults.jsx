import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Tezos } from '@taquito/taquito';
import { ThanosWallet } from '@thanos-wallet/dapp';



const GainToken = (props) => {
    const[value,setValue] = useState("")

    const [value2, setValue2] = useState("");




    const proposalVote = async () => {

        console.log(value2)

    
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
        const operation = await DaoContract.methods.proposeresult(value2,value).send();
        
        await operation.confirmation();
        
        const addmemberValue = await DaoContract.storage();
        console.info(`Member: ${addmemberValue}`);
    

}

    



const handleChange = (event) => {
    setValue(event.target.value)

}
        return (
            <Form onSubmit={proposalVote}>
            <Form.Row className="align-items-center">
            <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                Product ID
                </Form.Label>
                <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Product ID"
                value = {value2}
                onChange = {e => setValue2(e.target.value)}
                />
            </Col>
            <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                Proposal ID 
                </Form.Label>
                <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Proposal ID"
                value = {value}
                onChange = {e => setValue(e.target.value)}
                />
            </Col>
            
            <Col xs="auto">
                <Button type="submit" className="mb-2" onClick={proposalVote}>
                Submit
                </Button>
            </Col>
            </Form.Row>
        </Form>
        );
}

export default GainToken;