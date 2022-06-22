import React, { useRef, useEffect, useState } from "react";
// import "./pages/css/Map.css";
import MapGL, { Marker, Popup } from "react-map-gl";
import SearchResultCard from "../components/SearchResultCard";
import 'mapbox-gl/dist/mapbox-gl.css';

function MapSinglePoint({ trails }) {
  // const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 49.19,
    longitude: -123.17,
    zoom: 10,
  });
  

  // const getEntries = async () => {
  //   const logEntries = await listLogEntries();
  //   setLogEntries(logEntries);
  //   console.log(logEntries);
  // };

  // useEffect(() => {
  //   getEntries();
  // }, []);
  function print() {
    console.log(trails);
  }

  const showMarkerPopup = (id) => {
    setShowPopup({
      [id]: true,
    });
  };

  return (
    <MapGL
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showMarkerPopup}
    >
      {/* {trails.map((trails) => ( */}
        <React.Fragment className="popupWindow" key={trails._id}>
          <Marker
            role="application"
            onClick={() => showMarkerPopup(trails._id)}
            latitude={trails.start["center"][0]}
            longitude={trails.start["center"][1]}
            color="red"
            aria-label="Map marker"
          ></Marker>

          {showPopup[trails._id] ? (
            <Popup className="popupResult"
              latitude={trails.start["center"][0]}
              longitude={trails.start["center"][1]}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
              maxWidth="100%"
            >
              <SearchResultCard  trail={trails}/>
            </Popup>
          ) : (
            <></>
          )}
        </React.Fragment>
      {/* ))
      } */}
    </MapGL>
  );
}

export default MapSinglePoint;
