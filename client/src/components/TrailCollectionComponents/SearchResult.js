import React from "react";
import { FaBicycle } from "react-icons/fa";
import { FaHiking } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/Search.css";

export default function SearchResult({ trail }) {
  const num = trail?.image;
  const picNum = num % 5;
  const hikePicUri = "trail_" + picNum + ".jpg";
  const cyclePicUri = "cycling_" + picNum + ".jpg";
  return (
    <div className="search-wrapper">
      <div className="search-card">
        <div className="search-card-body">
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/trails/${trail?._id}`}
          >
            <div className="search-detail">
              <div className="search-Img">
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

              <div className="search-detailInfo">
                <div className="search-card-title">
                  from<strong> {trail?.start.text_en}</strong> to{" "}
                  <strong>{trail?.destination.text_en}</strong>
                </div>

                <div className="search-card-description">
                  <span>
                    {trail?.mode === "cycling" ? (
                      <FaBicycle size={"7%"}></FaBicycle>
                    ) : (
                      <FaHiking size={"5%"}></FaHiking>
                    )}
                  </span>
                  <span> • </span>
                  <span>{trail?.difficulty}</span>
                  <span> • </span>
                  <FaStar color="#f5d24c" className="star"></FaStar>
                  <span> {trail?.like} </span>
                </div>

                <div className="search-card-description">
                  <span>
                    <strong>Length:</strong> {trail?.distance} km
                  </span>
                  <span> • </span>
                  <span>
                    <strong>Time:</strong> {trail?.duration} mins
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
