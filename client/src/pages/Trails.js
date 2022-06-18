import React from 'react'
import BikingFilter from '../components/FilterComponents/BikingFilter'
import HikingFilter from '../components/FilterComponents/HikingFilter'
import SearchTrails from '../components/SearchTrails'
import TrailCards from '../components/TrailCards'
import AllFilter from '../components/FilterComponents/AllFilter'
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
