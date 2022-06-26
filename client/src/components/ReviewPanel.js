import React, { useState, useEffect } from "react";
import {fetchReviewsbyTrail} from "../api/API"
import Review from "./Review"


export default function ReviewPanel({ trail_id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviewsbyTrail(trail_id);
      setReviews(data);
    };
    getReviews();
  }, [trail_id]);

  return (
    <div className="review-container">
      {reviews.map((item,index) => (
        <Review key={index} review={item}></Review>
    ))}
    </div>
  );
}
