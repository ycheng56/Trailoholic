import React, { useEffect, useState } from "react";
import MapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Layer,
  Source,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { layerStyleRoute } from "./data.js";

function MapSingleTrail({ trail }) {
  const [startCoords, setStartCoords] = useState([]);
  const [destCoords, setDestCoords] = useState([]);
  const [viewport, setViewport] = useState(null);
  const [routeGeojson, setRouteGeojson] = useState(null);

  useEffect(() => {
    const getCoords = async () => {
      const start = await trail?.start?.center;
      const destination = await trail?.destination?.center;
      const json = await trail?.route;
      setStartCoords(start);
      setDestCoords(destination);
      setRouteGeojson(json);
      if (start) {
        setViewport({
          longitude: (start[0] + destination[0]) / 2,
          latitude: (start[1] + destination[1]) / 2,
          zoom: 12,
        });
      }
    };
    getCoords();
  }, [trail]);

  return viewport ? (
    <MapGL
      initialViewState={viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <GeolocateControl position="top-right" />
      <NavigationControl position="top-right" />
      
      {startCoords ? (
        <Marker
          role="application"
          longitude={startCoords[0]}
          latitude={startCoords[1]}
          color="red"
          aria-label="Map marker"
        ></Marker>
      ) : (
        <></>
      )}

      {destCoords ? (
        <Marker
          role="application"
          longitude={destCoords[0]}
          latitude={destCoords[1]}
          color="green"
          aria-label="Map marker"
        ></Marker>
      ) : (
        <></>
      )}

      {routeGeojson ? (
        <Source id="route-source" type="geojson" data={routeGeojson}>
          <Layer {...layerStyleRoute} />
        </Source>
      ) : (
        <></>
      )}
    </MapGL>
  ) : (
    <></>
  );
}

export default MapSingleTrail;
