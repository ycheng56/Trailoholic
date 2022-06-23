import "./css/TrailCards.css";
import React from 'react'
import TrailCard from "./TrailCard";

function TrailCards({trails}) {

  return (
    <div className="trailCards">
      <div className="cards">
        {trails.map((item)=>
          <TrailCard
            key={item._id}
            trail={item}
          />
        )}
      </div>
    </div>
  );
}

export default TrailCards;
