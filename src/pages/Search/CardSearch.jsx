import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CardSearch = () => {
  const params = useParams();
  const [search, setSearch] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: {
        term: `${params.name}`,
        locale: "en-US",
        offset: "0",
        limit: "5",
      },
      headers: {
        'X-RapidAPI-Key': 'd06e920980msh07c901377c61630p18741djsn300a8fac36e7',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSearch(response.data.tracks.hits);
        console.log("data");
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [console.log(search)]);

  return (
    <>
      <div className="mt-5">
        <p className="card-search-heading">
          Your Search Results found {search.length}.
        </p>
      </div>
      {search?.map(({ track }) => (
        <div className="d-flex align-items-center justify-content-center p-2">
          <Link to={`/song/${track?.key}`}>
          <div className="card mb-3 card-search text-dark">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={track?.images.coverart} className="card-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{track?.title}</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text d-flex align-items-centerr">
                    <small className="text-muted">{track?.subtitle}</small>
                    <img src={track?.images?.background} alt={track?.subtitle} className="card-img-background"/>
                  </p>
                </div>
              </div>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default CardSearch;
