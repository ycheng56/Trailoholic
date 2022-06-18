import React from 'react'
import SearchTrails from '../components/SearchTrails'
import TrailCards from '../components/TrailCards'

export default function Trails() {
  return (
    <div>
        <p>Explore All the Trails</p>
        <SearchTrails/>
        <TrailCards />
    </div>
  )
}
