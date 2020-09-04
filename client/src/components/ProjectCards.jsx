import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ details }) => {
  return (
    <div className="col-4 mb-4">
      <div class="card">
        <img
          class="card-img-top"
          src={details.image}
          alt="Project Background"
        />
        <div class="card-body">
          <h5 class="card-title">{details.title}</h5>
          <p class="card-text">{details.description}</p>
          <Link to={`/rounds/contribute/${details.id}`}>
            <button class="btn btn-primary btn-block">Contribute</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;