import React from "react";
import image from "../../../assets/svg1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
const Main = ({ sidenav, handleChange }) => {
  return (
    <div className={`Main-container ${sidenav ? "open" : "closed"}`}>
      <div>
        <img src={image} alt="image" className="image-main"/>
        <div className=" text-white text-end ">
          <div className="card-img-overlay">
            <p className="fw-bold p-1 main-title">
              Your favourite tunes
              <p className="fs-2">All and all</p>
            </p>
<div className="w-100 btn-container">
            <button className="btn btn-primary btn-bars" onClick={handleChange}>
              <FontAwesomeIcon icon={faBars}/>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
