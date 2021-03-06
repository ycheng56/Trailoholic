import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/TrailDetails.css";
import { useEffect, useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaDirections,
  FaHiking,
  FaRoad,
  FaRegClock,
} from "react-icons/fa";
import MapSingleTrail from "../mapbox/MapSingleTrail";
import ReviewPanel from "../components/ReviewPanel";
import AddReview from "../components/AddReview";
import ResponsiveSlider from "../components/TrailCollectionComponents/ResponsiveSlider";

export default function TrailDetails() {
  let navigate = useNavigate();
  const { user, isAuthenticated,loginWithRedirect } = useAuth0();
  const { trailId } = useParams();
  const [trails, setTrails] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [Lng, setLng] = useState(0);
  const [Lat, setLat] = useState(0);
  const [nearBy, setNearBy] = useState([]);
  const [like, setLike] = useState(0);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch(`/api/trails/${trailId}`);
        if (!response.ok) {
          navigate("/error");
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
        setInstruction(data.instruction);
        setLng(data.start.center[0]);
        setLat(data.start.center[1]);
        setLike(data.like);
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, [trailId]);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await fetch(`/api/users/${user.sub}`);
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
  }, [trailId]);

  async function addToList() {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } })
      return;
    }

    const newTrail = `${trailId}`;
    try {
      const updatedMyLists = [];
      updatedMyLists.push(newTrail);
      userLists.map((item) => updatedMyLists.push(item));
      const response = await fetch(`/api/users/update/lists/${user.sub}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          lists: updatedMyLists,
        }),
      });
      if (!response.ok) {
        throw Error("Post request failed!");
      }
      setUserLists(updatedMyLists);
    } catch (err) {
      console.log("err", err);
    }

    try {
      const newlike = like + 1;
      const response = await fetch(`/api/trails/like/${trailId}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          like: newlike,
        }),
      });
      if (!response.ok) {
        throw Error("PATCH request failed!");
      }
      setLike(newlike);
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    async function fetchNearByTrail() {
      try {
        const response = await fetch(
          `/api/search/trails?lng=${Lng}&lat=${Lat}`
        );
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setNearBy(data);
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchNearByTrail();
  }, [Lng]);

  async function removeFromList() {
    const deletedId = trailId;

    try {
      const updatedLists = userLists.filter((item) => item !== deletedId);
      const response = await fetch(`/api/users/update/lists/${user.sub}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          lists: updatedLists,
        }),
      });

      setUserLists(updatedLists);
    } catch (err) {
      console.log(err);
    }

    try {
      const newlike = like - 1;
      if (newlike < 0) return;
      const response = await fetch(`/api/trails/unlike/${trailId}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          like: newlike,
        }),
      });
      if (!response.ok) {
        throw Error("Post request failed!");
      }
      setLike(newlike);
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div className="detail-wrapper">
      <div id="detail-landing"></div>

      {/* <div className="detail-img">
        <img
          alt="trail detail picture"
          src={process.env.PUBLIC_URL + "/images/home_bg3.jpg"}
        ></img>
      </div> */}

      <main className="main-container" id="TrailDetrails-Page">
        <div className="detail-navbar">
          <a href="#detail-type">TRAIL DETAIL</a>
          <a href="#detail-instruction">INSTRUCTION</a>
          <a href="#detail-map">LOCATION</a>
          <a href="#reviews">REVIEWS</a>
          <a href="#detail-nearby">WHAT'S NEARBY</a>
        </div>

        <div className="detail-type" id="detail-type">
          <h1>TRAIL DETAIL</h1>
          <br />
          <div className="detail-type-wrapper">
            <div className="detail-type-item">
              <h2>{trails.mode}</h2>
              <FaHiking size="2rem" />
              <p>Trail Type</p>
            </div>
            <div className="detail-type-item">
              <h2>{trails.distance} km</h2>
              <FaRoad size="2rem" />
              <p>Trail Distance</p>
            </div>
            <div className="detail-type-item">
              <h2>{trails.duration} mins</h2>
              <FaRegClock size="2rem" />
              <p>Trail Duration</p>
            </div>
          </div>
        </div>

        <hr />

        <div className="detail-instruction" id="detail-instruction">
          <h1>INSTRUCTION</h1>
          <div className="detail-instruction-place">
            <p>
              <strong>Starting Point: {trails.start?.["text_en"]}</strong>
            </p>
            <p>{trails.start?.["place_name_en"]}</p>
          </div>

          <div className="detail-instruction-place">
            <p>
              <strong>Destination: {trails.destination?.["text_en"]}</strong>
            </p>
            <p>{trails.destination?.["place_name_en"]}</p>
          </div>

          <p>
            <ul>
              {instruction.map((item, index) => (
                <li key={index}>
                  <FaDirections className="direction-icon" />
                  {item}
                </li>
              ))}
            </ul>
          </p>

          <div className="addlist">
            <p>{like} trailcoholics like this trail. Do you like it?</p>
            {userLists.includes(trailId) ? (
              <button
                onClick={removeFromList}
                className="addToListBtn like-button"
              >
                <FaStar color="#f5d24c"></FaStar>
                Remove From My Lists
              </button>
            ) : (
              <button onClick={addToList} className="like-button">
                <FaRegStar color="#f5d24c"></FaRegStar>
                Add to my lists
              </button>
            )}
          </div>
        </div>

        <hr />
        <div className="detail-map" id="detail-map">
          <h1>Location</h1>
          <div className="detail-map-container">
            <MapSingleTrail trail={trails} />
          </div>
        </div>

        <hr />

        <div className="reviews" id="reviews">
          <h1>Reviews</h1>
          <div className="review-add">
            <AddReview trail_id={trailId}></AddReview>
          </div>

          <div className="review-list">
            <ReviewPanel trail_id={trailId}></ReviewPanel>
          </div>
        </div>

        <hr />

        <div className="detail-nearby" id="detail-nearby">
          <h1>What's Nearby</h1>
          {nearBy && <ResponsiveSlider list={[...nearBy]}></ResponsiveSlider>}
          <br />
        </div>
      </main>
    </div>
  );
}
