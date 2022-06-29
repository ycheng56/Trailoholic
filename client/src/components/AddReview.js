import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, Modal } from "react-bootstrap";
import { Rating } from "@mui/material";

export default function AddReview({trail_id}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [show, setShow] = useState(false);
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("");
  const handleClose = () => setShow(false);
  var date = new Date().toLocaleDateString();


  const handleShow = () => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
      return;
    }
    setShow(true);
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newreview = {
        trail_id: trail_id,
        user_id: user.sub,
        rating: star,
        comment: comment,
        date: date,
      };
      const response = await fetch("/api/reviews/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newreview),
      });
      if (!response.ok) {
        throw Error("Request failed");
      }
      handleClose();
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Write Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Rating
              name="size-large"
              size="large"
              defaultValue={5}
              onChange={(event, newValue) => {
                setStar(newValue);
              }}
            ></Rating>
            <Form.Group className="mb-3" controlId="Form.ControlTextarea">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Share details of your own experience at this trail"
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
