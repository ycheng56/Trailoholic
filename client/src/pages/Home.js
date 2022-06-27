import React, { useState, useEffect } from "react";
import "./css/home.css";
import Greeting from "../components/Greeting";
import PopularHikingTrail from "../components/TrailCollectionComponents/PopularHikingTrail";
import { FaArrowCircleRight } from "react-icons/fa";
import Slider from "react-slick";
import ResponsiveSlider from "../components/TrailCollectionComponents/ResponsiveSlider";
import Search from "../mapbox/Search";
import { fetchAllTrails, fetchTrailsByMode } from "../api/API";

export default function Home() {
  const [trails, setTrails] = useState([]);
  const [cyclingTrails, setCyclingTrails] = useState([]);
  const [hikingTrails, setHikingTrails] = useState([]);

  useEffect(() => {
    const getTrails = async () => {
      const data = await fetchAllTrails();
      const cycling = await fetchTrailsByMode("cycling");
      const hiking = await fetchTrailsByMode("walking");
      setTrails(data);
      setCyclingTrails(cycling);
      setHikingTrails(hiking);
    };
    getTrails();
  }, []);

  return (
    <div className="landing-page">
      <div id="home">
        <div className="landing-text">
          <Greeting />
          <Search></Search>
        </div>
      </div>

      <main className="main-container">
        <div className="section-container localFavorite">
          <div className="section-header-container">
            <div className="section-header-content">
              <h1>Local Favorites near Vancouver</h1>
              <a className="section-header-link" href="/trails">
                <strong>view all</strong>
                <FaArrowCircleRight className="section-header-icon"></FaArrowCircleRight>
              </a>
            </div>
          </div>

          <ResponsiveSlider list={trails}></ResponsiveSlider>
        </div>

        <div className="section-container favoriteHiking">
          <div className="section-header-container">
            <div className="section-header-content">
              <h1>Best Hiking Trails</h1>
              <a className="section-header-link"  href="/trails/map/walking">
                <strong>view all</strong>
                <FaArrowCircleRight className="section-header-icon"></FaArrowCircleRight>
              </a>
            </div>
          </div>

          <ResponsiveSlider list={hikingTrails}></ResponsiveSlider>
        </div>

        <div className="section-container favoriteBiking">
          <div className="section-header-container">
            <div className="section-header-content">
              <h1>Best Cycling Trails</h1>
              <a className="section-header-link" href="/trails/map/cycling">
                <strong>view all</strong>
                <FaArrowCircleRight className="section-header-icon"></FaArrowCircleRight>
              </a>
            </div>
          </div>

          <ResponsiveSlider list={cyclingTrails}></ResponsiveSlider>
        </div>
      </main>
    </div>
  );
}
