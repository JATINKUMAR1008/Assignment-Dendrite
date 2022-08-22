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
import Playlist from './pages/playlists/Playlist';
import Favourites from './pages/Favourites/Favourites';

function App() {
  const [keys,setKeys] = useState([])
  const ref = collection(db,"key")
  const [sidenav, setSidenav] = useState(false);
  const handleChange = () => {
    setSidenav(!sidenav);
  };
  
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
     <Route path='/playlists' element={<Playlist/>}/>
     <Route path='/favourites' element={<Favourites/>}/>
     </Routes>
    </div>
  );
}

export default App;
