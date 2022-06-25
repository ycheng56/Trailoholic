import React, { useState, useEffect } from "react";
import {fetchUser} from "../api/API"
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from 'react-avatar';

export default function Review({review}) {
//   const [review, setReview]= useState(review);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser(review.user_id);
      setUser(data);
    };
    getUser();
  }, []);

  console.log("user", user);
  console.log("review", review);


  return (
    <div className="review d-flex">

        <div className="profile-avatar col-md-2 mb-3">
        <Avatar 
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
        name={user?.avatar_name}></Avatar>
          <strong>{user?.avatar_name}</strong>
        </div>

        <div>
            {review.comment}
        </div>
    </div>
  );
}
