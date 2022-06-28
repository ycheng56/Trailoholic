import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchResult from "../components/TrailCollectionComponents/SearchResult";

export default function SearchPage() {
  const { searchCriteria } = useParams();
  const [trails, setTrails] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch(`/api/search/trails?${searchCriteria}`);
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
        const params = new URLSearchParams(searchCriteria);
        setLocation(params.get("location"));
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, [searchCriteria]);

  return (
    <div id="Search-Page" className="d-flex flex-column justify-content-center align-items-center">
      <h1>Trails near {location}</h1>
      {trails.map((item) => (
        <SearchResult key={item._id} trail={item} />
      ))}
      {/* <Pagination count={2} /> */}
      {trails.length === 0 && <p>No result.</p>}
    </div>
  );
}