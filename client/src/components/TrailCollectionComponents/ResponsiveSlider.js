import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import PopularHikingTrail from "./PopularHikingTrail"
import "../css/TrailCollection.css";


export default function ResponsiveSlider() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        <div>
          <PopularHikingTrail />
        </div>
        <div>
        <PopularHikingTrail />
        </div>
        <div>
        <PopularHikingTrail />
        </div>
        <div>
        <PopularHikingTrail />
        </div>
        <div>
        <PopularHikingTrail />
        </div>
        <div>
        <PopularHikingTrail />
        </div>
        <div>
        <PopularHikingTrail />
        </div>
      </Slider>
    </div>
  );
}
