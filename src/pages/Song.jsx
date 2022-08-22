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
  const[list,setList] = useState([])
  const usercollection = collection(db,"list")
  const likeCollection = collection(db,"likes")
  
  const check = ()=>{
    
    
    likes.map(({key,id})=>{
      console.log(key,result?.key)
      if(key===result?.key){
        setLike(!like)
        setId(id)
      }
    })
  }

  const liking = async() =>{
    if(like){
      const userDoc = doc(db,"likes",id)
      console.log(id)
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
        'X-RapidAPI-Key': '8490973f37mshd273b80f19a8350p1625d7jsn64815705c1c5',
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
      const getData =async()=>{
        const data = await getDocs(usercollection)
        const likeData = await getDocs(likeCollection)
        setList(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
        
       setLikes(likeData.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
    
      }
      getData()
      
     
  }, []);
  useEffect(()=>{
    check()
  },)
  
  
  
  
 

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
