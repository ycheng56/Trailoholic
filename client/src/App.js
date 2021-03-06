import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import TrialsMap from "./pages/TrailsMap"
import SearchPage from "./pages/SearchPage";
import AddTrail from "./pages/AddTrail";

function App() {
  const {isLoading } = useAuth0();
  const location=useLocation();
  const hideFooter = location.pathname.includes("/map") || location.pathname === "/addtrail";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Banner />
      <AppRouter />
      {!hideFooter && <Footer />}
      
    </div>
  );
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trails/map" element={<TrialsMap />} />
      <Route path="/trails/map/:trailType" element={<TrialsMap />} />
      <Route path="trails/:trailId" element={<TrailDetails />} />
      <Route path="/addtrail" element={<ProtectedRoute Component={AddTrail} />} />
      <Route path="/user/profile" element={<ProtectedRoute Component={UserProfile} />} />
      <Route path="/user/lists" element={<ProtectedRoute Component={UserLists} />} />
      <Route path="/trails/search" element={<SearchPage/>}/>
      <Route path="/trails/search/:searchCriteria" element={<SearchPage/>}/>
      <Route path="*" element={<p>This page isn't available. Sorry about that. </p>} />
    </Routes>
  );
}

export default App;
