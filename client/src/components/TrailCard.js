import Card from "react-bootstrap/Card";
import "./css/TrailCards.css";
import React from "react";
import { Link } from "react-router-dom";

export default function TrailCard({ trail }) {
  return (
    <>
      <Card border="Trail" style={{ width: "18rem" }}>
        <Card.Header>Trail</Card.Header>
        <Card.Body>
          {/* <Card.Title>{trail.start}</Card.Title> */}
          <Card.Title>{trail.start["text_en"]}</Card.Title>
          <Card.Text>
            <Link to={`/trails/${trail._id}`}>
              View Trail Details
            </Link>
          </Card.Text>
          <div>
            <p>mode:{trail.mode}</p>
            <p>duration:{trail.duration} minutes</p>
          </div>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
