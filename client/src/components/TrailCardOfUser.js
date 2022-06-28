import "./css/TrailCards.css";
import React from "react";
import { Link } from "react-router-dom";
import { FaTimes,FaBicycle,FaHiking,FaStar} from "react-icons/fa";

export default function TrailCardOfUser({ trail, onDelete }) {
  const num = trail?.image;
  const picNum = num % 5;
  const hikePicUri = "trail_" + picNum + ".jpg";
  const cyclePicUri = "cycling_" + picNum + ".jpg";
  return (
    <div className="userList-wrapper">
      <div className="userList-card">
          <div className="userList-card-body">
            <div className="userList-deleteBtn">
              <FaTimes onClick={() => onDelete(trail._id)} />
            </div>
            <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/trails/${trail?._id}`}
        >
            <div className="userList-detail">
              <div className="userList-Img">
                {trail?.mode === "cycling" ? (
                  <img
                    src={process.env.PUBLIC_URL + "/images/" + cyclePicUri}
                    alt="pic"
                    className="card-img"
                  ></img>
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/images/" + hikePicUri}
                    alt="pic"
                    className="card-img"
                  ></img>
                )}
              </div>

              <div className="userList-detailInfo">
                <div className="userList-card-title">
                from<strong> {trail?.start.text_en}</strong> to <strong>{trail?.destination.text_en}</strong>
                </div>

                <div className="userList-card-description">
                  <span>
                    {trail?.mode === "cycling" ? (
                      <FaBicycle size={"7%"}></FaBicycle>
                    ) : (
                      <FaHiking size={"7%"}></FaHiking>
                    )}
                  </span>
                  <span>  •  </span>
                  <span>{trail?.difficulty}</span>
                  <span>  •  </span>
                  <FaStar color="#f5d24c" className="star"></FaStar>
                  <span> {trail?.like} </span>
                </div>

                <div className="userList-card-description">
                  <span><strong>Length:</strong> {trail?.distance} km</span>
                  <span>  •  </span>
                  <span><strong>Time:</strong> {trail?.duration} mins</span>
                </div>
              </div>
            </div>
            </Link>
          </div>
      </div>
    </div>
  );
}
