import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/TrailDetails.css";
import { useEffect, useState } from "react";
import MapSinglePoint from "../mapbox/MapSinglePoint";

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
    <div className="trailDetail">
      <div className="detailImg">
        <img
          alt="trail detail picture"
          src={process.env.PUBLIC_URL + "/images/trail_1.jpg"}
        ></img>
      </div>
      <div className="trailDescription">
        <h1>{trails.start?.["text_en"]} to {trails.destination?.["text_en"]}</h1>

        <div className="Details">
          <button>{trails.mode}</button>
          <button>{trails.difficulty}</button>
          <p>Start:{trails.start?.["text_en"]}</p>
          <p>Destination:{trails.destination?.["text_en"]}</p>
          <p>Distance:{trails.distance} km</p>
          <p>Duration:{trails.duration} Minutes</p>
        </div>
      </div>

      <p>Instruction for the trail:{instruction.map((item,index)=>(<li key={index}>{item}</li>))}</p>

      {userLists.includes(trailId) ? (
        <button onClick={removeFromList}>Remove From My Lists</button>
      ) : (
        <button onClick={addToList}>Add to my lists</button>
      )}
      <div className="map-container">
        <MapSinglePoint trails={trails} Lng={Lng} Lat={Lat} />
      </div>
    </div>
  );
}
