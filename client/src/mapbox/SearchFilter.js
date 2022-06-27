import React, { useEffect, useCallback, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Form, Button } from "react-bootstrap";
// import "./Map.css";

function SearchFilter({ trails, setFiltered, setResult }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      placeholder: "Search Location",
      countries: "ca",
    });
    geocoder.addTo("#searchfilter");
    geocoder.on("result", onResult);
    geocoder.on("clear", onClear);
    return () => {
      geocoder.onRemove("#searchfilter");
    };
  }, []);

  const onResult = useCallback((e) => {
    console.log("on result");
    const { result } = e;
    const location =
      result &&
      (result.center ||
        (result.geometry?.type === "Point" && result.geometry.coordinates));
    if (location) {
      setGeoData(result);
    }
  }, []);

  useEffect(() => {
    const showSearchResult = async () => {
      try {
        if (!geoData) {
          setResult(trails);
          setFiltered(trails);
        } else {
          const searchCriteria = `lng=${geoData.center[0]}&lat=${geoData.center[1]}`;
          const response = await fetch(`/api/search/trails?${searchCriteria}`);
          if (!response.ok) {
            throw Error("Fetch failed");
          }
          const data = await response.json();
          setResult(data);
          setFiltered(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showSearchResult();
  }, [geoData]);

  const onClear = useCallback((e) => {
    setGeoData(null);
    async function fetchTrails() {
      try {
        const response = await fetch("/api/trails");

        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setResult(data);
        setFiltered(data);
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, []);

  return (
    <div className="search-component-wrapper">
      <div className="search-form">
        <div id="searchfilter"></div>
      </div>
    </div>
  );
}

export default SearchFilter;
