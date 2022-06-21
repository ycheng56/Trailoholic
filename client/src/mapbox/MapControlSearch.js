import React, { useEffect, useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  FormText,
} from "react-bootstrap";
import MapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Layer,
  Source,
} from "react-map-gl";
import DrawControl from "./DrawControl";
import GeocoderControl from "./GeocoderControl";
import TextPanel from "./TextPanel";
import {
  drawStyleDisable,
  layerStyle,
  layerStyleRoute,
  geocoderSetting,
  initViewport,
  geojson,
} from "./data.js";
import "bootstrap/dist/css/bootstrap.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Map.css";

function MapControlSearch() {
  let navigate = useNavigate();
  const map = useRef(null);
  const [viewport, setViewport] = useState(initViewport);

  //   const featuretype = {
  //     id: "id",
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       coordinates: [],
  //       type: "LineString",
  //     },
  //   };

  const [features, setFeatures] = useState([]);
  const [routeGeojson, setRouteGeojson] = useState(geojson);

  const [trailType, setTrailType] = useState("cycling");
  const [trailDifficulty, setTrailDifficulty] = useState("Easy");
  const [instruction, setinstruction] = useState([]);
  const [duration, setduration] = useState(0);
  const [distance, setdistance] = useState(0.0);

  const [buttonText, setButtonText] = useState("Find Trail");
  const [showResult, setShowResult] = useState(false);
  const [showAlternateResult, setShowAlternateResult] = useState(false);

  async function onUpdate() {
    if (!startGeo) {
      alert("Please enter a valid starting point.");
      return;
    }

    if (!destinationGeo) {
      alert("Please enter a valid destination.");
      return;
    }
    setButtonText("Finding...");
    updateRoute(trailType);
    setButtonText("Find Trail");
  }

  console.log("features", features);
  // console.log("routes", setRouteGeojson);

  // Use the coordinates you input to make the Map Matching API request
  async function updateRoute(mode) {
    // Set the profile
    const profile = mode; // cycling, walking, driving

    // Get the coordinates
    const coordstart = await features[0].geometry.coordinates;
    const coorddest = await features[1].geometry.coordinates;
    const coords = [coordstart, coorddest];
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
    console.log("coordinates", coordinates);
    // Create the query
    const query = await fetch(
      `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
      { method: "GET" }
    );
    const response = await query.json();
    // Handle errors
    if (response.code !== "Ok") {
      if (
        window.confirm(`No recommended route found. Still save this trail?`)
      ) {
        setShowAlternateResult(true);
      } else {
        // Do nothing!
      }
      return;
    }
    // Get the coordinates from the response
    const coords = response.matchings[0].geometry;

    // add route to map and get instructions
    addRoute(response.matchings[0]);
    getInstructions(response.matchings[0]);
    setShowResult(true);
  }

  function addRoute(coords) {
    setRouteGeojson(() => {
      return {
        type: "FeatureCollection",
        features: [coords],
      };
    });
  }

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
  const [startGeo, setStartGeo] = useState(null);
  const onStartResult = useCallback((e) => {
    const { result } = e;
    const location =
      result &&
      (result.center ||
        (result.geometry?.type === "Point" && result.geometry.coordinates));
    if (location) {
      setStartMarker(location);
      setStartGeo(result);
    } else {
      setStartMarker(null);
    }
    setVisable(true);
  }, []);

  const [destinationMarker, setDestinationMarker] = useState(null);
  const [destinationGeo, setDestinationGeo] = useState(null);
  const onDestinationResult = useCallback((e) => {
    const { result } = e;
    const location =
      result &&
      (result.center ||
        (result.geometry?.type === "Point" && result.geometry.coordinates));
    if (location) {
      setDestinationMarker(location);
      setDestinationGeo(result);
    } else {
      setDestinationMarker(null);
    }
  }, []);

  // prevent search result block the search input
  const [visable, setVisable] = useState(true);
  const onResults = useCallback(() => {
    setVisable(false);
  }, []);

  //
  async function FindMatchedTrail() {
    await onUpdate();
  }

  // handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newtrail = {
      mode: trailType,
      difficuly: trailDifficulty,
      start: startGeo,
      destination: destinationGeo,
      route: routeGeojson,
      duration: duration,
      distance: distance,
      instruction: instruction,
    };

    try {
      const response = await fetch("/api/test/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newtrail),
      });
      if (!response.ok) {
        throw Error("Request failed");
      }
      console.log("submitted");
      navigate("/addtrail");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFeatures(() => {
      const newFeatures = [startGeo, destinationGeo];
      return newFeatures;
    });
  }, [startGeo, destinationGeo]);

  return (
    <>
      <Row>
        <Col xs={12} md={4} lg={3}>
          <div className="trailsCardSideBar">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingSelect"
                label="Select trail type"
              >
                <Form.Select
                  aria-label="trail type"
                  onChange={(e) => setTrailType(e.target.value)}
                >
                  <option value="cycling">Cycling</option>
                  <option value="walking">Hiking</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingSelect"
                label="Select trail difficuly"
              >
                <Form.Select
                  aria-label="trail difficuly"
                  onChange={(e) => setTrailDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </FloatingLabel>

              <Button onClick={FindMatchedTrail} variant="primary">
                {buttonText}
              </Button>

              <TextPanel
                showResult={showResult}
                trailType={trailType}
                trailDifficulty={trailDifficulty}
                distance={distance}
                duration={duration}
                instruction={instruction}
              />

              {showResult && (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </Form>

            {showAlternateResult && (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formDistance">
                  <FormText>Estimate Length (Optional)</FormText>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="km"
                    onChange={(e) => setdistance(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDuration">
                  <FormText>Estimate Time (Optional)</FormText>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="minutes"
                    onChange={(e) => setduration(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </div>
        </Col>

        <Col className="map" xs={12} md={8} lg={9}>
          <MapGL
            ref={map}
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          >
            <GeolocateControl position="top-right" />
            <FullscreenControl position="top-right" />
            <NavigationControl position="top-right" />
            <ScaleControl position="bottom-right" />

            <DrawControl
              {...drawStyleDisable}
              onCreate={onUpdate}
              onUpdate={onUpdate}
            />

            <Source id="route-source" type="geojson" data={routeGeojson}>
              <Layer {...layerStyleRoute} />
            </Source>

            <GeocoderControl
              id="StartGeocoderControl"
              class="StartGeocoderControl"
              position="top-left"
              {...geocoderSetting}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              placeholder="Enter Starting Point"
              onResult={onStartResult}
              onResults={onResults}
            />
            {visable && (
              <GeocoderControl
                position="top-left"
                {...geocoderSetting}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                placeholder="Enter Destination"
                onResult={onDestinationResult}
                onResults={() => {}}
              />
            )}

            {/* <Marker longitude={marker[0]} latitude={marker[1]} /> */}

            {startMarker && (
              <Marker
                color="red"
                longitude={startMarker[0]}
                latitude={startMarker[1]}
              />
            )}
            {destinationMarker && (
              <Marker
                color="green"
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

export default MapControlSearch;
