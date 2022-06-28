import { useControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useState } from "react";

function GeocoderControl(props) {
  const [marker, setMarker] = useState(null);
  geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      });
      ctrl.on("results", props.onResults || function () {});

      ctrl.on("result", props.onResult || function () {});
      return ctrl;
    },
    {
      position: props.position,
    }
  );
  return <div style={{ backgroundColor: "red" }}></div>;
}

export default GeocoderControl;
export let geocoder = null;
