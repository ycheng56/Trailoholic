import React from 'react'
import "./css/home.css";
import {Link} from "react-router-dom";
import SearchTrails from '../components/SearchTrails';


export default function Home() {
  return (
    <div>
        <img alt="home-page" src="https://content.r9cdn.net/rimg/dimg/44/3a/24ecb3e4-city-9388-164fb1533df.jpg?crop=true&width=1366&height=768&xhint=2080&yhint=1728" ></img>
        <SearchTrails/>
        <p>This is the home page</p>
        <Link to="trails">Explore all routes</Link>

    </div>
          
  )
}
