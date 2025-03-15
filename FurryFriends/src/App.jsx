import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./pages/Home";
import { lightTheme, darkTheme } from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AdoptionPage from "./pages/AdoptionPage";
import Popular from "./pages/Popular";
import AdoptAPetPage from "./pages/AdoptAPetPage";
import MyProfile from "./pages/MyProfile";
import OtpPage from "./pages/OtpPage";
import PrivateRoute from "./components/PrivateRoute";
import LostAndFound from "./pages/LostAndFound";
import PetShop from "./pages/PetShop"; 

// Components
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import LeftSidebarDesktop from "./components/LeftSidebarDesktop";

// Pet Topics
import Dogs from "./pages/PetTopics/Dogs";
import Cats from "./pages/PetTopics/Cats";
import Birds from "./pages/PetTopics/Birds";
import Ferrets from "./pages/PetTopics/Ferrets";
import Fish from "./pages/PetTopics/Fish";
import GuineaPigs from "./pages/PetTopics/GuineaPigs";
import Hamsters from "./pages/PetTopics/Hamsters";
import Rabbits from "./pages/PetTopics/Rabbits";
import Reptiles from "./pages/PetTopics/Reptiles";

import UserProfile from "./pages/UserProfile";
import PetAccessories from "./pages/PetAccessories";
import VetLocator from "./pages/VetLocator";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <div style={{ display: "flex" }}>
          <LeftSidebarDesktop />
          <div style={{ flexGrow: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
              <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
              <Route path="/otp" element={isAuthenticated ? <Navigate to="/home" /> : <OtpPage />} />

              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/adoption" element={<AdoptionPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/popular" element={<Popular toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/adopt_a_pet" element={<AdoptAPetPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/myprofile" element={<MyProfile toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/lost-and-found" element={<LostAndFound toggleTheme={toggleTheme} darkMode={darkMode} />} />

<<<<<<< HEAD
            {/* View Other User Profiles */}
            <Route path="/user/:username" element={<UserProfile toggleTheme={toggleTheme} darkMode={darkMode} />} />

            {/* Pet Topics */}
            <Route path="/dogs" element={<Dogs toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/cats" element={<Cats toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/birds" element={<Birds toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/ferrets" element={<Ferrets toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/fish" element={<Fish toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/guinea-pigs" element={<GuineaPigs toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/hamsters" element={<Hamsters toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/rabbits" element={<Rabbits toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/reptiles" element={<Reptiles toggleTheme={toggleTheme} darkMode={darkMode} />} />
=======
                {/* Pet Shop Route with Sidebar */}
                <Route 
                  path="/pet-shop" 
                  element={
                    <div style={{ display: "flex" }}>
                      <LeftSidebar />
                      <PetShop toggleTheme={toggleTheme} darkMode={darkMode} />
                    </div>
                  } 
                />
>>>>>>> e68fbb175de7aaf8d9e16846d3bdc4f2fce53e3d

                <Route path="/dogs" element={<Dogs toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/cats" element={<Cats toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/birds" element={<Birds toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/rabbits" element={<Rabbits toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/hamsters" element={<Hamsters toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/guinea-pigs" element={<GuineaPigs toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/reptiles" element={<Reptiles toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/ferrets" element={<Ferrets toggleTheme={toggleTheme} darkMode={darkMode} />} />
                <Route path="/fish" element={<Fish toggleTheme={toggleTheme} darkMode={darkMode} />} />

                <Route path="/pet-accessories" element={<PetAccessories />} />
                <Route path="/vet-locator" element={<VetLocator toggleTheme={toggleTheme} darkMode={darkMode} />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
