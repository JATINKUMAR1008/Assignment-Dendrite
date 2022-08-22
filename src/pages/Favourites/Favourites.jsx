import React from "react";

import { useState } from "react";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Card from "../playlists/Card";
import CardsFav from "./CardsFav";


const Favourites = () => {
  const [list,setList] = useState([]);
  const usercollection = collection(db, "likes");
  const getData = async() => {
    const data = await getDocs(usercollection);
    if(data){
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    

  };

  
  useEffect(() => {
    getData();
    
  }, []);


  return(
    <>
    {list.map((key)=>(
      <CardsFav id={key}/>
    ))}
    </>
  )
};

export default Favourites;
