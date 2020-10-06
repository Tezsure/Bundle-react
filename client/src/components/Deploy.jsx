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



const ProjectVote = (props) => {
    const[value,setValue] = useState(0)
    const[index,setIndex] = useState(0)

const sendProposal = async () => {

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
const DaoContract = await tezos.wallet.at("KT1AgQZ6EBxFQ1JnhxPFZiLaSvA9iZa2EQif");
//need to look into dynamic index change
const operation = await DaoContract.methods.voteproject(0,value).send();

await operation.confirmation();

const addmemberValue = await DaoContract.storage();
console.info(`Member: ${addmemberValue}`);

}
    



const handleChange = (event) => {
    setValue(event.target.value)

}
        return (
            <Form onSubmit={sendProposal}>
            <Form.Row className="align-items-center">
            <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                Votes
                </Form.Label>
                <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Index"
                value = {value}
                onChange = {(event)=>handleChange(event)}
                />
            </Col>
            <Col xs="auto">
                <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Index
                </Form.Label>
                <InputGroup className="mb-2">
                <InputGroup.Prepend>
                    <InputGroup.Text></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="inlineFormInputGroup" placeholder="Votes" />
                </InputGroup>
            </Col>
            
            <Col xs="auto">
                <Button type="submit" className="mb-2">
                Submit
                </Button>
            </Col>
            </Form.Row>
        </Form>
        );
}

export default ProjectVote;