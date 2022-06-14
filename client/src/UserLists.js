import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListItem from "./ListItem";

function UserLists() {
  // the params in url: /users/:userId/profile
  const { userId } = useParams();

  // user state, stores the user data
  // const [user, setUser] = useState({});

  // trails state, a list of trails data to be display
  const [trails, setTrails] = useState([]);

  // GET user's list data from db.
  // Store the response to trails state
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:5000/users?id=${userId}`
        );
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data[0].lists);
        console.log(trails);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUser();
  }, [userId]);

  // delete an item from the user's list
  // note: don't use the DELETE method
  // instead, use "PATCH" method to update the user's list in db
  // 1. filter the trails, remove the one we are going to delete.
  // 2. call PATCH method, update the user's list
  // 3. update the trails state, now the deleted item is excluded from the trails state.
  async function deleteClicked(deletedId) {
    console.log("clicked", deletedId);
    try {
      const updatedTrails = trails.filter((item) => item.id !== deletedId);
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(
          {
            lists: updatedTrails
          }
        )
      });
      setTrails(updatedTrails);

    } catch (err) {
      console.log(err);
    }
  }

  return (
  <>
    <h1>My List</h1>
  
  {trails.length > 0 ? (
    <>
      {trails.map((item) => (
        <ListItem key={item.id} trail={item} onDelete={deleteClicked} />
      ))}
    </>
  ) : (
    <li>No Trails in the list</li>
  )}
  </>
  );

}

export default UserLists;
