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
  Link,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import "../css/TrailCollection.css";

export default function PopularHikingTrail() {
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
    <div className="card">
      <div className="card-body">
        <img
          src={process.env.PUBLIC_URL + "/images/trail_3.jpg"}
          alt="pic"
          className="card-img"
        ></img>
        <h2 className="card-title">Stanley Park</h2>
        <p className="card-description">Stanely part trail</p>
        <button className="card-btn">View Trail</button>
      </div>
    </div>
  );
}
