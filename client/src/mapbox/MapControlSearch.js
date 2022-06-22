import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  Fragment,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  FormText,
  Collapse,
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
import { FaAngleDown } from "react-icons/fa";

function MapControlSearch() {
  let navigate = useNavigate();

  // components show/hide setting
  const [showResult, setShowResult] = useState(false);
  const [showAlternateResult, setShowAlternateResult] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(true);
  const [visable, setVisable] = useState(true);

  // map data
  const map = useRef(null);
  const [viewport, setViewport] = useState(initViewport);
  const [features, setFeatures] = useState([]);
  const [startMarker, setStartMarker] = useState(null);
  const [startGeo, setStartGeo] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [destinationGeo, setDestinationGeo] = useState(null);
  const [routeGeojson, setRouteGeojson] = useState(geojson);

  // trail data
  const [trailType, setTrailType] = useState("cycling");
  const [trailDifficulty, setTrailDifficulty] = useState("Easy");
  const [instruction, setinstruction] = useState([]);
  const [duration, setduration] = useState(0);
  const [distance, setdistance] = useState(0.0);

  //resize screen
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth >= 678) {
        setOpen(true);
      }
    };
    window.addEventListener("resize", changeWidth);
    return () => window.addEventListener("resize", changeWidth);
  });

  // prevent search result block the search input
  const onResults = useCallback(() => {
    setVisable(false);
  }, []);

  // add marker to starting point
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

  // add marker to destination
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

  // add start and destination data to features
  useEffect(() => {
    setFeatures(() => {
      const newFeatures = [startGeo, destinationGeo];
      return newFeatures;
    });
  }, [startGeo, destinationGeo]);


  // find match trail
  async function FindMatchedTrail() {
    await onUpdate();
  }

  async function onUpdate() {
    if (!startGeo) {
      alert("Please enter a valid starting point.");
      return;
    }

    if (!destinationGeo) {
      alert("Please enter a valid destination.");
      return;
    }
    updateRoute(trailType);
  }

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
        setShowResult(false);
        setShowAlternateResult(true);
      } else {
        // Do nothing!
      }
      return;
    }
    // Get the coordinates from the response
    const coords = response.matchings[0];

    // add route to map and get instructions
    addRoute(coords);
    getInstructions(coords);
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
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Fragment>
      <Row className="map-block">
        <Col className="map-block" xs={12} md={4} lg={3}>
          <div className="trailsCardSideBar">
            <Collapse in={open}>
              <div className="collapse-content" id="example-collapse-text">
                <Form onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Select trail type"
                  >
                    <Form.Select
                      aria-label="Select trail type"
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
                      aria-label="Select trail difficuly"
                      onChange={(e) => setTrailDifficulty(e.target.value)}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </Form.Select>
                  </FloatingLabel>

                  <Button
                    className="inner-button"
                    onClick={FindMatchedTrail}
                    variant="primary"
                  >
                    Find Trail
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
                    <Button
                      className="inner-button"
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  )}
                </Form>

                {!showResult && showAlternateResult && (
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
                    <Button
                      className="inner-button"
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </div>
            </Collapse>

            <div className="collapse-control-panel">
              {screenWidth < 768 && (
                <FaAngleDown
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  className="collapse-control"
                ></FaAngleDown>
              )}ddl
            </div>
          </div>
        </Col>

        <Col className="map-block map" xs={12} md={8} lg={9}>
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
    </Fragment>
  );
}

export default MapControlSearch;
