import React, { useRef, useEffect, useState } from "react";
// import "./pages/css/Map.css";
import MapGL, { Marker, Popup } from "react-map-gl";
import SearchResultCard from "../components/SearchResultCard";


function Map({ trails }) {
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
      {trails.map((entry) => (
        <React.Fragment className="popupWindow" key={entry._id}>
          <Marker
            onClick={() => showMarkerPopup(entry._id)}
            latitude={entry.latitude}
            longitude={entry.longitude}
            color="red"
          ></Marker>

          {showPopup[entry._id] ? (
            <Popup className="popupResult"
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
              maxWidth="100%"
            >
              <SearchResultCard  trail={entry}/>
            </Popup>
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </MapGL>
  );
}

export default Map;
