import React, { useEffect, useState } from "react";
// import "../mapbox/Map.css";
import Map from "../mapbox/Map";
import TrailCards from "../components/TrailCards";
import Filter from "../components/Filter";
import SearchTrails from "../components/SearchTrails";
import "./css/TrailMap.css";

function TrailsMap() {
  const [trails, setTrails] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState("");

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch("/api/trails");
        
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
        setFiltered(data);
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, []);

  return (
    <div className="trailWrapper">
      <div className="search-area">
        <div className="serach-box children">
          <SearchTrails />
        </div>
        <div className="filter-area children">
        <Filter
          trails={trails}
          setFiltered={setFiltered}
          activeType={activeType}
          setActiveType={setActiveType}
        />
        </div>

      </div>
      <div className="trailList">
        <div className="trailsCardSideBar">
          <TrailCards trails={filtered} />
        </div>

        <div className="map-container">
          <Map trails={filtered} />
        </div>
      </div>
    </div>
  );
}

export default TrailsMap;
