import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Trails from "./pages/Trails";
import TrailDetails from "./pages/TrailDetails";
import UserProfile from "./pages/UserProfile";
import UserLists from "./pages/UserLists";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Login from "./pages/Login"
import ProtectedRoute from "./auth/ProtectedRoute";

// TODO: Using .env to fetch domain&clientId unsuccessfully
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Banner />
      <AppRouter />
      <Footer />
    </div>
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trails" element={<Trails />} />
      <Route path="trails/:trailId" element={<TrailDetails />} />
      <Route path="/user/profile" element={<ProtectedRoute Component={UserProfile} />} />
      <Route path="/user/lists" element={<ProtectedRoute Component={UserLists} />} />
      <Route path="*" element={<p>Nothing Here</p>} />
    </Routes>
  );
}

export default App;
