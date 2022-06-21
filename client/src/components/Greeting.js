import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function Greeting() {
  const { user } = useAuth0();
  

  function getDate(){
    let greeting="";
    const today = new Date();
    let time = today.getHours();
    if(time >= 0 && time <=11){
      greeting="Good Morning";
    }
    else if(time >11 && time <= 18){
      greeting="Good Afternoon";
    }else{
      greeting="Good Evening";
    }
    return greeting
  }

  return (
    <div
    style={{paddingBottom:"10rem"} }
    >
      <h1>{getDate()}, {user.nickname}!</h1>
    </div>
  );
}
