import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUser } from "../api/API";


export default function Greeting() {
  const { user,isAuthenticated } = useAuth0();
  const [userName, setuserName] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (isAuthenticated) {
        const data = await fetchUser(user?.sub);
        setuserName(data.avatar_name);
        
      }
    };
    getUser();
  }, []);
  

  function getDate(){
    let greeting="";
    const today = new Date();
    let time = today.getHours();
    if(time >= 4 && time <=11){
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
    <div>
      {!isAuthenticated?
      <h1>Find Your Trail</h1>
      :
      <h1>{getDate()}, {userName}!</h1>
      }
      
    </div>
  );
}
