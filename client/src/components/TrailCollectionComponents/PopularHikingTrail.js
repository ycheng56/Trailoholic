import React from "react";
import { useState, useEffect } from "react";
import "../css/TrailCollection.css";
import { Link } from "react-router-dom";
import {FaStar, FaBicycle , FaHiking} from "react-icons/fa"
import { useParams } from "react-router-dom";
import { fetchAllTrails } from "../../api/API";


export default function PopularHikingTrail({ trail }) {

  const num = trail?.image;
  console.log(num);
  const picNum = (num)%5;
  const hikePicUri = "trail_"+picNum+".jpg";
  const cyclePicUri = "cycling_"+picNum+".jpg";
  return (
    <div className="card landingpage-card">
      <Link style={{textDecoration:"none", color:"inherit"}} to={`/trails/${trail?._id}`}>
      <div className="card-body">
      {(trail?.mode === "cycling")?<img src={process.env.PUBLIC_URL + "/images/"+cyclePicUri}
          alt="pic"
          className="card-img"></img> : <img src={process.env.PUBLIC_URL + "/images/"+hikePicUri}
          alt="pic"
          className="card-img"></img>}

        <div className="card-title">
          <p><strong >{trail?.start.text_en}</strong></p>
        </div>
        
        <div className="card-description">
          <span>{
          (trail?.mode === "cycling") ?
          <FaBicycle></FaBicycle>
          :
          <FaHiking></FaHiking>
          }
          </span>
          <span> • </span>
          <span>{trail?.difficulty}</span>
          <span> • </span>
          <FaStar color="#f5d24c" className="star"></FaStar>
          <span> 523 </span>
        </div>

        <div className="card-description">
          <span>Length: {trail?.distance} km</span>
          <span> • </span>
          <span>Time: {trail?.duration} m</span>
        </div>
      </div>
      </Link>
    </div>
  );
}
