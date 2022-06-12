import "./css/TrailCards.css";
import React, { useEffect, useState } from 'react'
import TrailCard from "./TrailCard";

function TrailCards(trail) {
  const [trails,setTrails]=useState([]);
  useEffect( ()=>{
    async function fetchTrails(){
      try{
        const response=await fetch("http://localhost:5000/trails")
        console.log(response);
        if(!response.ok){
          throw Error("Fetch failed");
        }
        const data = await response.json();
        console.log(data);
        setTrails(data);
      }catch(err){
        console.log("err",err);
      }
    }
    fetchTrails();
  },[]);

  return (
    <div className="trailCards">
      <div className="cards">
        {trails.map((item)=>
          <TrailCard
            key={item.id}
            trail={item}
          />
        )}
      </div>

      <div className="trail-map">
         <img src={process.env.PUBLIC_URL + '/images/draft_map1.png'} alt="map-draft-pic" className="map-draft-pic" />;
      </div>
    </div>
  );
}

export default TrailCards;
