import React, { useEffect } from 'react'
import "./css/Filter.css"

export default function Filter({trails,setFiltered,activeType,setActiveType}) {
    useEffect(()=>{
        if(activeType === ""){
            setFiltered(trails);
            return;
        }
        const filtered = trails.filter((trail)=>
            trail.mode.includes(activeType)
        );
        setFiltered(filtered);
    },[activeType]);

  return (
    <div className="filter-container">
        <button onClick={()=>setActiveType("")}>All Trails</button>
        <button onClick={()=>setActiveType("Hiking")}>Hiking</button>
        <button onClick={()=>setActiveType("Cycling")}>Biking</button>
    </div>
  )
}
