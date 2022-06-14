import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TrailCard from "../components/TrailCard";

function UserLists() {
  const { user } = useAuth0();
  const [userLists, setUserLists] = useState([]);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await fetch(
          `http://localhost:5000/users?sub=${user.sub}`
        );
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setUserLists(data[0].lists);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUserList();
  }, [user.sub]);

  useEffect(() => {
    async function fetchTrails() {
      const trailsData = [];
      for (const item of userLists) {
        try {
          const response = await fetch(
            `http://localhost:5000/trails?id=${item.id}`
          );
          if (!response.ok) {
            throw Error("Fetch failed");
          }
          const data = await response.json();
          trailsData.push(data[0]);
        } catch (err) {
          console.log("catch ", err);
        }
      }
      console.log("trailsData", trailsData);
      setTrails(trailsData);
    }
    fetchTrails();
  }, [userLists]);

  async function deleteClicked(deletedId) {
    console.log("clicked", deletedId);
    try {
      const updatedTrails = trails.filter((item) => item.id !== deletedId);
      const response = await fetch(
        `http://localhost:5000/users?sub=${user.sub}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            lists: updatedTrails,
          }),
        }
      );
      setTrails(updatedTrails);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="row align-items-center profile-header">
        <h1>My List</h1>
        <div className="col-md text-center text-md-left">
          <div className="cards">
            {trails.map((item) => (
              <TrailCard key={item.id} trail={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLists;
