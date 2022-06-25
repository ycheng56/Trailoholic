import React, { useRef, useEffect, useState } from "react";
import "../mapbox/Map.css";
import MapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import PopularHikingTrail from "../components/TrailCollectionComponents/PopularHikingTrail"
import "mapbox-gl/dist/mapbox-gl.css";
import {layerStyleRoute} from "./data.js"

function Map({ trails }) {
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 49.19,
    longitude: -123.17,
    zoom: 10,
  });

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
        <React.Fragment key={entry._id}>
          <Marker
            role="application"
            onClick={() => showMarkerPopup(entry._id)}
            longitude={entry.start.center[0]}
            latitude={entry.start.center[1]}
            color="red"
            aria-label="Map marker"
          ></Marker>

          {showPopup[entry._id] ? (
            <Popup
              className="popupResult"
              longitude={entry.start.center[0]}
              latitude={entry.start.center[1]}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
              maxWidth="100%"
              closeOnMove={true}
            >
              <PopularHikingTrail trail={entry}></PopularHikingTrail>
            </Popup>
          ) : (
            <></>
          )}

          {showPopup[entry._id] ? (
            <Source id="route-source" type="geojson" data={entry.route}>
              <Layer {...layerStyleRoute} />
            </Source>
          ) : (
            <></>
          )}
        </React.Fragment>
      ))}
    </MapGL>
  );
}

export default Map;
