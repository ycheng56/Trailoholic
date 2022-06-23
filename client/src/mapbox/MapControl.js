import React, { useCallback, useEffect, useState, useRef } from "react";
import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Map.css";
import MapGL, {
  MapProvider,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  useControl,
  Layer,
  Source,
} from "react-map-gl";
import DrawControl, { draw } from "./DrawControl";
import GeocoderControl, { geocoder } from "./GeocoderControl";
import {
  drawStyle,
  layerStyle,
  layerStyleRoute,
  geocoderSetting,
} from "./data.js";
import "mapbox-gl/dist/mapbox-gl.css";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

function MapControl() {
  const map = useRef(null);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 49.19,
    longitude: -123.17,
    zoom: 10,
  });

  const AddMarker = (event) => {
    console.log("Clicked");
  };

  const geojson = {
    type: "FeatureCollection",
    lineMetrics: true,
    features: [],
  };

  const [features, setFeatures] = useState([]);
  const [lineGeojson, setLineGeojson] = useState(geojson);
  const [routeGeojson, setRouteGeojson] = useState(geojson);

  const [instruction, setinstruction] = useState([]);
  const [duration, setduration] = useState(0);
  const [distance, setdistance] = useState(0.0);
  const onUpdate = useCallback((e) => {
    console.log("Features log", e.features);
    setFeatures(() => {
      const newFeatures = [];
      for (const f of e.features) {
        newFeatures.push(f);
      }
      return newFeatures;
    });

    setLineGeojson(() => {
      const newFeatures = [];
      for (const f of e.features) {
        newFeatures.push(f);
      }
      return {
        type: "FeatureCollection",
        lineMetrics: true,
        features: newFeatures,
      };
    });
    updateRoute();
  }, []);

  console.log("lineGeo", lineGeojson);
  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);
  console.log("features", features);

  // Use the coordinates you drew to make the Map Matching API request
  function updateRoute() {
    // Set the profile
    const profile = "cycling";
    // Get the coordinates that were drawn on the map
    const data = draw.getAll();
    const lastFeature = data.features.length - 1;
    const coords = data.features[lastFeature].geometry.coordinates;
    // Format the coordinates
    const newCoords = coords.join(";");
    // Set the radius for each coordinate pair to 25 meters
    const radius = coords.map(() => 25);
    getMatch(newCoords, radius, profile);
  }

  // Make a Map Matching request
  async function getMatch(coordinates, radius, profile) {
    // Separate the radiuses with semicolons
    const radiuses = radius.join(";");
    // Create the query
    const query = await fetch(
      `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
      { method: "GET" }
    );
    const response = await query.json();
    // Handle errors
    if (response.code !== "Ok") {
      alert(
        `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
      );
      return;
    }
    console.log("response", response);
    // Get the coordinates from the response
    const coords = response.matchings[0].geometry;
    console.log("matchings", response.matchings[0]);

    // Code from the next step will go here
    addRoute(response.matchings[0]);
    getInstructions(response.matchings[0]);
  }

  function addRoute(coords) {
    setRouteGeojson(() => {
      return {
        type: "FeatureCollection",
        features: [coords],
      };
    });
  }

  // console.log("line geo", lineGeojson);
  // console.log("direction geo", routeGeojson);

  function getInstructions(data) {
    // Output the instructions for each step of each leg in the response object
    setinstruction(() => {
      const tripDirections = [];
      for (const leg of data.legs) {
        const steps = leg.steps;
        for (const step of steps) {
          tripDirections.push(`${step.maneuver.instruction}`);
        }
      }
      return tripDirections;
    });

    const dis = (data.distance / 1000).toFixed(2);
    setdistance(dis);
    const dur = Math.floor(data.duration / 60);
    setduration(dur);
  }

  const [startMarker, setStartMarker] = useState(null);
  const onStartResult = useCallback((e) => {
    const { result } = e;
    const location =
      result &&
      (result.center ||
        (result.geometry?.type === "Point" && result.geometry.coordinates));
    if (location) {
      setStartMarker(location);
    } else {
      setStartMarker(null);
    }
  }, []);

  const [destinationMarker, setDestinationMarker] = useState(null);
  const onDestinationResult = useCallback((e) => {
    const { result } = e;
    const location =
      result &&
      (result.center ||
        (result.geometry?.type === "Point" && result.geometry.coordinates));
    if (location) {
      setDestinationMarker(location);
    } else {
      setDestinationMarker(null);
    }
  }, []);

  return (
    <>
      <Row>
        <Col xs={12} md={4} lg={3}>
          <div className="trailsCardSideBar">
            <Form>
              {/* <Form.Group className="mb-3" controlId="formStart">
    <Form.Control type="text" placeholder="Start Location" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formDestination">
    <Form.Control type="text" placeholder="Destination Location" />
  </Form.Group> */}

              <FloatingLabel
                controlId="floatingSelect"
                label="Select trail type"
              >
                <Form.Select aria-label="trail type">
                  <option value="Cycling">Cycling</option>
                  <option value="Hiking">Hiking</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingSelect"
                label="Select trail difficulty"
              >
                <Form.Select aria-label="trail difficulty">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </FloatingLabel>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            <div className="board">
              <h1>Trail Details</h1>
              <div>Distance:{distance} km</div>
              <div>Duration:{duration} min</div>
              <div>
                {instruction.length == 0 && <p>Waiting for calculating</p>}
                {instruction.map((item) => (
                  <li>{item}</li>
                ))}
              </div>
            </div>
          </div>
        </Col>
  

        <Col className="map" xs={12} md={8} lg={9}>
          <MapGL
            
            ref={map}
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            onDblClick={AddMarker}
          >
            <GeolocateControl position="top-right" />
            <FullscreenControl position="top-right" />
            <NavigationControl position="top-right" />
            <ScaleControl position="bottom-right" />

            <DrawControl
              {...drawStyle}
              onCreate={onUpdate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              // onCreate={updateRoute}
              // onUpdate={updateRoute}
              // onDelete={removeRoute}
            />
            <Source id="line-source" type="geojson" data={lineGeojson}>
              <Layer {...layerStyle} />
            </Source>

            <Source id="route-source" type="geojson" data={routeGeojson}>
              <Layer {...layerStyleRoute} />
            </Source>

            <GeocoderControl
              ref={geocoder}
              position="top-left"
              {...geocoderSetting}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              placeholder="Enter Starting Point"
              onResult={onStartResult}
            />
            <GeocoderControl
              position="top-left"
              {...geocoderSetting}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              placeholder="Enter Destination"
              onResult={onDestinationResult}
            />

            {startMarker && (
              <Marker longitude={startMarker[0]} latitude={startMarker[1]} />
            )}
            {destinationMarker && (
              <Marker
                longitude={destinationMarker[0]}
                latitude={destinationMarker[1]}
              />
            )}
          </MapGL>
        </Col>
      </Row>
    </>
  );
}

export default MapControl;
