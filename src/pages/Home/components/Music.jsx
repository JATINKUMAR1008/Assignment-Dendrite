import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import Recommanded from "./Recommanded";
const Music = ({ sidenav }) => {
  const [songs, setSongs] = useState([]);
  const left =()=>{
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft-500
  }
  const right =() =>{
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft+500
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/songs/list-artist-top-tracks",
      params: { id: "40008598", locale: "en-US" },
      headers: {
        'X-RapidAPI-Key': '8490973f37mshd273b80f19a8350p1625d7jsn64815705c1c5',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSongs(response.data.tracks);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className={sidenav ? "open" : "closed"}>
      <div className="Music-container">
        <div className="d-flex mt-5 p-2 justify-content-between align-items-center">
          <h3 className="  music-heading">RELEASED THIS WEEK</h3>
          <span className={sidenav ? "line-non" : "line"}></span>
          <div className="Arrow-icons ">
            <FontAwesomeIcon icon={faAngleLeft} className="Arrow-Left-icon" onClick={left}/>
            <FontAwesomeIcon icon={faAngleRight} className="Arrow-Right-icon" onClick={right} />
          </div>
        </div>
        <div className="mt-1 p-1">
          <div className="position-relative d-flex">
            <div id={"slider"} className="scrollbar d-flex align-items-center ">
              {songs?.map(({ title, key, images }) => (
                  <div className="d-inline-block scrollimages" key={key}>
                    <Link to={`/song/${key}`} className="image-link">
                    <img
                      src={images.coverart}
                      alt={title}
                      style={{ width: "20vh", height: "20vh" }}
                      className="musicimage"
                    />
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="p-2 text-center text-dark ">
                        <p className="fw-bold text-wrap">{title}</p>
                      </div>
                      
                      
                    </div>
                    </Link>
                    </div>
                    
              ))}
            </div>
          </div>
        </div>
        <Recommanded sidenav={sidenav}/>
          </div>
        </div>

  );
};

export default Music;
