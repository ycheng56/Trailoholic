import React, { useEffect, useState } from "react";
import "./css/Map.css";
import TrailCard from "../components/TrailCard";
import Map from "../mapbox/Map";
import NewTrailCards from "../components/NewTrailCards";

function TrailsMap() {
  // const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 49.19,
    longitude: -123.17,
    zoom: 10,
  });

  const [trails, setTrails] = useState([]);
  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch("/api/trails");
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, []);

  return (
    <>
      <div className="trailsCardSideBar">
        <NewTrailCards trails={trails}/>
      </div>

      <div className="map-container">
        <Map trails={trails} />
      </div>
    </>
  );
}

export default TrailsMap;
