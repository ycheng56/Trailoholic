import "./css/TrailCards.css";
import React, { useEffect, useState } from "react";
import TrailCard from "./TrailCard";
import Filter from "./Filter";
import SearchTrails from "./SearchTrails";

function TrailCards(trail) {
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
    <div>
      {/* <div className="search-area">
        <SearchTrails />
        <Filter
          trails={trails}
          setFiltered={setFiltered}
          activeType={activeType}
          setActiveType={setActiveType}
        />
      </div> */}
      <div className="trailList">
        <div className="trailCards">
          <div className="cards">
            {filtered.map((item) => (
              <TrailCard key={item._id} trail={item} />
            ))}
          </div>
        </div>
        <div className="trailMap">
          <div className="trail-map">
            <img
              src={process.env.PUBLIC_URL + "/images/draft_map1.png"}
              alt="map-draft-pic"
              className="map-draft-pic"
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailCards;
