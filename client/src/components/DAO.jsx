import React from "react";
import DaoCards from './DaoCards'
import sampleimage1 from '../molecular.png'

function DAO() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Decentralised Autonomous Organisation</h1>
            <p>
              A List of all DAO's Open for Intake
            </p>
          </div>
          <div class="col-lg-3">
            <DaoCards cardimage={sampleimage1}></DaoCards >
            <DaoCards cardimage={sampleimage1}></DaoCards>
            </div>
            <div class="col-lg-4">
            <DaoCards cardimage={sampleimage1}></DaoCards>
            <DaoCards cardimage={sampleimage1}></DaoCards>
            </div>
        </div>
      </div>
    </div>
  );
}

export default DAO;