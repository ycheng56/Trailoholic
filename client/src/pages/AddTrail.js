import { useEffect, useState } from "react";
import MapControl from "../mapbox/MapControl";
import MapControlSearch from "../mapbox/MapControlSearch";

function AddTrail() {
    return (
      <>
        <div className="map-container">
        <MapControlSearch />
      </div>

      </>
    );

}

export default AddTrail;
