import React, { useState, useEffect } from "react";
import { fetchUser } from "../api/API";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "react-avatar";
import "./css/Review.css";
import { Rating } from "@mui/material";

export default function Review({ review }) {
  //   const [review, setReview]= useState(review);
  const [user, setUser] = useState(null);
  const [star, setStar] = useState(3);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser(review.user_id);
      setUser(data);
    };
    getUser();
  }, []);

  return (
    <div className="review-item">
      <div className="reviewer-profile">
        <Avatar
          size="80"
          className="reviewer-avatar"
          round= {true}
          textSizeRatio={1.75}
          name={user?.avatar_name}
        ></Avatar>
        <div className="reviewer-profile-info">
          <strong>{user?.avatar_name}</strong>

          <Rating name="read-only" value={review.rating} readOnly />
          <p>{review.date}</p>
        </div>
      </div>

      <div>{review.comment}</div>
    </div>
  );
}
