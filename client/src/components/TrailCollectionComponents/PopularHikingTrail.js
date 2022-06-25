import React from "react";
import {
  Card,
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  ImageCard,
  Rating,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import "../css/TrailCollection.css";
import { Link } from "react-router-dom";
import {FaStar, FaBicycle , FaHiking} from "react-icons/fa"


export default function PopularHikingTrail({ trail }) {
  return (
    <div className="card">
      <Link style={{textDecoration:"none", color:"inherit"}} to={`/trails/${trail?._id}`}>
      <div className="card-body">
        <img
          src={process.env.PUBLIC_URL + "/images/trail_3.jpg"}
          alt="pic"
          className="card-img"
        ></img>
        
        <div className="card-title">
          <strong >{trail?.start.text_en}</strong>
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
