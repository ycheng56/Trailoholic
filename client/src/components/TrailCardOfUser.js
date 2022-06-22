import Card from "react-bootstrap/Card";
import "./css/TrailCards.css";
import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

export default function TrailCardOfUser({ trail, onDelete }) {
  function getRandomNumber() {
    return Math.floor(Math.random() * 5 + 1);
  }
  const picUri = "/images/trail_" + getRandomNumber() + ".jpg";
  return (
    <>
      <Card border="success" style={{ width: "60%" }}>
        <Card.Header className="headerDeleteIcon">
          <FaTimes onClick={() => onDelete(trail._id)} />
        </Card.Header>
        <Row>
          <Col>
            <Card.Img
              alt="user's list img"
              variant="left"
              src={process.env.PUBLIC_URL + picUri}
            />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{trail?.start["text_en"]}</Card.Title>
              <Card.Text>
                <Link to={`/trails/${trail?._id}`}>View Trail Details</Link>
              </Card.Text>
              <div>
                <p>mode:{trail?.mode}</p>
                <p>duration:{trail?.duration} minutes</p>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <br />
    </>
  );
}
