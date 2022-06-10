import React from "react";
import { useParams } from "react-router-dom";

function UserLists() {
  const { userId } = useParams();
  return (
    // TODO
    <div>
      <h1>User {userId} Lists Page</h1>
    </div>
  );
}

export default UserLists;
