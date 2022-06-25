import "./css/TrailCards.css";
import React from 'react'
import PopularHikingTrail from "./TrailCollectionComponents/PopularHikingTrail"

function TrailCards({trails}) {

  return (
    <div className="cards-collection">
      <div className="cards">
        {trails.map((item)=>
          <PopularHikingTrail key={item._id} trail={item}/>
        )}
      </div>
    </div>
  );
}

export default TrailCards;
