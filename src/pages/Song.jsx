import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart,faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { faHeart as FaHeart} from '@fortawesome/free-regular-svg-icons'



import { db } from "../Firebase"
import { addDoc, collection, getDocs,doc, deleteDoc } from "firebase/firestore"
import { async } from "@firebase/util";

const Song = () => {
 
  const params = useParams();
  const [result, setResult] = useState([]);
  const[like,setLike] = useState(false)

  
  
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/songs/get-details",
      params: { key: `${params.key}`, locale: "en-US" },
      headers: {
        'X-RapidAPI-Key': 'd06e920980msh07c901377c61630p18741djsn300a8fac36e7',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      },
    };

    axios
      .request(options)
      .then(function (response) {
        
        console.log(response.data);
        setResult(response.data)

        console.log(result)
      })
      .catch(function (error) {
        console.error(error);
      });
      
  }, []);
  
      
  
 

  return (
    <div className="song-card">
      <div className="song-card-container">
       
          <div className="card mb-3">
          <img src={result?.images?.coverart} className="card-img-top card-img-coverart" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{result?.title}</h5>
            <p className="card-text text-dark">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text d-flex align-items-center">
              <small className="text-muted">{`by ${result?.subtitle}`}</small>
              <img src={result?.images?.background} alt={result?.subtitle} className="card-img-background"/>
            </p>
            <div className="d-flex p-2 align-items-center icon-card ">
              <p className="w-100 text-end">
              <FontAwesomeIcon icon={like?faHeart:FaHeart} className="Heart-icon" onClick={()=> setLike(true)}/>
              
              <button className="btn btn-primary p-3">
                Add to playlist <FontAwesomeIcon icon={faCirclePlus}/>
              </button>
              </p>
              
            </div>
          </div>
        </div>
    
                

        
      </div>
    </div>
  );
};

export default Song;
