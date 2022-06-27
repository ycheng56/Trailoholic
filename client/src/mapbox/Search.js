import React, { useEffect, useCallback, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Form, Button } from "react-bootstrap";
import "./Map.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const [geoData, setGeoData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      placeholder: "Search Location",
      countries: "ca",
    });
    geocoder.addTo("#search");
    geocoder.on("result", onResult);
    return () => {
      geocoder.onRemove("#search");
    };
  }, []);

  const onResult = useCallback((e) => {
    console.log("on result")
    const { result } = e;
    const location =
      result &&
      (result.center ||
        (result.geometry?.type === "Point" && result.geometry.coordinates));
    if (location) {
      setGeoData(result);
    } 
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!geoData) {
        return;
      }
      navigate(`trails/search/location=${geoData.text}&lng=${geoData.center[0]}&lat=${geoData.center[1]}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-component-wrapper">
      <Form className="search-form" onSubmit={handleSubmit}>
        <div id="search"></div>
    
        <Button className="inner-button" variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Search;
