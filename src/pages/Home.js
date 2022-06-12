import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import "./css/home.css";


export default function Home() {
  return (
    <div>
        <Banner/>
        <img alt="home-page" src="https://content.r9cdn.net/rimg/dimg/44/3a/24ecb3e4-city-9388-164fb1533df.jpg?crop=true&width=1366&height=768&xhint=2080&yhint=1728" ></img>

        <p>This is the home page</p>
        <a href="/Trails">Explore all routes</a>
        <Footer/>
    </div>
          
  )
}
