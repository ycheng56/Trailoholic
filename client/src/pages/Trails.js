import React from 'react'
import SearchTrails from '../components/SearchTrails'
import TrailCards from '../components/TrailCards'
import "./css/Trails.css"
import Filter from '../components/Filter'

export default function Trails() {
  return (
    <div>
        <p>Explore All the Trails</p>
        {/* <SearchTrails/> */}
        {/* <Filter/> */}
        <TrailCards />
    </div>
  )
}
