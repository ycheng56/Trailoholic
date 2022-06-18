import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrailCard from "../components/TrailCard";

export default function SearchPage() {
  const { searchCriteria } = useParams();
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch(
          `/api/search/trails?mode=${searchCriteria}`
        );
        //   console.log(searchCriteria);
        //   console.log(response)
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
          console.log("data",data);
          console.log("trails:",trails);
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, [trails]);

  return (
    <div>
      <TrailCard />
      <div>Search Result for {searchCriteria}</div>
      <div className="trailCards">
        <div className="cards">
          {trails.map((item) => (
            <TrailCard key={item._id} trail={item} />
          ))}
        </div>

        <div className="trail-map">
          <img
            src={process.env.PUBLIC_URL + "/images/draft_map1.png"}
            alt="map-draft-pic"
            className="map-draft-pic"
          />
          ;
        </div>
      </div>
      {/* <div className="details">
        <p>Starting: {trails.start}</p>
        <p>Destination: {trails.destination}</p>
        <p>Trip Type: {trails.mode}</p>
      </div> */}
    </div>
  );
}
