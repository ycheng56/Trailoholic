import { useEffect, useState } from "react";
import MapControl from "../mapbox/MapControl";
import MapControlSearch from "../mapbox/MapControlSearch";
import { useAuth0 } from "@auth0/auth0-react";
function AddTrail() {
  const { isAuthenticated,loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
  }
    return isAuthenticated &&
        <div id="AddTrail-Page">
        <MapControlSearch />
      </div>
}

export default AddTrail;
