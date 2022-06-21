import Card from "react-bootstrap/Card";
import "./css/TrailCards.css";
import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

export default function TrailCardOfUser({ trail, onDelete }) {
  function getRandomNumber(){
    return Math.floor(Math.random()*5+1);
  }
  const picUri = "/images/trail_"+getRandomNumber()+".jpg";
  return (
    <>
      <Card border="success" style={{ width: "60%" }}>
        <Card.Header className="headerDeleteIcon">
          <FaTimes onClick={() => onDelete(trail._id)} />
        </Card.Header>
        <Row>
          <Col>
            <Card.Img
              variant="left"
              src={process.env.PUBLIC_URL + picUri}
            />
          </Col>
          <Col>
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
          </Col>
        </Row>
      </Card>
      <br />
    </>
  );
}
