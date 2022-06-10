import React from 'react';
import { useParams } from 'react-router-dom'

function UserProfile() {
  const {userId} = useParams();
  return (
    // TODO
    <div>
      <h1>User {userId} Profile Page</h1>
    </div>

  );
}

export default UserProfile;
