import React, { useState } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Trails from "./pages/Trails";
import TrailDetails from "./pages/TrailDetails";
import Login from "./pages/Login";
import UserProfile from "./UserProfile";
import UserLists from "./UserLists";
import Home from "./pages/Home";
import { Auth0Provider } from "@auth0/auth0-react";

// TODO: Using .env to fetch domain&clientId unsuccessfully
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function App() {
  const [login, setLogin] = useState(false);
  return (
    // TODO
    <div className="App">
      <Header login={login} />
      <Auth0Provider
      domain="dev-xv9c9tpt.us.auth0.com"
      clientId="1151LSCcAqAdtfA1tjw52U5hFZo6TzHC"
      redirectUri={window.location.origin}
      >
        <AppRouter />
      </Auth0Provider>
    </div>
  );
}

function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trails" element={<Trails />} />
        <Route path="/login" element={<Login />} />
        <Route path="trails/:trailId" element={<TrailDetails />} />
        <Route path="/users/:userId/profile" element={<UserProfile />} />
        <Route path="/users/:userId/lists" element={<UserLists />} />
        <Route path="*" element={<p>Nothing Here</p>} />
      </Routes>
  );
}

export default App;
