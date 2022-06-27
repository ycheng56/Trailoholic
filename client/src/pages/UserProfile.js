import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaEnvelope, FaUser, FaVoicemail } from "react-icons/fa";
import "./css/Profile.css";
import Avatar from "react-avatar";
import { Row, Col, Form, Button } from "react-bootstrap";

function UserProfile() {
  const { user } = useAuth0();
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState("");

  // shwoForm state, show/hide components in this page
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  // GET user description data from db.
  useEffect(() => {
    async function fetchUserDescription() {
      try {
        const response = await fetch(`/api/users/${user.sub}`);
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setDescription(data.description);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUserDescription();
  }, [user]);

  // handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/update/profile/${user.sub}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          description: description,
          avatar_name: userName,
        }),
      });
      if (!response.ok) {
        throw Error("Request failed");
      }
      // toggleShowForm();
    } catch (err) {
      console.log(err);
    }
  };

  // GET user nick name data from db.
  useEffect(() => {
    async function fetchUserName() {
      try {
        const response = await fetch(`/api/users/${user.sub}`);
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setUserName(data.avatar_name);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUserName();
  }, [user]);


  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="profile-wrapper" id="UserProfile-Page">
    <Row className="justify-content-md-center">
      <Col className="profile-Img " xs="12" md="4" lg="3">
          <img
            src={user?.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
          <Row><Col><FaUser />
            UserName:{user?.nickname}</Col></Row>
          <Row><Col> <FaEnvelope />
            Email:{user?.email}</Col></Row>

      </Col>

      {/* <div className="row align-items-center profile-header">
        
        <div className="profile-avatar col-md-2 mb-3">
        <Avatar 
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
        name={user?.nickname}></Avatar>
          <h1>{user?.nickname}</h1>
        </div>

        <div className="profile-avatar col-md-2 mb-3">
          <img
            src={user?.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
          <h1>{user?.nickname}</h1>
        </div>
        
        <div className="userProfileDetail col-md text-center text-md-left">
          <h2>Email</h2>
          <p className="lead text-muted">{user?.email}</p>
          <hr/>
          <h2>Location</h2>
          <p className="lead text-muted">
            {user?.["https://localhost:5000/country"]}
          </p>
          <hr/>
          <h2>Time Zone</h2>
          <p className="lead text-muted">
            {user?.["https://localhost:5000/timezone"]}
          </p>
          <hr/>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>About Me</h2>
            {!showForm && <FaEdit onClick={toggleShowForm} /> }
          </div>

          {!showForm && <p className="lead text-muted">{description}</p>}

          {showForm && (
            <form onSubmit={handleSubmit}>
              <div className="form-control d-flex flex-column justify-content-center">
                <textarea
                  required
                  rows="5"
                  className="lead text-muted"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input  className="btn-secondary" type="submit" value="Save" />
              </div>
            </form>            
          )}
        </div>
      </div> */}
      <Col className="profile-form"  xs={12} md={8} lg={9}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={{ span: 5 }}>
                <Form.Group>
                  <medium>
                    <Form.Label>UserName</Form.Label>
                  </medium>
                  <Form.Control
                    type="username"
                    placeholder="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  ></Form.Control>
                  <Form.Text className="text-muted">
                    Edit your username here
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={{ span: 5 }}>
                <medium>
                  <Form.Label>Email</Form.Label>
                </medium>
                <Form.Control placeholder={user?.email} disabled />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 5 }}>
                <medium>
                  <Form.Label>TimeZone</Form.Label>
                </medium>
                <Form.Control
                  placeholder={user?.["https://localhost:5000/timezone"]}
                  disabled
                />
              </Col>

              <Col md={{ span: 5 }}>
                <medium>
                  <Form.Label>Country</Form.Label>
                </medium>
                <Form.Control
                  placeholder={user?.["https://localhost:5000/country"]}
                  disabled
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 10 }}>
                <Form.Label>About Me</Form.Label>
                <Form.Control
                  type="aboutMe"
                  placeholder="Tell us more about you"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Tell us more about you! Edit your description here.
                </Form.Text>
              </Col>
            </Row>
            <Row className="profile-btn">
              <Col md={{ span: 5 }}>
                <Button
                  type="button"
                  variant="secondary"
                  style={{ width: "50%" }}
                  onClick={refreshPage}
                >
                  Cancel
                </Button>
              </Col>
              <Col md={{ span: 5 }}>
                <Button type="submit" variant="danger" style={{ width: "50%" }}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
      </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
