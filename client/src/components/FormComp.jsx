import React, {useState} from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const all = require('it-all')


const FormComp = () =>{

//const[adddata] = useState('')
//const[addinfo,setaddinfo] = useState('')
  
const ipfsclient = require('ipfs-http-client')
const ipfs = ipfsclient({host: 'ipfs-infura-io',port: 5001,protocol:'https'})


const handleChange = (event) => {
  //setadddata(event.target.data)
  //setaddinfo(event.target.info)
}
const onSubmit = async(event) => {
  event.preventDefault()
  console.log("Submitting file to ipfs...")
  const data = JSON.stringify({
  //data: adddata,
  //info: addinfo
  })
  const ipfsHash = ipfs.add(data)
  const arr = await all (ipfsHash)
  console.log(arr)
  
    
}

return (
  <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"
    //data = {adddata}
    onChange = {(event)=>handleChange(event)}
    />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" 
    //info = {addinfo}
    onChange = {(event)=>handleChange(event)}
    />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button type="button" onClick={onSubmit} class="btn btn-primary btn-lg btn-block">Submit</Button>
</Form>
);

}

export default FormComp;