import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart,faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { faHeart as FaHeart} from '@fortawesome/free-regular-svg-icons'
import { db } from "../Firebase"
import { addDoc, getDocs,doc, deleteDoc,collection } from "firebase/firestore"


const Song = () => {
 
  const params = useParams();
  const [result, setResult] = useState([]);
  const [likes,setLikes] = useState([]) 
  const [id,setId] = useState("")
  const[like,setLike] = useState(false)
  const usercollection = collection(db,"list")
  const likeCollection = collection(db,"likes")
  const getData =async()=>{
    const likeData = await getDocs(likeCollection)
    setLikes(likeData.docs.map((doc)=>({...doc.data(),id:doc.id})))
    

  }
  const check = (key)=>{
    const temp = likes.findIndex((el)=>el.key === result?.key)
    
    if(temp === -1){
      setLike(false)
      
    }else{
      
      setId(likes[temp].id)
      setLike(true)
    }
  }

  const liking = async() =>{
    if(like){
      console.log(id)
      const userDoc = doc(db,"likes",id)
     
      await deleteDoc(userDoc)
      setLike(!like)
      alert("song Like remove")
    }else{
      addDoc(likeCollection,{key:result?.key})
      setLike(!like)
      alert("song liked")
    }


  }
  
  
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/songs/get-details",
      params: { key: `${params.key}`, locale: "en-US" },
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
      
      getData()
      
     
  }, []);
  useEffect(()=>{
    getData()
    console.log()
    check()
  })
  console.log()
  
  
  
  
  
 

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
              <FontAwesomeIcon icon={like?faHeart:FaHeart} className="Heart-icon" onClick={liking} />
              
              <button className="btn btn-primary p-3" onClick={()=>addDoc(usercollection,{key:result?.key}).then(()=>alert("song added"))}>
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
