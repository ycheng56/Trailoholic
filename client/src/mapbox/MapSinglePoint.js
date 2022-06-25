import React, { useRef, useEffect, useState } from "react";
// import "./pages/css/Map.css";
import MapGL, { Marker, Popup } from "react-map-gl";
import SearchResultCard from "../components/SearchResultCard";
import 'mapbox-gl/dist/mapbox-gl.css';

function MapSinglePoint({ trails, Lng , Lat}) {
  const [viewport, setViewport] = useState({
    longitude: Lng,
    latitude: Lat,
    zoom: 12,
  });


  return (
    <MapGL
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
        <React.Fragment key={trails._id}>
          <Marker
            role="application"
            longitude={Lng}
            latitude={Lat}
            color="red"
            aria-label="Map marker"
          ></Marker>
        </React.Fragment>
    </MapGL>
  );
}

export default MapSinglePoint;
