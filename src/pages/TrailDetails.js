import React from "react";
import { useParams } from "react-router-dom";
import "./css/TrailDetails.css";
import { useEffect, useState } from 'react'

function TrailDetails({trail}) {
  const { trailId } = useParams();
  const [trails,setTrails]=useState([]);
  useEffect( ()=>{
    async function fetchTrails(){
      try{
        const response=await fetch(`http://localhost:5000/trails/${trailId}`);
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
  },[trailId]);

  return (
    <div className="trailDetail">
      <h1>Trail {trailId} Details Page</h1>
      <div className="details">
        <p>Starting: {trails.start}</p>
        <p>Destination: {trails.destination}</p>
        <p>Trip Type: {trails.mode}</p>
      </div>
      <button>Add to my lists</button>
    </div>

  );
}

export default TrailDetails;
