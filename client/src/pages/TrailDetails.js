import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/TrailDetails.css";
import { useEffect, useState } from "react";
import Map from "../mapbox/Map";
import { Card } from "react-bootstrap";

function TrailDetails() {
  const { user, isAuthenticated } = useAuth0();
  const { trailId } = useParams();
  const [trails, setTrails] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [trailsPoints, setTrailsPoints] = useState([]);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch(`/api/trails/${trailId}`);
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
        setTrailsPoints([data]);
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
      console.log(updatedMyLists);
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
      console.log(updatedLists);
      const response = await fetch(`/api/users/update/lists/${user.sub}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          lists: updatedLists,
        }),
      });

      setUserLists(updatedLists);
      console.log(updatedLists);
    } catch (err) {
      console.log(err);
    }
  }

  if (userLists.includes(trailId)) {
    console.log("true");
  } else {
    console.log("false");
  }

  return (
    <div className="trailDetail">
    <div className="detailImg">
      <img alt="trail detail picture" src={process.env.PUBLIC_URL + "/images/trail_1.jpg"}></img>
    </div>
      <h1>Trail {trailId} Details Page</h1>
      <div className="details">
        <p>Starting: {trails.start}</p>
        <p>Destination: {trails.destination}</p>
        <p>Trip Type: {trails.mode}</p>
      </div>
      {/* <button onClick={addToList}>Add to my lists</button> */}
      {userLists.includes(trailId) ? (
        <button onClick={removeFromList}>Remove From My Lists</button>
      ) : (
        <button onClick={addToList}>Add to my lists</button>
      )}
      <div className="map-container">
        <Map trails={trailsPoints} />
      </div>
    </div>
  );
}

export default TrailDetails;
