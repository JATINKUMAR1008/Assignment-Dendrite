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
    console.log("left")
  }
  const right =() =>{
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft+500
    console.log("right")
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/songs/list-artist-top-tracks",
      params: { id: "40008598", locale: "en-US" },
      headers: {
        'X-RapidAPI-Key': '48db9dd94emsh47fd7479b0fe054p13d67cjsn0cc67c824674',
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
    <div className={sidenav ? "open mt-4" : "closed mt-4"}>
      <div className="Music-container">
        <div className="d-flex mt-5 p-2 justify-content-between align-items-center">
          <h3 className="  music-heading">RELEASED THIS WEEK</h3>
          <span className={sidenav ? "line-non" : "line"}></span>
          <div className="Arrow-icons d-flex flex-row">
            <div className="Arrow-Left-icon">
            <FontAwesomeIcon icon={faAngleLeft}  onClick={left}/>
            </div>
            <div className="Arrow-Right-icon">
            <FontAwesomeIcon icon={faAngleRight}  onClick={right} />
            </div>
            
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
