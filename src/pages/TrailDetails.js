import React from "react";
import { useNavigate,useParams} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/TrailDetails.css";
import { useEffect, useState } from 'react'

function TrailDetails({trail}) {
  let navigate = useNavigate();
  const { user } = useAuth0();
  const { trailId } = useParams();
  const [trails,setTrails]=useState([]);
  const [userLists, setUserLists] = useState([]);
  useEffect( ()=>{
    async function fetchTrails(){
      try{
        const response=await fetch(`http://localhost:5000/trails/${trailId}`);
        //console.log(response);
        if(!response.ok){
          throw Error("Fetch failed");
        }
        const data = await response.json();

        //console.log(data);
        setTrails(data);
      }catch(err){
        console.log("err",err);
      }
    }
    fetchTrails();
  },[trailId]);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await fetch(
          `http://localhost:5000/users/${user.sub}`
        );
        if (!response.ok) {
          throw Error("Fetch failed");
        }
        const data = await response.json();
        setUserLists(data.lists);
        //console.log(userLists);
      } catch (err) {
        console.log("catch ", err);
      }
    }
    fetchUserList();
  }, [user.sub]);
  
  async function addToList(){

    const newLike = {id:trailId};
    try{
      const updatedMyLists =[];
      Object.keys(userLists).map((item) => (updatedMyLists.push(item)));
      updatedMyLists.push(newLike);
      console.log(updatedMyLists);
      const response = await fetch(
        `http://localhost:5000/users/${user.sub}`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            lists: updatedMyLists,
          }),
        }
      );
      console.log(response);
      if(!response.ok){
        throw Error("PATCH request failed!");
      }
      navigate(`/user/lists`)
      setUserLists(updatedMyLists);
    }catch(err){
      console.log("err",err);
    }
  }

  return (
    <div className="trailDetail">
      <h1>Trail {trailId} Details Page</h1>
      <div className="details">
        <p>Starting: {trails.start}</p>
        <p>Destination: {trails.destination}</p>
        <p>Trip Type: {trails.mode}</p>
      </div>
      <button onClick={addToList}>Add to my lists</button>
    </div>

  );
}

export default TrailDetails;
