import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  
  // the params in url: /users/:userId/profile
  const { userId } = useParams();

  // shwoForm state, show/hide components in this page
  const [showForm,setShowForm] = useState(false);

  // user state, stores the user data
  const [user, setUser] = useState({});

  // when editting profile, the values in inputs are stored in below states.
  // note that user cannot change the username
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  

  // when user click "Edit Profile", toggle the showForm state
  // if false, show user profile, hide the editting form
  // if true, hide user profile, show the editting form
  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  // handle the submission of the form
  // 1. when submitted, make a PATCH requrest to update the user data in the db.
  // 2. update the user state
  // 3. hide the editting form, show user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const editUser = { username: user.username, name: name, location: location, description: description};
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(editUser)
      });
      if (!response.ok) {
        throw Error("PATCH request failed");
      }
      setUser(editUser);
      toggleShowForm();

    } catch (err) {
      console.log(err);
    }
  };

  // GET user profile data from db.
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
        setUser(data[0]);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUser();
  }, [userId]);

  return (
    <div>
      <h1>My Profile</h1>
         
      {!showForm &&
        <>      
          <div>Username: {user.username}</div>
          <div>Name: {user.name}</div>
          <div>Location: {user.location}</div>
          <div>Description: {user.description}</div>
          <button onClick={toggleShowForm}>Edit Profile</button>
        </>
      }

      {showForm && 
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Location</label>
            <input
              required
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <label>Desciption</label>
            <input
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <input type="submit" value="Save Profile" />
          <button onClick={toggleShowForm}>Cancel</button>
        </form>
      }

    </div>
  );
}

export default UserProfile;
