import React from "react";
import "./css/home.css";
import { Link } from "react-router-dom";
import SearchTrails from "../components/SearchTrails";
import { Carousel } from "react-bootstrap";
import Greeting from "../components/Greeting";

export default function Home() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/images/home_bg2.jpg"}
            alt="Home slide"
          />
          <Carousel.Caption>
          {/* <Greeting/> */}
            <SearchTrails />
            <p>There are no shortcuts to any place worth going.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/images/home_bg1.jpg"}
            alt="Second slide"
          />

          <Carousel.Caption>
            <SearchTrails />
            <p>
              Look deep into nature and you will understand everything better.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/images/home_bg3.jpg"}
            alt="Third slide"
          />

          <Carousel.Caption>
            <SearchTrails />
            <p>The best views come after the hardest climb</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
      <Link to="trails">Explore all routes</Link>
    </div>
  );
}
