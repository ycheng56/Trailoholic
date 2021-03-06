import React, { useState, useEffect } from "react";
import "./css/home.css";
import Greeting from "../components/Greeting";
import { FaArrowCircleRight } from "react-icons/fa";
import ResponsiveSlider from "../components/TrailCollectionComponents/ResponsiveSlider";
import Search from "../mapbox/Search";
import { fetchAllTrails, fetchTrailsByMode } from "../api/API";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { user,isAuthenticated } = useAuth0();
  const [userLists, setUserLists] = useState([]);
  const [userTrails, setUserTrails] = useState([]);
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

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await fetch(
          `/api/users/${user?.sub}`
        );
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setUserLists(data.lists);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUserList();
  }, [user]);

  useEffect(() => {
    async function fetchTrails() {
      const trailsData = [];
      for (const item of userLists) {
        try {
          const response = await fetch(
            `/api/trails/${item}`
          );
          if (!response.ok) {
            throw Error("Fetch failed");
          }
          const data = await response.json();
          trailsData.push(data);
        } catch (err) {
          console.log("catch ", err);
        }
      }
      setUserTrails(trailsData);
    }
    fetchTrails();
  }, [userLists]);

  return (
    <div className="landing-page" id="Home-Page">
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
              <Link className="section-header-link" to="/trails/map">
                <strong>view all</strong>
                <FaArrowCircleRight className="section-header-icon"></FaArrowCircleRight>
              </Link>
            </div>
          </div>

          <ResponsiveSlider list={trails}></ResponsiveSlider>
        </div>

        <div className="section-container favoriteHiking">
          <div className="section-header-container">
            <div className="section-header-content">
              <h1>Best Hiking Trails</h1>
              <Link className="section-header-link"  to="/trails/map/walking">
                <strong>view all</strong>
                <FaArrowCircleRight className="section-header-icon"></FaArrowCircleRight>
              </Link>
            </div>
          </div>

          <ResponsiveSlider list={hikingTrails}></ResponsiveSlider>
        </div>

        <div className="section-container favoriteBiking">
          <div className="section-header-container">
            <div className="section-header-content">
              <h1>Best Cycling Trails</h1>
              <Link className="section-header-link" to="/trails/map/cycling">
                <strong>view all</strong>
                <FaArrowCircleRight className="section-header-icon"></FaArrowCircleRight>
              </Link>
            </div>
          </div>

          <ResponsiveSlider list={cyclingTrails}></ResponsiveSlider>
        </div>

        {isAuthenticated && <div className="section-container myFavorite">
          <div className="section-header-container">
            <div className="section-header-content">
              <h1>My Favorites Trails</h1>
              <Link className="section-header-link" to="/user/lists">
                <strong>view all</strong>
                <FaArrowCircleRight className="section-header-icon"></FaArrowCircleRight>
              </Link>
            </div>
          </div>

          <ResponsiveSlider list={userTrails}></ResponsiveSlider>
        </div>}

      </main>
    </div>
  );
}
