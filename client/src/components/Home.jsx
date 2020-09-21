import React from "react";
import DaoCards from './DaoCards'
import sampleimage1 from '../molecular.png'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../assets/img/1st img.png'
import img2 from '../assets/img/DAO.png'
import img3 from '../assets/img/project.png'


function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-2">

          </div>

          <div className="col-md-8">
            

            <div className="py-5 mt-5">
            <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3 className="text-dark"></h3>
                    <p className="text-dark"></p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img2}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <div className="pt-5 pl-5">
                    <h3 className="text-dark"></h3>
                    <p className="text-dark"></p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3 className="text-dark"></h3>
                    <p className="text-dark"></p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div> 


          </div>

          <div className="col-md-2">
            
          </div>
        </div>
        <div className="py-5">
          <hr className ="pb-4" />
          <div className="text-center">
            <h2 className="">Become the Part of a new movement</h2>
            <h1 className="text-primary text-bold pb-2">Decentralized Autonomous Organization</h1> 
            <br />
            <p className="text-mute">To explore, click on "DAO"</p>
            <button className="btn btn-secondary btn-lg">Create DAO</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-primary btn-lg">Create Project Profile</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;