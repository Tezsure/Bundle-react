import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { dummyProjects } from "./dummyProjects";

const ProjectProfile = () => {
  const { id } = useParams();
  // State to maintain active tab
  const [activeTab, setActiveTab] = useState(0);

  const renderContributors = dummyProjects[id - 1].contributors?.map(
    (contribution) => (
      <li className="list-group-item row d-flex">
        <span className="col-8">{contribution.address}</span>
        <span className="col-2">{contribution.amount}</span>
        <span className="col-2">$60</span>
      </li>
    )
  );

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-5">
        {/* Project Image */}
        <div className="col-4">
          <img
            src={dummyProjects[id - 1].image}
            height="100%"
            width="100%"
            alt="Project Background"
          />
        </div>
        {/* Project Overview */}
        <div className="col-4">
          <h1 className="font-weight-light">{dummyProjects[id - 1].title}</h1>
          <h3 className="font-weight-light">{dummyProjects[id - 1].pitch}</h3>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{dummyProjects[id - 1].website}</li>
            <li class="list-group-item">{dummyProjects[id - 1].github}</li>
            <li class="list-group-item">{dummyProjects[id - 1].address}</li>
          </ul>
        </div>
        {/* Project funding */}
        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
          {dummyProjects[id - 1].disqualified ? (
            <h1 className="text-danger">DISQUALIFIED</h1>
          ) : (
            <>
              <h1 className="font-weight-light">
                {dummyProjects[id - 1].amount} tz
              </h1>
              <p>Received from a total of 180 contributors</p>
              <button className="btn btn-primary btn-block">Contribute</button>
              <p className="align-self-end">! Dispute</p>
            </>
          )}
        </div>
      </div>
      <hr />

      {/* Tab Navigation for description, contributors and comments */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="#description"
            className={`nav-link ${activeTab === 0 ? `active` : null}`}
            onClick={() => setActiveTab(0)}
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#contributors"
            className={`nav-link ${activeTab === 1 ? `active` : null}`}
            onClick={() => setActiveTab(1)}
          >
            Contributors
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#comments"
            className={`nav-link ${activeTab === 2 ? `active` : null}`}
            onClick={() => setActiveTab(2)}
          >
            Comments
          </a>
        </li>
      </ul>

      {/* Tab content */}
      <div className="tab-content container mt-3">
        {/* Description Tab */}
        <div
          className={`tab-pane ${activeTab === 0 ? `active` : null}`}
          id="description"
        >
          {dummyProjects[id - 1].description}
        </div>

        {/* Contributors Tab */}
        <div
          className={`tab-pane ${activeTab === 1 ? `active` : null}`}
          id="description"
        >
          {dummyProjects[id - 1].disqualified ? (
            <>
              <h2 className="font-weight-light text-center">
                This project was disqualified for PLAGIARISM.
              </h2>
              <h2 className="font-weight-light text-center">
                View the dispute statement here.
              </h2>
            </>
          ) : (
            <>
              <p className="text-center text-success font-weight-bold">
                {dummyProjects[id - 1].contributors.length} Contributors
              </p>
              <ul className="list-group list-group-flush">
                {renderContributors}
              </ul>
            </>
          )}
        </div>

        {/* Comments Tab */}
        <div
          className={`tab-pane ${activeTab === 2 ? `active` : null}`}
          id="description"
        >
          Comments
        </div>
      </div>
    </div>
  );
};

export default ProjectProfile;