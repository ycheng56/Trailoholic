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
          <Card.Title>{trail.start}</Card.Title>
          <Card.Text>
            <Link to={`/trails/${trail._id}`}>
              <p>View Trail Details</p>
            </Link>
          </Card.Text>
          <div>
            <p>{trail.mode}</p>
          </div>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
