import React from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { sampleData } from '../data/sampleData';



const ProjectProfile = (props) => {

  const {id} = useParams();

  return (
    <React.Fragment>
        <div>
          <br/>
          <br/>
        </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">

                <img  alt="daocardimage"  src={sampleData[id-1].image}   style={{ width:'430px' }}  />

              </div>
              <div className="col-md-1">

              </div>
              <div className="col-md-7">
                  
                    <h2 className="font-weight-bold"> {sampleData[id-1].title} </h2>
                    <br/>
                    <h5 className="font-weight-light">
                      <a href="/" className="btn btn-outline-info btn-lg pr-4">Connect with us</a>
                      <br/>
                      <br/>
                      <a href="/" className="btn btn-outline-success btn-lg pr-4">Github Link</a>

                    </h5>
                    <br/>
                    <br/>
                    <div>
                      <button type="button" class="btn btn-primary btn-lg btn-block">Contrbute</button> 
                    </div>
              </div>
            </div>

            <br/>
            <br/>
            <div className="row">
                <div className="col">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  <Tab eventKey="home" title="Description">
                    <div className="container pt-5 pl-5">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui delectus esse quia, officia dolore deserunt, id eaque magni recusandae similique aliquam nulla nihil quaerat, libero maiores enim cupiditate dignissimos aperiam!      
                    </div>
                      
                  </Tab>
                  <Tab eventKey="profile" title="Contributers">
                    <div className="container container pt-5 pl-5">
                        Contributers List:-
                    </div>
                  </Tab>
                </Tabs>                  
                </div>  
            </div>

          </div>
      </React.Fragment>
  );
}

export default ProjectProfile;