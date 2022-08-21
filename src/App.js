import { Routes,Route } from 'react-router-dom'
import Main from "./pages/Home/components/Main";
import Sidebar from "./Sidebar";
import Search from './pages/Search/Search'
import { useEffect, useState } from 'react'
import Home from "./pages/Home/Home";
import Song from './pages/Song';
import CardSearch from './pages/Search/CardSearch';

import { db } from "./Firebase"
import { addDoc, collection, getDocs } from "firebase/firestore"

function App() {
  const [keys,setKeys] = useState([])
  const ref = collection(db,"key")
  const [sidenav, setSidenav] = useState(false);
  const handleChange = () => {
    setSidenav(!sidenav);
  };
  const createUser = async()=>{
    await addDoc(ref,{key:1234,status:false })
  }
  useEffect(()=>{
    const getKeys = async()=>{
      const data = await getDocs(ref)
      setKeys(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      
    }
    
    getKeys();
    keys.map(({key,status})=>(
      console.log(key,status)
    ))
  },[])
  return (
    <div className="App">

      <Sidebar sidenav={sidenav} handleChange={handleChange}/>
      <Main sidenav={sidenav} handleChange={handleChange}/>
      <Routes>
     
     <Route element={<Home sidenav={sidenav} handleChange={handleChange}/>} path="/" exact/>
     <Route element={<Home sidenav={sidenav} handleChange={handleChange}/>} path="/home" exact/>
     <Route element={<Search sidenav={sidenav}/>} path="/search" exact/>
     <Route path='/search/:name' element={<CardSearch/>}/>
     <Route path="/song/:key" element={<Song/>}/>
     
     </Routes>
    </div>
  );
}

export default App;
