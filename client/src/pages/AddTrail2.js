import { useEffect, useState } from "react";
import MapControl from "../mapbox/MapControl";

function AddTrail() {
    return (
      <>
        <div className="map-container">
        <MapControl />
      </div>

      </>
    );

}

export default AddTrail;
