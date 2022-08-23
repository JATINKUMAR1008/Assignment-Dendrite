import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
const Recommanded = ({sidenav}) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/songs/list-recommendations',
        params: {key: '484129036', locale: 'en-US'},
        headers: {
          'X-RapidAPI-Key': '48db9dd94emsh47fd7479b0fe054p13d67cjsn0cc67c824674',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
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
    <>
      <div className="d-flex mt-5 p-2 justify-content-between align-items-center">
        <h3 className="  music-heading">RECOMMENDATIONS FROM US</h3>
        <span className={sidenav ? "line-non" : "line"}></span>
        <div className="Arrow-icons ">
          <FontAwesomeIcon icon={faAngleLeft} className="Arrow-Left-icon" />
          <FontAwesomeIcon icon={faAngleRight} className="Arrow-Right-icon" />
        </div>
      </div>
      <div className="mt-1 p-1">
        <div className="position-relative d-flex">
          <div id={"slider-y"} className="scrollbar d-flex align-items-center ">
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
    </>
  );
};

export default Recommanded;
