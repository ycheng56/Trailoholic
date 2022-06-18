import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrailCard from "../components/TrailCard";
import SearchResultCard from "../components/SearchResultCard";

export default function SearchPage() {
  const { searchCriteria } = useParams();
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    async function fetchTrails() {
      try {
        const response = await fetch(
          `/api/search/trails?start=${searchCriteria}`
        );
        //   console.log(searchCriteria);
        //   console.log(response)
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setTrails(data);
          console.log("data",data);
          console.log("trails:",trails);
      } catch (err) {
        console.log("err", err);
      }
    }
    fetchTrails();
  }, [searchCriteria]);

  return (
    <div>
      {/* <div>
        {trails.map((item) => (
            <TrailCard key={item._id} trail={item} />
          ))}
      </div> */}
      {trails.map((item)=>(
        <SearchResultCard  key={item._id} trail={item}/>
      ))}
      
    </div>
  );
}
