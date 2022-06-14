import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { FaEdit } from "react-icons/fa";

function UserProfile() {
  const { user } = useAuth0();
  const [userMetaData, setUserMetaData] = useState([]);
  const [description, setDescription] = useState(userMetaData.description);
  
  // shwoForm state, show/hide components in this page
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    // setDescription(userMetaData.description);
    setShowForm(!showForm);
  };

  // GET user profile data from db.
  useEffect(() => {
    async function fetchUserMetaData() {
      try {
        const response = await fetch(
          `http://localhost:5000/users?sub=${user.sub}`
        );
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setUserMetaData(data[0]);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUserMetaData();
  }, [user.sub]);

  // handle the submission of the form
  // 1. when submitted, make a PATCH requrest to update the user data in the db.
  // 2. update the user state
  // 3. hide the editting form, show user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {  
      const response = await fetch(
        `http://localhost:5000/users/${userMetaData.id}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(
            {
              description: description
            }
          )
        }
      );
      if (!response.ok) {
        throw Error("PATCH request failed");
      }
      toggleShowForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={user?.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
          <h1>{user?.nickname}</h1>
        </div>
        <div className="col-md text-center text-md-left">
          <h3>Email</h3>
          <p className="lead text-muted">{user?.email}</p>

          <h3>Location</h3>
          <p className="lead text-muted">
            {user?.["https://localhost:5000/country"]}
          </p>

          <h3>Time Zone</h3>
          <p className="lead text-muted">
            {user?.["https://localhost:5000/timezone"]}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>About Me</h3>
            <FaEdit onClick={toggleShowForm} />
          </div>

          {!showForm && <p className="lead text-muted">{description || userMetaData.description}</p>}

          {showForm && (
            <form onSubmit={handleSubmit}>
              <div className="form-control d-flex flex-column justify-content-center">
                <textarea
                  required
                  rows="5"
                  className="lead text-muted"
                  type="text"
                  value={description || userMetaData.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input  className="btn-secondary" type="submit" value="Save" />
              </div>
            </form>            
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(UserProfile, {
  onRedirecting: () => <Loading />,
});
