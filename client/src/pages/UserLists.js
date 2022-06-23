import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TrailCardOfUser from "../components/TrailCardOfUser";
import "./css/UserLists.css";

function UserLists() {
  const { user } = useAuth0();
  const [userLists, setUserLists] = useState([]);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await fetch(
          `/api/users/${user.sub}`
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
  }, [user.sub]);

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
      setTrails(trailsData);
    }
    fetchTrails();
  }, [userLists]);

  async function deleteClicked(deletedId) {
    try {
      const updatedLists = userLists.filter((item) => item !== deletedId);
      const response = await fetch(
        `/api/users/update/lists/${user.sub}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            lists: updatedLists,
          }),
        }
      );
      setUserLists(updatedLists);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="row align-items-center profile-header">
        <h1>My Favorite Trails</h1>
        <div className="list-cards col-md text-center text-md-left">
          <div className="cards">
            {trails.map((trail) => (
              <TrailCardOfUser key={trail?._id} trail={trail} onDelete={deleteClicked} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLists;
