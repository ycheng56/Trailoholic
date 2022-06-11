import React from "react";
import { FaTimes } from "react-icons/fa";

export default function ListItem({ trail, onDelete }) {
  return (
    <li style={{ listStyleType: "none" }}>
      <div className="trailContainer">
        <div className="nameIconContainer">
          <a href="#">view</a>
          <FaTimes onClick={() => onDelete(trail.id)} />
        </div>
        <p>Trail: {trail.id}</p>
      </div>
    </li>
  );
}
