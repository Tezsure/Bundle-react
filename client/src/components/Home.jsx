import React from "react";
import DaoCards from './DaoCards'
import sampleimage1 from '../molecular.png'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../assets/img/1st img.png'
import img2 from '../assets/img/DAO.png'
import img3 from '../assets/img/project.png'
import img4 from '../assets/img/26824.jpg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import FormComp from './FormComp'
import { Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'

function Home() {
  return (

    

    <div className="home">

      <div className="one">
          <Container fluid>
          <div className="row mt-5">
          <div className="col-md-2"></div>
            <div className="col-md-5">
            <h1 className="text-primary text-bold pb-2">Invest together</h1>
            <h1 className="text-primary text-bold pb-2">Diversify Risks</h1>
            <h1 className="text-primary text-bold pb-2">Earn Returns</h1>
            </div>
          <div className="col-md-5">
          
          <img alt="about page" src="https://image.freepik.com/free-vector/characters-people-holding-blockchain-network_53876-26824.jpg" style={{ width: '500px' }} />
          
          </div>
          </div>  
          </Container>
        </div>

      <div className="container">
        <div className="row mt-5">
          
            
          <Jumbotron fluid>
          <Container>
          <h1>Fluid jumbotron</h1>
          <p>
          This is a modified jumbotron that occupies the entire horizontal space of
          its parent.
          </p>
           

           

          

        </Container>
        </Jumbotron>
        </div>

        

        <div className="py-5">
          <hr className ="pb-4" />
          <div className="text-center">
            <h2 className="">Become the Part of a new movement</h2>
            <h1 className="text-primary text-bold pb-2">Decentralized Autonomous Organization</h1> 
            <br />
            <p className="text-mute">To explore, click on "DAO"</p>
            <Link to={FormComp}>
            <button className="btn btn-secondary btn-lg">Create DAO</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            <Link to={FormComp}>
            <button className="btn btn-primary btn-lg">Create Project Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;