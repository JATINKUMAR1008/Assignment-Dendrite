import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faArrowRight,
  faArrowLeft,
  faMagnifyingGlass,
  faStar,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useState } from "react";
const Sidebar = ({sidenav,handleChange}) => {
  
  const menuList = [
    {
      id: 1,
      name: "home",
      icon: <FontAwesomeIcon icon={faBarsStaggered} />,
    },
    {
      id: 2,
      name: "search",
      icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    },
    {
      id: 3,
      name: "favourites",
      icon: <FontAwesomeIcon icon={faStar} />,
    },
    {
      id: 4,
      name: "playlists",
      icon: <FontAwesomeIcon icon={faCirclePlay} />,
    },
  ];

  return (
    <div className="">
      <nav
        className={
          sidenav ? "navbar-active navbar-expand " : "navbar navbar-expand "
        }
        id="sidebar"
        
      >
        <div className="arrow-box mt-5 ">
         
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="">
            <ul className="navbar-nav d-flex flex-column  list-unstyled ">
              {menuList.map(({ id, name, icon }) => (
                
                  <li key={id} className="nav-item w-100 pl-4 text-capitalize p-2" onClick={handleChange}>
                    <Link className="nav-link " to={`/${name}`}>
                    <span className="list-menu">{icon}</span>
                    {name}
                    </Link>
                  </li>
                
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
