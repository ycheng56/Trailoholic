import React from "react";
import { useParams } from "react-router-dom";

function TrailDetails() {
  const { trailId } = useParams();
  return (
    // TODO
    <div>
      <h1>Trail {trailId} Details Page</h1>
    </div>
  );
}

export default TrailDetails;
