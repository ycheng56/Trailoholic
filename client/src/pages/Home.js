import React from "react";
import "./css/home.css";
import { Link } from "react-router-dom";
import SearchTrails from "../components/SearchTrails";
import { Carousel } from "react-bootstrap";
import Greeting from "../components/Greeting";
import { Box, Rating } from "@mui/material";
import {
  Grid,
  Card,
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import PopularHikingTrail from "../components/TrailCollectionComponents/PopularHikingTrail";

export default function Home() {
  return (
    <div className="landing-page">
      <Carousel fade className="landing-page-carousel">
        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100 min-vh-90"
            src={process.env.PUBLIC_URL + "/images/home_bg2.jpg"}
            alt="Home slide"
          />
          <Carousel.Caption>
            {/* <Greeting/> */}
            <SearchTrails />
            <p>There are no shortcuts to any place worth going.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100 min-vh-90"
            src={process.env.PUBLIC_URL + "/images/home_bg1.jpg"}
            alt="Second slide"
          />

          <Carousel.Caption>
            <Greeting />
            <SearchTrails />
            <p>
              Look deep into nature and you will understand everything better.
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100 min-vh-90"
            src={process.env.PUBLIC_URL + "/images/home_bg3.jpg"}
            alt="Third slide"
          />

          <Carousel.Caption>
            <Greeting />
            <SearchTrails />
            <p>The best views come after the hardest climb</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="localFavorite">
        <h1>Local Favorites near Vancouver City</h1>
        <div className="wrapper">
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
        </div>
      </div>

      <div className="favoriteHiking">
        <h1>Best Hiking Trails</h1>
        <div className="wrapper">
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
        </div>
      </div>

      <div className="favoriteBiking">
        <h1>Best Biking Trails</h1>
        <div className="wrapper">
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
        </div>
      </div>
    </div>
  );
}
