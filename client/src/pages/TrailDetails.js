import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/TrailDetails.css";
import { useEffect, useState } from "react";
import { FaDirections, FaHiking, FaRoad, FaRegClock } from "react-icons/fa";
import MapSinglePoint from "../mapbox/MapSinglePoint";
import PopularHikingTrail from "../components/TrailCollectionComponents/PopularHikingTrail";
import MapSingleTrail from "../mapbox/MapSingleTrail";

export default function TrailDetails() {
  const { user, isAuthenticated } = useAuth0();
  const { trailId } = useParams();
  const [trails, setTrails] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [Lng, setLng] = useState(0);
  const [Lat, setLat] = useState(0);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch(`/api/trails/${trailId}`);
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
        setInstruction(data.instruction);
        setLng(data.start.center[0]);
        setLat(data.start.center[1]);
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
      alert("Please Login");
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
        throw Error("PATCH request failed!");
      }
      alert("Successfully added to your list");
      setUserLists(updatedMyLists);
    } catch (err) {
      console.log("err", err);
    }
  }

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
  }
  console.log(trails);
  // console.log("trails:",trails?.start["text_en"]);
  return (
    <div className="detail-wrapper">
      {/*

      <p>Instruction for the trail:{instruction.map((item,index)=>(<li key={index}>{item}</li>))}</p>

      {userLists.includes(trailId) ? (
        <button onClick={removeFromList}>Remove From My Lists</button>
      ) : (
        <button onClick={addToList}>Add to my lists</button>
      )}
      <div className="map-container">
        <MapSinglePoint trails={trails} Lng={Lng} Lat={Lat} />
      </div> */}

      <div className="detail-img">
        <img
          alt="trail detail picture"
          src={process.env.PUBLIC_URL + "/images/home_bg3.jpg"}
        ></img>
        {/* <div className="button-left"><h1>{trails.start?.["text_en"]}</h1></div> */}
      </div>

      <div className="detail-navbar">
        <a href="#detail-type">TRAIL DETAIL</a>
        <a href="#detail-instruction">INSTRUCTION</a>
        <a href="#detail-map">LOCATION</a>
        <a href="#detail-nearby">WHAT'S NEARBY</a>
        <a href="#detail-suggestion">YOU MAY ALSO ENJOY</a>
      </div>
      <hr className="navbar-hr"></hr>

      <div className="detail-type" id="detail-type">
        <h1>TRAIL DETAIL</h1>
        <div className="detail-type-wrapper">
          <div>
            <FaHiking size="2rem" />
            <p>Trail Type</p>
            <p>{trails.mode}</p>
          </div>
          <div>
            <FaRoad size="2rem" />
            <p>Trail Distance</p>
            <p>{trails.distance} km</p>
          </div>
          <div>
            <FaRegClock size="2rem" />
            <p>Trail Duration</p>
            <p>{trails.duration} mins</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="detail-instruction" id="detail-instruction">
        <h1>INSTRUCTION</h1>
        <p>Starts from:{trails.start?.["text_en"]}</p>
        <p>Destination:{trails.destination?.["text_en"]}</p>
        <p>
          <strong>Instruction for the trail:</strong>
          {instruction.map((item, index) => (
            <li key={index}>
              <FaDirections className="direction-icon" />
              {item}
            </li>
          ))}
        </p>
        <div className="addlist">
          <p>Do you like it? Add this trail to my list:</p>
          {userLists.includes(trailId) ? (
            <button onClick={removeFromList} className="addToListBtn">
              Remove From My Lists
            </button>
          ) : (
            <button onClick={addToList}>Add to my lists❤</button>
          )}
        </div>
      </div>

      <hr />
      <div className="detail-map" id="detail-map">
        <h1>Location</h1>
        <div className="map-container">
          <MapSingleTrail trail={trails}/>
        </div>
      </div>

      <hr />

      <div className="detail-nearby" id="detail-nearby">
        <h1>What's Nearby</h1>
        <div className="detail-nearby-card">
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
        </div>
      </div>
      <hr />
      <div className="detail-suggestion" id="detail-suggestion">
        <h1>You May Also Enjoy</h1>
        <div className="detail-nearby-card">
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
          <PopularHikingTrail />
        </div>
      </div>
    </div>
  );
}
