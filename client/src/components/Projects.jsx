import React from "react";

import ProjectCard from "./ProjectCards";

import { dummyProjects } from "./dummyProjects";
import { Container } from "react-bootstrap";


const Projects =() => {
  const renderProjects = dummyProjects.map((details) => (
    <ProjectCard details={details} />
  ));

  return (
    <div className="container">
      {/* Header */}
      <h1 className="font-weight-light">Project Pool</h1>
      <h4 className="font-weight-lighter">
        Invest in Project to earn revenue as the Project Grows
      </h4>
      <h5 className="font-weight-lighter">
        <em></em>
      </h5>

      <hr />

      {/* Body - Divided into 2 columns*/}
      {/* Column 1 for filtering, Column 2 for displaying projects */}
      <div className="row">
        {/* Filters column */}
        <div className="col-3">
          <h5>Filter Projects</h5>
          <div>Defi</div>
          <div>Tech</div>
          <div>Community</div>
        </div>

        {/* Projects column */}
        <div className="col">
          {/* Search input with button */}
          <div className="input-group">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success"
                  type="button"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="container-fluid">
            <div className="row">{renderProjects}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;