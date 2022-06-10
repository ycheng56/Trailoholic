import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Trails from "./Trails";
import TrailDetails from "./TrailDetails";
import Login from "./Login";
import Signup from "./Signup";
import UserProfile from "./UserProfile";
import UserLists from "./UserLists";


function App() {
  const [login, setLogin] = useState(false);
  return (
    // TODO
    <div className="App">
      
      <Header login={login} />

      <Routes>
        <Route path="/" element={<h1>This is landing page</h1>} />
        <Route path="/trails" element={<Trails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="trails/:trailId" element={<TrailDetails />} />
        <Route path="/users/:userId/profile" element={<UserProfile />} />
        <Route path="/users/:userId/lists" element={<UserLists />} />
        <Route path="*" element={<p>Nothing Here</p>} />
      </Routes>

    </div>
  );
}

export default App;
