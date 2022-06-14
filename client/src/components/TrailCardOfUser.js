import Card from "react-bootstrap/Card";
import "./css/TrailCards.css";
import React from "react";
import { Link } from "react-router-dom";
import {FaTimes} from "react-icons/fa"

export default function TrailCardOfUser({ trail, onDelete }) {
  return (
    <>
      <Card border="Trail" style={{ width: "18rem" }}>
        <Card.Header className="headerDeleteIcon">
            <FaTimes onClick={()=>onDelete(trail._id)} />
        </Card.Header>
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
