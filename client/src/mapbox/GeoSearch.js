import React, {
  useEffect,
  useCallback,
  useState
} from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Form,Button } from "react-bootstrap";
import SearchResultCard from "../components/SearchResultCard"


function GeoSearch() {
  const [geoData, setGeoData] = useState(null);
  const [resultTrails, setResultTrails] = useState([]);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      placeholder: "Search Place, Location, Area",
      countries: "ca"
      
    });
    geocoder.addTo("#search");
    geocoder.on("result", onResult);
    return () => {
      geocoder.onRemove("#search");
    };
  }, []);

  const onResult = useCallback((e) => {
    const { result } = e;
    const location =
      result &&
      (result.center ||
        (result.geometry?.type === "Point" && result.geometry.coordinates));
    if (location) {
      setGeoData(result);
    } else {
      // do nothing
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`/api/search/trails?lng=${geoData.center[0]}&lat=${geoData.center[1]}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw Error("Failed");
        }
        const data = await response.json();
        setResultTrails(data);
        // alert("Successfully Submitted!");
        // navigate(`/trails/${data.insertedId}`);
      } catch (err) {
        console.log(err);
      }
}

  return (
    <div style={{minHeight:"80vh"}}>
      <h1>Search</h1>
      <Form onSubmit={handleSubmit}>
        <div id="search">
        </div>

        <Button className="inner-button" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    
        <div className="d-flex flex-column justify-content-center align-items-center">
        {resultTrails.map((item)=>(
            <SearchResultCard  key={item._id} trail={item}/>
        ))}
        </div>

    </div>
  );
}

export default GeoSearch;
