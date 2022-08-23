import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
const Search = ({ sidenav }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="">
      <div className="mt-5 fs-1 fw-bold search-heading">
        <p className="heading-search">
        Search your Favourite songs.
        </p>
        <span className="line search-line"></span>
      </div>

      <div className="grid">
        <div className="row search-container">
          <div className="search-bar">
            <div className="input-group rounded">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search your Song ..................."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-text border-0" id="search-addon">
                <Link to={`/search/${search}`}>
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
