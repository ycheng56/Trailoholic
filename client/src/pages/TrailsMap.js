import React, { useEffect, useState } from "react";
import Map from "../mapbox/Map";
import TrailCards from "../components/TrailCards";
import Filter from "../components/Filter";
import "./css/TrailMap.css";
import SearchFilter from "../mapbox/SearchFilter";
import {Row,Col} from "react-bootstrap";
import { FaThList, FaMapMarkedAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

function TrailsMap() {
  const { trailType } = useParams();
  const [trails, setTrails] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState("");
  const [showList, setShowList] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //resize screen
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth >= 678) {
        setShowList(true);
      }
    };
    window.addEventListener("resize", changeWidth);
    return () => window.addEventListener("resize", changeWidth);
  });

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch("/api/trails");

        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
        setFiltered(data);
        if (trailType === "walking" || trailType === "cycling") {
          setActiveType(trailType);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, []);

  return (
    <div className="trailWrapper">
      <Row className="map-block">
        <Col className="info-box map-block" xs={12} md={5} lg={3}>
          <div className="search-area">
            <div className="serach-box children">
              <SearchFilter
                trails={trails}
                setResult={setTrails}
                setFiltered={setFiltered}
              ></SearchFilter>

              {screenWidth < 768 && (
                <div className="control-icons">
                  <FaThList onClick={() => setShowList(true)}></FaThList>
                  <FaMapMarkedAlt
                    onClick={() => setShowList(false)}
                  ></FaMapMarkedAlt>
                </div>
              )}
            </div>
            <div className="filter-area children">
                <Filter
                trails={trails}
                setFiltered={setFiltered}
                activeType={activeType}
                setActiveType={setActiveType}
              />
            </div>
          </div>
          {(showList || screenWidth > 768) && (
            <div className="trailsCardSideBar">
              <TrailCards trails={filtered} />
            </div>
          )}
        </Col>

        {(!showList || screenWidth > 768) && <Col className="map-block map" xs={12} md={7} lg={9}>
          <Map trails={filtered} />
        </Col>}
      </Row>
    </div>
  );
}

export default TrailsMap;
