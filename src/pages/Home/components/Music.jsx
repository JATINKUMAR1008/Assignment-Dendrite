import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
import { Link } from "react-router-dom";
const Music = ({ sidenav }) => {
  const [songs, setSongs] = useState([]);
  const[menu,setMenu] = useState(false);
  const toogle =({id})=>{
    songs.map(({key}) => {
      if({key} === id) {
        setMenu(!menu)
      }
    })
  }


  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/songs/list-artist-top-tracks",
      params: { id: "40008598", locale: "en-US" },
      headers: {
        'X-RapidAPI-Key': 'd06e920980msh07c901377c61630p18741djsn300a8fac36e7',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.tracks);
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
            <FontAwesomeIcon icon={faAngleLeft} className="Arrow-Left-icon" />
            <FontAwesomeIcon icon={faAngleRight} className="Arrow-Right-icon" />
          </div>
        </div>
        <div className="mt-1 p-1">
          <div className="position-relative d-flex">
            <div id={"slider"} className="scrollbar d-flex align-items-center ">
              {songs.map(({ title, key, images }) => (
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
        <div className="d-flex mt-5 p-2 justify-content-between align-items-center">
          <h3 className="  music-heading">RECOMMANDATIONS FROM US</h3>
          <span className={sidenav ? "line-non" : "line"}></span>
          <div className="Arrow-icons ">
            <FontAwesomeIcon icon={faAngleLeft} className="Arrow-Left-icon" />
            <FontAwesomeIcon icon={faAngleRight} className="Arrow-Right-icon" />
          </div>
        </div>
        <div className="mt-1 p-1">
          <div className="position-relative d-flex">
            <div id={"slider"} className="scrollbar d-flex align-items-center ">
            {songs.map(({ title, key, images }) => (
              
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
      </div>
    </div>
  );
};

export default Music;
