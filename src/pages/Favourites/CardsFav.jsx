import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { db } from "../../Firebase";
import{ deleteDoc, doc } from "firebase/firestore"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
const CardsFav = ({id}) => {
    const [result,setResult] = useState([])
    useEffect(()=>{
        const options = {
            method: "GET",
            url: "https://shazam.p.rapidapi.com/songs/get-details",
            params: { key: `${id.key}`, locale: "en-US" },
            headers: {
              'X-RapidAPI-Key': '48db9dd94emsh47fd7479b0fe054p13d67cjsn0cc67c824674',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            },
          };
          axios
            .request(options)
            .then(function (response) {
              
    
              setResult(response.data)
              
              
            })
            .catch(function (error) {
              console.error(error);
            });
    },[])

  return (
    <Link to={`/song/${result?.key}`}>
    <div className='text-dark'>

    <div className="song-card">
    <div className="song-card-container">

        <div className="card mb-3">
        <img src={result?.images?.coverart} className="card-img-top card-img-coverart" alt="..." />
        <div className="card-body">
          <h5 className="card-title p-2 mt-3">{result?.title}</h5>
          <p className="card-text text-dark p-2">
            This is a wider card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
          <p className="card-text d-flex align-items-center p-2">
            <small className="text-muted">{`by ${result?.subtitle}`}</small>
            <img src={result?.images?.background} alt={result?.subtitle} className="card-img-background"/>
          </p>
          <div className="d-flex p-2 align-items-center icon-card ">
            <p className="w-100 text-end">
            
            </p>
            
          </div>
          </div>

          </div>
    
     
  
              

      
    </div>
  </div>
    </div>
    </Link>
  )
}

export default CardsFav